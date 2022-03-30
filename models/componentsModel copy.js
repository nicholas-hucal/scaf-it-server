const block = require('../utils/exampleBlock');
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

exports.getBlock = (block_id) => {
    return knex('block_element')
        .select('block.id', 'block.user_id', 'block.name', 'block.type', 'block.file_type', 'block.color')
        .where({'block_id': block_id})
        .join('block', 'block.id', '=', 'block_element.block_id')
        .then(res => {
            return exports.getBlockElements(res[0])
        })
        .catch(err => {
            console.log(err)
        })
}

exports.getBlockElements = (block) => {
    return knex('block_element')
        .select('element.id', 'element.name', 'element.type', 'element.sort', 'element.color')
        .where({'block_id': block.id})
        .join('element', 'element.id', '=', 'block_element.element_id')
        .then(res => {
            block.elements = res;
            return block
        })
        .catch(err => {
            console.log(err)
        })
}

exports.createComponent = (component) => {
    return exports.createBlock(component)
        .then(block_id => {
            return exports.createElements(component.elements, block_id);
        })
        .then(block_id => {
            return exports.getBlock(block_id[0]);
        })
        .then(block => {
            block.link = exports.createArchive(component);
            return block
        })
};

exports.createBlock = (component) => {
    return knex('block')
        .insert({
            user_id: component.user.id,
            name: component.name,
            type: component.type,
            file_type: component.file_type
        })
        .then(block_id => {
            const mods = component.modifiers.map(mod => {
                return { block_id: block_id[0], name: mod }
            })
            if (mods.length > 1) {
                knex('block_modifier')
                .insert(mods)
                .then(() => {
                    return block_id[0]
                })
            } else {
                return block_id[0]
            }
        })
        .catch(err => {
            console.log(err)
        })
}

exports.createElements = (elements, block_id) => {
    return Promise.all(elements.map((element) => {
        return knex('element')
            .insert({
                name: element.name,
                type: element.type,
                sort: element.sort,
                color: '#fff',
            })
            .then(element_id => {
                return knex('block_element')
                    .insert({
                        block_id: block_id,
                        element_id: element_id[0]
                    })
                    .then(() => {
                        return element_id[0]
                    })
            })
            .then(element_id => {
                element.modifiers.forEach(mod => {
                    knex('element_modifier')
                        .insert({
                            element_id: element_id,
                            name: mod
                        })
                })
            })
            .then(() => {
                return block_id
            })
            .catch(err => {
                console.log(err)
            })
    }))
}