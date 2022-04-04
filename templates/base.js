const commonTags = require('common-tags');
const writeToFile = require('../utils/writeToFile');

module.exports = (component) => {
    const file = commonTags.html`
    export { default } from './${component.componentName}';
    `;
    return writeToFile('js', file, 'index', component.block.name)
}