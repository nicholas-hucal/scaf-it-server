const fs = require('fs');

exports.default = (type, file, componentName, blockName) => {
    let fileName = `./temp/components/${blockName}.${type}`;
    fs.writeFileSync(fileName, file);
    return {
        file: file,
        fileName: fileName,
        componentName: componentName,
        blockName: blockName
    };
}