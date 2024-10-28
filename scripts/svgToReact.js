const svgr = require('@svgr/core');
const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const camelCase = require('camelcase');

const resolvePath = (...paths) => path.resolve(__dirname, ...paths);
const SOURCE_DIR = resolvePath('../src/svg');
const DIST_DIR = resolvePath('../src/icons');

/**
 * Get the component name based on the SVG file path.
 *
 * @param {string} svgPath - The path of the SVG file.
 * @returns {string} The generated component name.
 */
function getComponentName(svgPath) {
  const basename = path.basename(svgPath);
  return camelCase(path.basename(basename, path.extname(basename)), { pascalCase: true });
}

/**
 * Write the generated component code to a file.
 *
 * @param {string} componentName - The name of the component.
 * @param {string} svgPath - The path of the original SVG file.
 * @param {string} jsCode - The generated React component code.
 */
function writeComponentFile(componentName, svgPath, jsCode) {
  const category = path.relative(SOURCE_DIR, path.dirname(svgPath));
  const outputDir = path.join(DIST_DIR, category);

  fs.mkdirpSync(outputDir); // Ensure the output directory exists
  fs.outputFileSync(
    path.join(outputDir, `${componentName}.tsx`),
    `// Generated by script, please do not edit this file.
${jsCode}`
  );
}

/**
 * Generate React components from SVG files.
 */
module.exports = function svgToReact() {
  fs.mkdirpSync(DIST_DIR);
  console.log('✨ Generating React components from SVG files...');

  const svgFiles = glob.sync(`${SOURCE_DIR}/**/*.svg`);
  console.log(`📁 Found ${svgFiles.length} SVG files.`);

  let successCount = 0; // Counter for successful component generations

  svgFiles.forEach((svgPath, index) => {
    const componentName = getComponentName(svgPath);
    const svgCode = fs.readFileSync(svgPath, 'utf8');

    console.log(`(${index + 1}/${svgFiles.length}) 🛠️ Generating ${componentName}.tsx ...`);

    try {
      const jsCode = svgr.transform.sync(
        svgCode,
        {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
          typescript: true,
          prettier: true,
          svgo: true,
          ref: true,
          expandProps: 'end',
          svgProps: {
            width: '1em',
            height: '1em',
            fill: 'currentColor'
          }
        },
        { componentName }
      );

      writeComponentFile(componentName, svgPath, jsCode);
      successCount++; // Increment success counter
    } catch (error) {
      console.error(`❌ Error generating ${componentName}:`, error.message);
    }
  });

  console.log(`✅ Successfully generated ${successCount} component(s).`);
};