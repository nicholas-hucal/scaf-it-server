const archiver = require('archiver');
const fs = require('fs');

module.exports = (jsFileInfo, scssFileInfo) => {
    const output = fs.createWriteStream(`./public/components/${jsFileInfo.componentName}.zip`);
    const archive = archiver('zip', {
        zlib: { level: 9 }
    });
    output.on('close', function () {
        fs.unlinkSync(jsFileInfo.fileName);
        fs.unlinkSync(scssFileInfo.fileName);
    });
    output.on('end', function () {
        console.log('Data has been drained');
    });
    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            console.log(err);
        } else {
            throw err;
        }
    });
    archive.on('error', function (err) {
        throw err;
    });
    archive.pipe(output);
    archive.append(fs.createReadStream(jsFileInfo.fileName), { name: `${jsFileInfo.componentName}.js` });
    archive.append(fs.createReadStream(scssFileInfo.fileName), { name: `${scssFileInfo.componentName}.scss` });
    archive.finalize();
}