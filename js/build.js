import fs from 'fs';
import path from 'path';
import { PurgeCSS } from 'purgecss';
import { minify } from 'html-minifier-terser';

const screensDir = './screens';

const templatePath = './template.html';
const outputPath = './indexNew.html';

// svgs
const logoPath = './svgs/svgLogo.html'
const operatorsPath = './svgs/operators.html';


try {
    // 1. Alle Dateien im Ordner screens/ auslesen
    let template = fs.readFileSync(templatePath, 'utf8');

    let mergedScreens = '';

    const screenFiles = fs.readdirSync(screensDir);
    // HTML
    screenFiles.forEach(file => {
        if (file.endsWith('.html')) {
            const filePath = path.join(screensDir, file);
            mergedScreens += fs.readFileSync(filePath, 'utf8') + '\n';
        }
    });

    // CSS
    let cssString = '';
    const cssPaths = [
        // 'C:/git/mo-hi.github.io/basis/css-libs/bulma.css',

        'C:/git/mo-hi.github.io/basis/css/b.css',
        // 'C:/git/mo-hi.github.io/navbar/css/nav.css',

        './node css/nav.css',
        './node css/problemContainer.css',
        './node css/actionItems.css',
        './node css/app.css',
        './node css/body.css',
        './node css/colors.css',
        './node css/btn.css',
        './node css/rest.css',
    ]
    for (let path of cssPaths) {
        cssString += fs.readFileSync(path, 'utf8') + '\n';
    }

    //PurgeCSS anwenden: Nur genutzte CSS-Regeln & Farben behalten
    const purgeCSSResults = await new PurgeCSS().purge({
        content: [
            { raw: mergedScreens, extension: 'html' },
            { raw: template, extension: 'html' }
        ],
        css: [{ raw: cssString }],
        safelist: [':root', 'error-shake', 'success-jump', /is-/], // keep progress segment classes
    });
    let minCss = `<style>\n${purgeCSSResults[0].css}\n</style>`;

    // Nur JavaScript-Dateien aus dem node css-Ordner einfügen
    let scriptString = '';
    const scriptPaths = [
        // 'C:/git/mo-hi.github.io/basis/js/customElements_SelectionPill.js',
        './js/selectScreen.js',
        './js/changeTheme.js',
        './js/gameSession.js',
        './js/game.js',
        './js/user.js',
        './js/visualEffects.js',
    ]
    for (let path of scriptPaths) {
        scriptString += fs.readFileSync(path, 'utf8') + '\n';
    }


    // build index from template
    template = template.replace('<!-- SCREENS NODE JS-->', mergedScreens);
    template = template.replace('<!-- STYLES NODE-JS -->', minCss);
    template = template.replace('// SCRIPTS NODE-JS //', scriptString);

    // replace placeholder inside screens
    // replace logo
    const logoContent = fs.readFileSync(logoPath, 'utf8');
    template = template.replace('<!-- LOGO NODE JS-->', logoContent);

    // replace operators
    const operatorsText = fs.readFileSync(operatorsPath, 'utf8');
    template = template.replace('<!-- SVG-PLUS NODE-JS -->', getSvgById(operatorsText, 'svg-plus'));
    template = template.replace('<!-- SVG-MINUS NODE-JS -->', getSvgById(operatorsText, 'svg-minus'));
    template = template.replace('<!-- SVG-MULTIPLY NODE-JS -->', getSvgById(operatorsText, 'svg-multiply'));
    template = template.replace('<!-- SVG-DIVIDE NODE-JS -->', getSvgById(operatorsText, 'svg-divide'));


    // 4. Fertige index.html schreiben
    const minifiedTemplate = await minify(template, {
        collapseWhitespace: true,
        removeComments: true,
        // minifyCSS: true,
        // minifyJS: true,
    });
    fs.writeFileSync(outputPath, minifiedTemplate);
    console.log('✅ Erfolg: index.html wurde erfolgreich generiert!');
} catch (error) {
    console.error('❌ Fehler beim Bauen der index.html:', error);
}


function getSvgById(text, svgId) {
    // Sucht dynamisch nach dem <svg ... id="GEWÜNSCHTE_ID"> ... </svg> Block
    const regex = new RegExp(`(<svg[^>]*id=["']${svgId}["'][\\s\\S]*?<\/svg>)`, 'i');
    const match = text.match(regex);

    return match ? match[1] : null;
}