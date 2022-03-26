const archiver = require('archiver');
const fs = require('fs');

module.exports = (jsFileInfo, scssFileInfo) => {
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