const commonTags = require('common-tags');
const writeToFile = require('../utils/writeToFile');

module.exports = (block) => {
    const file = commonTags.html`
    import React from 'react';
    import './${block.componentName}.scss'; 

    const ${block.componentName} = () => {
        return (
            <${block.type} className="${block.name}">
                ${block.elements.map((arr) => {
                    let str = `<${arr.type} className="${block.name}__${arr.name}"`
                    if (arr.type !== 'image' && arr.type !== 'input') {
                        str += `></${arr.type}>`
                    } else {
                        str += `/>`
                    }
                    return str
                }).join('\n')
                }
            </${block.type}>
        )
    }

    export default ${block.componentName};
    `;
    return writeToFile('js', file, block.componentName, block.name)
}