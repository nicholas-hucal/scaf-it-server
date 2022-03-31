const createRafce = require('../templates/rafce');
const createScss = require('../templates/scss');
const createZip = require('../utils/createZip');
const helpers = require('../utils/helpers');
const knex = require('knex')(require('../knexfile.js').development);

exports.createArchive = (component) => {
    component.componentName = helpers.createComponentName(component.name);
    const rafce = createRafce(component);
    const scss = createScss(component);
    createZip(rafce, scss);
    return `${process.env.DOWNLOAD_LINK}${component.componentName}.zip`
}