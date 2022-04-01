const fs = require('fs');

module.exports = (type, file, componentName, blockName) => {
    let fileName = `./temp/components/${componentName}.${type}`;
    fs.writeFileSync(fileName, file);
    return {
        file: file,
        fileName: fileName,
        componentName: componentName,
        blockName: blockName
    };
}