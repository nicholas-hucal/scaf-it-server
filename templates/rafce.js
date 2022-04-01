const commonTags = require('common-tags');
const writeToFile = require('../utils/writeToFile');

module.exports = (component) => {
    const createElements = (arr, children) => {
        const mods = arr.modifiers.map(mod => {
            return ` ${component.block.name}__${arr.name}--${mod}`
        })
        let str = `<${arr.type} className="${component.block.name}__${arr.name}${mods}"`
        if (arr.type !== 'img' && arr.type !== 'input') {
            str += `>`
            children.map((child, index, array) => {
                if (child.parent_id === arr.id) {
                    str += `\n\t${createElements(child, [])}`
                }
                if (array.length - 1 === index) {
                    str+= `\n`
                }
            })
            str += `</${arr.type}>`
        } else {
            str += `/>`
        }
        return str
    }

    const file = commonTags.html`
    import React from 'react';
    import './${component.componentName}.scss'; 

    const ${component.componentName} = () => {
        return (
            <${component.block.type} className="${component.block.name}">
                ${component.elements.map((arr) => {
                    return createElements(arr, component.children)
                }).join('\n')}
            </${component.block.type}>
        )
    }

    export default ${component.componentName};
    `;
    return writeToFile('js', file, component.componentName, component.block.name)
}