const fs = require('fs');
const log = require('@vladmandic/pilogger');
const Build = require('@vladmandic/build').Build;
const APIExtractor = require('@microsoft/api-extractor');

const regEx = [
  { search: 'types="@webgpu/types/dist"', replace: 'path="../src/types/webgpu.d.ts"' },
  { search: 'types="offscreencanvas"', replace: 'path="../src/types/offscreencanvas.d.ts"' },
];

function copyFile(src, dst) {
  if (!fs.existsSync(src)) {
    log.warn('Copy:', { input: src, output: dst });
    return;
  }
  log.state('Copy:', { input: src, output: dst });
  const buffer = fs.readFileSync(src);
  fs.writeFileSync(dst, buffer);
}

function writeFile(str, dst) {
  log.state('Write:', { output: dst });
  fs.writeFileSync(dst, str);
}

function regExFile(src, entries) {
  if (!fs.existsSync(src)) {
    log.warn('Filter:', { src });
    return;
  }
  log.state('Filter:', { input: src });
  for (const entry of entries) {
    const buffer = fs.readFileSync(src, 'UTF-8');
    const lines = buffer.split(/\r?\n/);
    const out = [];
    for (const line of lines) {
      if (line.includes(entry.search)) out.push(line.replace(entry.search, entry.replace));
      else out.push(line);
    }
    fs.writeFileSync(src, out.join('\n'));
  }
}

const apiIgnoreList = ['ae-forgotten-export', 'ae-unresolved-link', 'tsdoc-param-tag-missing-hyphen'];

async function main() {
  // run production build
  const build = new Build();
  await build.run('production');
  // patch tfjs typedefs
  log.state('Copy:', { input: 'types/lib/dist/tfjs.esm.d.ts' });
  copyFile('types/lib/dist/tfjs.esm.d.ts', 'dist/tfjs.esm.d.ts');
  // run api-extractor to create typedef rollup
  const extractorConfig = APIExtractor.ExtractorConfig.loadFileAndPrepare('api-extractor.json');
  const extractorResult = APIExtractor.Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: false,
    messageCallback: (msg) => {
      msg.handled = true;
      if (msg.logLevel === 'none' || msg.logLevel === 'verbose' || msg.logLevel === 'info') return;
      if (msg.sourceFilePath?.includes('/node_modules/')) return;
      if (apiIgnoreList.reduce((prev, curr) => prev || msg.messageId.includes(curr), false)) return;
      log.data('API', { level: msg.logLevel, category: msg.category, id: msg.messageId, file: msg.sourceFilePath, line: msg.sourceFileLine, text: msg.text });
    },
  });
  log.state('API-Extractor:', { succeeeded: extractorResult.succeeded, errors: extractorResult.errorCount, warnings: extractorResult.warningCount });
  regExFile('types/face-api.d.ts', regEx);
  writeFile('export * from \'../types/face-api\';', 'dist/face-api.esm-nobundle.d.ts');
  writeFile('export * from \'../types/face-api\';', 'dist/face-api.esm.d.ts');
  writeFile('export * from \'../types/face-api\';', 'dist/face-api.d.ts');
  writeFile('export * from \'../types/face-api\';', 'dist/face-api.node.d.ts');
  writeFile('export * from \'../types/face-api\';', 'dist/face-api.node-gpu.d.ts');
  writeFile('export * from \'../types/face-api\';', 'dist/face-api.node-wasm.d.ts');
  log.info('FaceAPI Build complete...');
}

main();
