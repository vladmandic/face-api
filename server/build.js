/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable node/no-unpublished-require */

const esbuild = require('esbuild');
const ts = require('typescript');
const log = require('@vladmandic/pilogger');
const TypeDoc = require('typedoc');
const { ESLint } = require('eslint');
const tfjs = require('@tensorflow/tfjs/package.json');
const changelog = require('./changelog');

const banner = { js: `
  /*
  Face-API
  homepage: <https://github.com/vladmandic/face-api>
  author: <https://github.com/vladmandic>'
  */
` };

let td = null;
let eslint = null;

// tsc configuration
const tsconfig = {
  noEmitOnError: false,
  target: ts.ScriptTarget.ES2018,
  module: ts.ModuleKind.ES2020,
  // outFile: "dist/face-api.d.ts",
  outDir: 'types/',
  declaration: true,
  emitDeclarationOnly: true,
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  skipLibCheck: true,
  strictNullChecks: true,
  baseUrl: './',
  paths: {
    tslib: ['node_modules/tslib/tslib.d.ts'],
  },
};

// common configuration
const lintLocations = ['server/', 'demo/', 'src/', 'test/'];

// common configuration
const common = {
  banner,
  minifyWhitespace: false,
  minifyIdentifiers: false,
  minifySyntax: false,
  bundle: true,
  sourcemap: true,
  metafile: true,
  logLevel: 'error',
  target: 'es2018',
  // tsconfig: './tsconfig.json',
};

const targets = {
  node: {
    tfjs: {
      platform: 'node',
      format: 'cjs',
      entryPoints: ['src/tfjs/tf-node.ts'],
      outfile: 'dist/tfjs.esm.js',
      external: ['@tensorflow'],
    },
    node: {
      platform: 'node',
      format: 'cjs',
      entryPoints: ['src/index.ts'],
      outfile: 'dist/face-api.node.js',
      external: ['@tensorflow'],
    },
  },
  nodeGPU: {
    tfjs: {
      platform: 'node',
      format: 'cjs',
      entryPoints: ['src/tfjs/tf-node-gpu.ts'],
      outfile: 'dist/tfjs.esm.js',
      external: ['@tensorflow'],
    },
    node: {
      platform: 'node',
      format: 'cjs',
      entryPoints: ['src/index.ts'],
      outfile: 'dist/face-api.node-gpu.js',
      external: ['@tensorflow'],
    },
  },
  nodeCPU: {
    tfjs: {
      platform: 'node',
      format: 'cjs',
      entryPoints: ['src/tfjs/tf-node-cpu.ts'],
      outfile: 'dist/tfjs.esm.js',
      external: ['@tensorflow'],
    },
    node: {
      platform: 'node',
      format: 'cjs',
      entryPoints: ['src/index.ts'],
      outfile: 'dist/face-api.node-cpu.js',
      external: ['@tensorflow'],
    },
  },
  browserNoBundle: {
    tfjs: {
      platform: 'browser',
      format: 'esm',
      entryPoints: ['src/tfjs/tf-browser.ts'],
      outfile: 'dist/tfjs.esm.js',
      external: ['fs', 'buffer', 'util', 'os', '@tensorflow'],
    },
    esm: {
      platform: 'browser',
      format: 'esm',
      entryPoints: ['src/index.ts'],
      outfile: 'dist/face-api.esm-nobundle.js',
      external: ['fs', 'buffer', 'util', 'os', '@tensorflow', 'tfjs.esm.js'],
    },
  },
  browserBundle: {
    tfjs: {
      platform: 'browser',
      format: 'esm',
      entryPoints: ['src/tfjs/tf-browser.ts'],
      outfile: 'dist/tfjs.esm.js',
      external: ['fs', 'buffer', 'util', 'os'],
    },
    iife: {
      platform: 'browser',
      format: 'iife',
      globalName: 'faceapi',
      entryPoints: ['src/index.ts'],
      outfile: 'dist/face-api.js',
      external: ['fs', 'buffer', 'util', 'os'],
    },
    esm: {
      platform: 'browser',
      format: 'esm',
      entryPoints: ['src/index.ts'],
      outfile: 'dist/face-api.esm.js',
      external: ['fs', 'buffer', 'util', 'os'],
    },
  },
};

