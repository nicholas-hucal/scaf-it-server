const fs = require('fs');
const archiver = require('archiver');
const commonTags = require('common-tags');

exports.index = () => {
    const test = 'another-component'

    const block = {
        name: test,
        type: 'main',
        componentName: createComponentName(test),
        modifiers: [
            {
                id: 3434343,
                element_id: 83838383,
                name: 'active'
            }
        ],
        elements: [
            {
                id: 83838383,
                name: 'header',
                type: 'section',
                sort: 1,
                modifiers: [
                    {
                        id: 3434343,
                        element_id: 83838383,
                        name: 'active'
                    },
                    {
                        id: 3434344,
                        element_id: 83838383,
                        name: 'deleted'
                    }
                ]
            },
            {
                id: 83838381,
                name: 'logo',
                type: 'image',
                sort: 1,
                modifiers: []
            }
        ]
    }
    // const rcc = createRcc(block);
    const rafce = createRafce(block);
    const scss = createScss(block);
    createZip(rafce, scss);
    return rafce
}


const writeToFile = (type, file, componentName, blockName) => {
    let fileName = `./temp/components/${blockName}.${type}`;
    fs.writeFileSync(fileName, file);
    return {
        file: file,
        fileName: fileName,
        componentName: componentName,
        blockName: blockName
    };
}

const createComponentName = (name) => {
    return name.split('-').map(piece => capitalize(piece)).join('');
}

const capitalize = string => {
    return string[0].toUpperCase() + string.slice(1);
}

const createScss = (block) => {
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

const createRafce = (block) => {
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

const createRcc = (block) => {
    const file = commonTags.html`
    import React, { Component } from 'react';
    import './${block.componentName}.scss'; 

    class ${block.componentName} extends Component {
        render() {
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
    }

    export default ${block.componentName};
    `;
    return writeToFile('js', file, block.componentName, block.name)
}

const createZip = (jsFileInfo, scssFileInfo) => {
    // create a file to stream archive data to.
    const output = fs.createWriteStream(`./public/components/${jsFileInfo.componentName}.zip`);
    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });
    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
        fs.unlinkSync(jsFileInfo.fileName);
        fs.unlinkSync(scssFileInfo.fileName);
    });
    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function () {
        console.log('Data has been drained');
    });
    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            console.log(err);
        } else {
            throw err;
        }
    });
    // good practice to catch this error explicitly
    archive.on('error', function (err) {
        throw err;
    });
    // pipe archive data to the file
    archive.pipe(output);
    // append a file from stream
    archive.append(fs.createReadStream(jsFileInfo.fileName), { name: `${jsFileInfo.componentName}.js` });
    archive.append(fs.createReadStream(scssFileInfo.fileName), { name: `${scssFileInfo.componentName}.scss` });

    archive.finalize();
}