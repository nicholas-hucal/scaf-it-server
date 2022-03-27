const block = require('../utils/exampleBlock');
const createRafce = require('../templates/rafce');
const createScss = require('../templates/scss');
const createZip = require('../utils/createZip');
const helpers = require('../utils/helpers');

exports.index = (component) => {
    component.componentName = helpers.createComponentName(component.name);
    const rafce = createRafce(component);
    const scss = createScss(component);
    createZip(rafce, scss);
    return rafce
}