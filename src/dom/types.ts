import type { Tensor3D, Tensor4D } from '../../dist/tfjs.esm';

import { NetInput } from './NetInput';

export type TMediaElement = HTMLImageElement | HTMLVideoElement | HTMLCanvasElement

export type TResolvedNetInput = TMediaElement | Tensor3D | Tensor4D

export type TNetInput = string | TResolvedNetInput | Array<string | TResolvedNetInput> | NetInput
