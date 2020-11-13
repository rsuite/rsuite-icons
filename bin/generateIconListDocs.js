const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');

const SRC_DIR = '../node_modules/rsuite-icon-font/lib';

/**
 * Dist directory
 * @type {string}
 */
const DIST_DIR = '../docs';

const resolvePath = (...paths) => path.resolve(__dirname, ...paths);

module.exports = function() {
  const files = glob.sync(resolvePath(`${SRC_DIR}/**/*.js`));
  let imports = '',
    groups = {},
    content = '';
  files.forEach(function generateComponent(svgPath, index) {
    const basename = path.basename(svgPath);
    const componentName = path.basename(basename, path.extname(basename));
    const categoryName = path.relative(path.resolve(__dirname, SRC_DIR), path.dirname(svgPath));
    const isLegacy = categoryName === 'legacy';
    const importName = `${componentName}${isLegacy ? 'Legacy' : ''}`;
    imports += `\nimport ${importName} from '../src/icons${
      isLegacy ? '/legacy' : ''
    }/${componentName}'; //${categoryName}`;
    const info = {
      component: importName,
      iconName: componentName
    };
    if (groups[categoryName]) {
      groups[categoryName].push(info);
    } else {
      groups[categoryName] = [info];
    }
  });
  Object.entries(groups).map(([categoryName, components]) => {
    content += `\n<h3>${categoryName}</h3>`;
    content = components.reduce((content, { component, iconName }, index) => {
      if (index === 0) {
        content += '\n<ul>';
      }
      content += `\n  <li>
    <${component} />
    <span className="icon-label">${iconName}</span>
  </li>`;
      if (index === components.length - 1) {
        content += '\n</ul>';
      }
      return content;
    }, content);
  });

  const IconListString = prettier.format(
    `//This file generated by bin/generateIconListDocs.js
import React from 'react';
${imports}

const IconList = () => {
  return (
    <div className="icon-list-wrapper">
      ${content}
    </div>
  );
};

export default IconList;`,
    {
      parser: 'babel',
      printWidth: 100,
      tabWidth: 2,
      singleQuote: true
    }
  );

  fs.outputFileSync(resolvePath(DIST_DIR, 'IconList.tsx'), IconListString);
};