async function getStats(json) {
  const stats = {};
  if (json && json.metafile.inputs && json.metafile.outputs) {
    for (const [key, val] of Object.entries(json.metafile.inputs)) {
      if (key.startsWith('node_modules')) {
        stats.modules = (stats.modules || 0) + 1;
        stats.moduleBytes = (stats.moduleBytes || 0) + val.bytes;
      } else {
        stats.imports = (stats.imports || 0) + 1;
        stats.importBytes = (stats.importBytes || 0) + val.bytes;
      }
    }
    const files = [];
    for (const [key, val] of Object.entries(json.metafile.outputs)) {
      if (!key.endsWith('.map')) {
        files.push(key);
        stats.outputBytes = (stats.outputBytes || 0) + val.bytes;
      }
    }
    stats.outputFiles = files.join(', ');
  }
  return stats;
}

function typings(fileNames, options) {
  log.info('Compile typings:', fileNames);
  const program = ts.createProgram(fileNames, options);
  const emit = program.emit();
  const diag = ts
    .getPreEmitDiagnostics(program)
    .concat(emit.diagnostics);
  for (const info of diag) {
    // @ts-ignore
    const msg = info.messageText.messageText || info.messageText;
    if (msg.includes('package.json')) continue;
    if (msg.includes('Expected 0 arguments, but got 1')) continue;
    if (info.file) {
      const pos = info.file.getLineAndCharacterOfPosition(info.start || 0);
      log.error(`TSC: ${info.file.fileName} [${pos.line + 1},${pos.character + 1}]:`, msg);
    } else {
      log.error('TSC:', msg);
    }
  }
}

async function lint() {
  log.info('Running Linter:', lintLocations);
  if (!eslint) {
    eslint = new ESLint();
  }
  const results = await eslint.lintFiles(lintLocations);
  const errors = results.reduce((prev, curr) => prev += curr.errorCount, 0);
  const warnings = results.reduce((prev, curr) => prev += curr.warningCount, 0);
  log.info('Linter complete: files:', results.length, 'errors:', errors, 'warnings:', warnings);
  if (errors > 0 || warnings > 0) {
    const formatter = await eslint.loadFormatter('stylish');
    const text = formatter.format(results);
    log.warn(text);
  }
}

async function typedoc(entryPoint) {
  log.info('Generate TypeDocs:', entryPoint);
  if (!td) {
    td = new TypeDoc.Application();
    td.options.addReader(new TypeDoc.TSConfigReader());
    td.bootstrap({ entryPoints: entryPoint });
  }
  const project = td.convert();
  const result = project ? await td.generateDocs(project, 'typedoc') : null;
  if (result) log.warn('TypeDoc:', result);
}

// rebuild on file change
async function build(f, msg, dev = false) {
  log.info('Build: file', msg, f, 'target:', common.target);
  try {
    // rebuild all target groups and types
    for (const [targetGroupName, targetGroup] of Object.entries(targets)) {
      for (const [targetName, targetOptions] of Object.entries(targetGroup)) {
        // if triggered from watch mode, rebuild only browser bundle
        // if ((require.main !== module) && (targetGroupName !== 'browserBundle')) continue;
        // @ts-ignore
        const meta = await esbuild.build({ ...common, ...targetOptions });
        const stats = await getStats(meta);
        log.state(`Build for: ${targetGroupName} type: ${targetName}:`, stats);
      }
    }
  } catch (err) {
    // catch errors and print where it occured
    log.error('Build error', JSON.stringify(err.errors || err, null, 2));
    if (require.main === module) process.exit(1);
  }

  if (!dev) { // only for prod builds, skipped for dev build
    await lint(); // run linter
    await typings(targets.browserBundle.esm.entryPoints, tsconfig); // generate typings
    await changelog.update('../CHANGELOG.md'); // generate changelog
    await typedoc(targets.browserBundle.esm.entryPoints); // generate typedoc
  }

  if (require.main === module) process.exit(0);
}

if (require.main === module) {
  log.header();
  log.info(`Toolchain: tfjs: ${tfjs.version} esbuild ${esbuild.version}; typescript ${ts.version}; typedoc: ${TypeDoc.Application.VERSION} eslint: ${ESLint.version}`);
  build('all', 'startup');
} else {
  exports.build = build;
}
