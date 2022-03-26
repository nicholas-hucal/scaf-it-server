const commonTags = require('common-tags');
const writeToFile = require('../utils/writeToFile');

module.exports = (block) => {
    const file = commonTags.html`
    .${block.name} {
        ${block.modifiers.map(blockMod => {
            return `\n&--${blockMod.name} {\n}\n`
        }).join('\n')}
        ${block.elements.map(el => {
            let elem = `&__${el.name} {\n`
            if (el.modifiers.length > 0) {
                elem += '\t' +el.modifiers.map(mod => `\n\t&--${mod.name} {\n\t}`).join('\n\t') + '\n\n'
            }
            elem += '}\n';
            return elem;
        }).join('\n')}
    }
    `;
    return writeToFile('scss', file, block.componentName, block.name)
}