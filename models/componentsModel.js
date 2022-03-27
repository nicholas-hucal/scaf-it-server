const block = require('../utils/exampleBlock');
const createRafce = require('../templates/rafce');
const createScss = require('../templates/scss');
const createZip = require('../utils/createZip');

exports.index = () => {
    const rafce = createRafce(block('test-block'));
    const scss = createScss(block('test-block'));
    createZip(rafce, scss);
    return rafce
}