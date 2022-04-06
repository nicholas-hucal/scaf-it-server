const commonTags = require('common-tags');
const writeToFile = require('../utils/writeToFile');

module.exports = (component) => {
    const names = []
    const allElements = component.elements.concat(component.children);
    allElements.forEach(el => !names.includes(el.name) && names.push(el.name))
    const filtered = names.map(name => {
        const element = {name: name, modifiers: []}
        allElements.forEach(el => {
            if (name === el.name) {
                element.modifiers = element.modifiers.concat(el.modifiers);
            }
        })
        return element
    })
    const file = commonTags.html`
    .${component.block.name} {
        ${component.block.modifiers.map(blockMod => {
            return `\n&--${blockMod} {\n}\n`
        }).join('\n')}
        ${filtered.map(el => {
            let elem = `&__${el.name} {\n`
            if (el.modifiers.length > 0) {
                elem += '\t' +el.modifiers.map(mod => `\n\t&--${mod} {\n\t}`).join('\n\t') + '\n\n'
            }
            elem += '}\n';
            return elem;
        }).join('\n')}
    }
    `;
    return writeToFile('scss', file, component.componentName, component.block.name)
}