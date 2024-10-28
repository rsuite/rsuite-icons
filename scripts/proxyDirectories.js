const path = require('path');
const fs = require('fs');
const util = require('util');

const mkDir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const srcRoot = path.join(__dirname, '../src');
const libRoot = path.join(__dirname, '../lib');

/**
 * Recursively finds resources in a directory, with optional filters for files and ignored directories.
 * @param {Object} options - The options for finding resources.
 * @param {string} options.dir - The directory to search in.
 * @param {string[]} options.ignores - List of directories to ignore.
 * @param {boolean} options.isFile - Whether to include files in the search results.
 * @returns {string[]} - List of found resources.
 */
function findResources({ dir = srcRoot, ignores = [], isFile }) {
  const resources = fs.readdirSync(dir).map(item => {
    const itemPath = path.resolve(dir, item);
    const pathname = itemPath.replace(/[a-z0-9\-]*\//gi, '').replace('.tsx', '');

    const isDirectory = fs.statSync(itemPath).isDirectory();
    const isFileMatch = isFile && fs.statSync(itemPath).isFile();

    if (isDirectory || isFileMatch) {
      return pathname;
    }
    return null;
  });

  return resources.filter(item => item && !ignores.includes(item));
}

/**
 * Creates a proxy package.json content.
 * @param {Object} options - The options for the proxy.
 * @param {string} options.pkgName - The base package name.
 * @param {string} options.name - The name of the resource.
 * @param {string} options.file - The file name without extension.
 * @param {string} [options.filePath='../'] - The relative path to the resource.
 * @param {string} [options.subPath='/'] - The subpath inside the package.
 * @returns {string} - The package.json content.
 */
function proxyResource({ pkgName = '@rsuite/icons', name, file, filePath = '../', subPath = '/' }) {
  return (
    JSON.stringify(
      {
        name: `${pkgName}/${name}`,
        private: true,
        main: `${filePath}/cjs${subPath}${file}.js`,
        module: `${filePath}/esm${subPath}${file}.js`,
        types: `${filePath}/esm${subPath}${file}.d.ts`
      },
      null,
      2
    ) + '\n'
  );
}

/**
 * Writes a package.json file for each resource in the specified directory.
 * @param {Object} options - The options for writing the package file.
 * @param {string[]} options.resources - The list of resources.
 * @param {string} options.pkgName - The base package name.
 * @param {string} options.dir - The directory where package.json will be written.
 * @param {string} options.subPath - The subpath for the resource.
 * @param {string} options.filePath - The file path to the resource.
 */
async function writePkgFile({
  resources = [],
  pkgName = '@rsuite/icons',
  dir = libRoot,
  subPath,
  filePath = '..'
}) {
  await Promise.all(
    resources.map(async item => {
      try {
        const name = item;
        const file = item;
        const proxyDir = path.join(dir, name);

        await mkDir(proxyDir, { recursive: true }); // Ensure directory creation is recursive
        await writeFile(
          `${proxyDir}/package.json`,
          proxyResource({ pkgName, name, file, filePath, subPath })
        );
      } catch (error) {
        console.error(`Error writing package.json for ${item}:`, error);
      }
    })
  );
}

/**
 * Main function to proxy components.
 */
async function proxyComponent() {
  try {
    const icons = findResources({
      dir: path.join(srcRoot, 'react'),
      isFile: true,
      ignores: ['legacy']
    });

    await writePkgFile({ resources: icons, subPath: '/react/' });

    const legacyIcons = findResources({
      dir: path.join(srcRoot, 'react/legacy'),
      isFile: true
    });

    await writePkgFile({
      resources: legacyIcons,
      pkgName: '@rsuite/icons/legacy',
      subPath: '/react/legacy/',
      filePath: '../..',
      dir: path.join(libRoot, 'legacy')
    });

    const components = ['Icon', 'IconProvider', 'createIconFont', 'createSvgIcon'];
    await writePkgFile({ resources: components });
  } catch (error) {
    console.error('Error in proxyComponent:', error);
  }
}

/**
 * Entry point function to trigger the proxying process.
 */
module.exports = async function proxy() {
  try {
    await proxyComponent();
  } catch (error) {
    console.error('Error in proxy:', error);
  }
};
