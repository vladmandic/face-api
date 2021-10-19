import * as tf from '../dist/tfjs.esm';

import { ParamMapping } from './common/index';
import { getModelUris } from './common/getModelUris';
import { loadWeightMap } from './dom/index';
import { env } from './env/index';

export abstract class NeuralNetwork<TNetParams> {
  constructor(name: string) {
    this._name = name;
  }

  protected _params: TNetParams | undefined = undefined;

  protected _paramMappings: ParamMapping[] = [];

  public _name: any;

  public get params(): TNetParams | undefined { return this._params; }

  public get paramMappings(): ParamMapping[] { return this._paramMappings; }

  public get isLoaded(): boolean { return !!this.params; }

  public getParamFromPath(paramPath: string): tf.Tensor {
    const { obj, objProp } = this.traversePropertyPath(paramPath);
    return obj[objProp];
  }

  public reassignParamFromPath(paramPath: string, tensor: tf.Tensor) {
    const { obj, objProp } = this.traversePropertyPath(paramPath);
    obj[objProp].dispose();
    obj[objProp] = tensor;
  }

  public getParamList() {
    return this._paramMappings.map(({ paramPath }) => ({
      path: paramPath,
      tensor: this.getParamFromPath(paramPath),
    }));
  }

  public getTrainableParams() {
    return this.getParamList().filter((param) => param.tensor instanceof tf.Variable);
  }

  public getFrozenParams() {
    return this.getParamList().filter((param) => !(param.tensor instanceof tf.Variable));
  }

  public variable() {
    this.getFrozenParams().forEach(({ path, tensor }) => {
      this.reassignParamFromPath(path, tensor.variable());
    });
  }

  public freeze() {
    this.getTrainableParams().forEach(({ path, tensor: variable }) => {
      const tensor = tf.tensor(variable.dataSync());
      variable.dispose();
      this.reassignParamFromPath(path, tensor);
    });
  }

  public dispose(throwOnRedispose = true) {
    this.getParamList().forEach((param) => {
      if (throwOnRedispose && param.tensor.isDisposed) {
        throw new Error(`param tensor has already been disposed for path ${param.path}`);
      }
      param.tensor.dispose();
    });
    this._params = undefined;
  }

  public serializeParams(): Float32Array {
    return new Float32Array(
      this.getParamList()
        .map(({ tensor }) => Array.from(tensor.dataSync()) as number[])
        .reduce((flat, arr) => flat.concat(arr)),
    );
  }

  public async load(weightsOrUrl: Float32Array | string | undefined): Promise<void> {
    if (weightsOrUrl instanceof Float32Array) {
      this.extractWeights(weightsOrUrl);
      return;
    }
    await this.loadFromUri(weightsOrUrl);
  }

  public async loadFromUri(uri: string | undefined) {
    if (uri && typeof uri !== 'string') {
      throw new Error(`${this._name}.loadFromUri - expected model uri`);
    }
    const weightMap = await loadWeightMap(uri, this.getDefaultModelName());
    this.loadFromWeightMap(weightMap);
  }

  public async loadFromDisk(filePath: string | undefined) {
    if (filePath && typeof filePath !== 'string') {
      throw new Error(`${this._name}.loadFromDisk - expected model file path`);
    }
    const { readFile } = env.getEnv();
    const { manifestUri, modelBaseUri } = getModelUris(filePath, this.getDefaultModelName());
    const fetchWeightsFromDisk = (filePaths: string[]) => Promise.all(filePaths.map((fp) => readFile(fp).then((buf) => buf.buffer)));
    const loadWeights = tf.io.weightsLoaderFactory(fetchWeightsFromDisk);
    const manifest = JSON.parse((await readFile(manifestUri)).toString());
    const weightMap = await loadWeights(manifest, modelBaseUri);
    this.loadFromWeightMap(weightMap);
  }

  public loadFromWeightMap(weightMap: tf.NamedTensorMap) {
    const { paramMappings, params } = this.extractParamsFromWeightMap(weightMap);
    this._paramMappings = paramMappings;
    this._params = params;
  }

  public extractWeights(weights: Float32Array) {
    const { paramMappings, params } = this.extractParams(weights);
    this._paramMappings = paramMappings;
    this._params = params;
  }

  private traversePropertyPath(paramPath: string) {
    if (!this.params) {
      throw new Error('traversePropertyPath - model has no loaded params');
    }

    const result = paramPath.split('/').reduce((res: { nextObj: any, obj?: any, objProp?: string }, objProp) => {
      // eslint-disable-next-line no-prototype-builtins
      if (!res.nextObj.hasOwnProperty(objProp)) {
        throw new Error(`traversePropertyPath - object does not have property ${objProp}, for path ${paramPath}`);
      }
      return { obj: res.nextObj, objProp, nextObj: res.nextObj[objProp] };
    }, { nextObj: this.params });

    const { obj, objProp } = result;
    if (!obj || !objProp || !(obj[objProp] instanceof tf.Tensor)) {
      throw new Error(`traversePropertyPath - parameter is not a tensor, for path ${paramPath}`);
    }

    return { obj, objProp };
  }

  protected abstract getDefaultModelName(): string

  // eslint-disable-next-line no-unused-vars
  protected abstract extractParamsFromWeightMap(weightMap: tf.NamedTensorMap): { params: TNetParams, paramMappings: ParamMapping[] }

  // eslint-disable-next-line no-unused-vars
  protected abstract extractParams(weights: Float32Array): { params: TNetParams, paramMappings: ParamMapping[] }
}
