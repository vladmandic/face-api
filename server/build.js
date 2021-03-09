#!/usr/bin/env -S node --trace-warnings

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable node/no-unpublished-require */
/* eslint-disable node/shebang */

const esbuild = require('esbuild');
const ts = require('typescript');
const log = require('@vladmandic/pilogger');

const banner = { js: `
  /*
  Face-API
  homepage: <https://github.com/vladmandic/face-api>
  author: <https://github.com/vladmandic>'
  */
` };

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
const common = {
  banner,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
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

function compile(fileNames, options) {
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

// rebuild on file change
async function build(f, msg) {
  log.info('Build: file', msg, f, 'target:', common.target);
  try {
    // rebuild all target groups and types
    for (const [targetGroupName, targetGroup] of Object.entries(targets)) {
      for (const [targetName, targetOptions] of Object.entries(targetGroup)) {
        // if triggered from watch mode, rebuild only browser bundle
        if ((require.main !== module) && (targetGroupName !== 'browserBundle')) continue;
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

  // generate typings
  compile(targets.browserBundle.esm.entryPoints, tsconfig);

  if (require.main === module) process.exit(0);
}

if (require.main === module) {
  log.header();
  build('all', 'startup');
} else {
  exports.build = build;
}
