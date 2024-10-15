/**
 * Create a package.json for each directory and proxy to CJS and ESM files.
 * Can make importing a component easier.
 *
 */

const path = require('path');
const fs = require('fs');
const util = require('util');

const mkDir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const srcRoot = path.join(__dirname, '../src');
const libRoot = path.join(__dirname, '../lib');

function findResources(options) {
  const { dir = srcRoot, ignores = [], isFile } = options;
  const resources = [];
  fs.readdirSync(dir).forEach(item => {
    const itemPath = path.resolve(dir, item);
    const pathname = itemPath.replace(/[a-z0-9\-]*\//gi, '').replace('.tsx', '');

    if (fs.statSync(itemPath).isDirectory()) {
      resources.push(pathname);
    }
    if (isFile && fs.statSync(itemPath).isFile()) {
      resources.push(pathname);
    }
  });

  //console.log(resources);

  return resources.filter(item => !ignores.includes(item));
}

function proxyResource(options) {
  const { pkgName = '@rsuite/icons', name, file, filePath = '../', subPath = '/' } = options;
  const proxyPkg = {
    name: `${pkgName}/${name}`,
    private: true,
    main: `${filePath}/cjs${subPath}${file}.js`,
    module: `${filePath}/esm${subPath}${file}.js`,
    types: `${filePath}/esm${subPath}${file}.d.ts`
  };

  return JSON.stringify(proxyPkg, null, 2) + '\n';
}

async function writePkgFile(options) {
  const {
    resources = [],
    pkgName = '@rsuite/icons',
    dir = libRoot,
    subPath,
    filePath = '..'
  } = options;
  await Promise.all(
    resources.map(async item => {
      const name = item;
      const file = `${item}`;
      const proxyDir = path.join(dir, name);
      await mkDir(dir).catch(() => {});
      await mkDir(proxyDir).catch(() => {});
      await writeFile(
        `${proxyDir}/package.json`,
        proxyResource({ pkgName, name, file, filePath, subPath })
      ).catch(err => {
        if (err) console.error(err.toString());
      });
    })
  );
}

async function proxyComponent() {
  const icons = findResources({
    dir: path.join(srcRoot, 'icons'),
    isFile: true,
    ignores: ['legacy']
  });

  await writePkgFile({ resources: icons, subPath: '/icons/' });

  const legacyIcons = findResources({ dir: path.join(srcRoot, 'icons/legacy'), isFile: true });

  await writePkgFile({
    resources: legacyIcons,
    pkgName: '@rsuite/icons/legacy',
    subPath: '/icons/legacy',
    filePath: '../..',
    dir: path.join(libRoot, 'legacy')
  });

  const components = ['Icon', 'IconProvider', 'createIconFont', 'createSvgIcon'];

  await writePkgFile({ resources: components });
}

async function proxy() {
  await proxyComponent();
}

module.exports.findResources = findResources;
module.exports.default = proxy;
