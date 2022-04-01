const createRafce = require('../templates/rafce');
const createRcc = require('../templates/rcc');
const createScss = require('../templates/scss');
const createZip = require('../utils/createZip');
const helpers = require('../utils/helpers');
const knex = require('knex')(require('../knexfile.js').development);
const elementModel = require('../models/elementModel');
const blockModel = require('../models/blockModel');

exports.createArchive = (sentBlock) => {
    return exports.getComponent(sentBlock)
        .then(component => {
            component.componentName = helpers.createComponentName(component.block.name);
            // const rafce = createRafce(component);
            const rcc = createRcc(component);
            const scss = createScss(component);
            createZip(rcc, scss);
            return `${process.env.DOWNLOAD_LINK}${component.componentName}.zip`
        })
    }

exports.getComponent = (sentBlock) => {
    let component = {block: {}, elements: [], children: []};
    return blockModel.getBlock(sentBlock.id)
        .then(block => {
            return block
        })
        .then(block => {
            component.block = block
            return knex('block_element')
                .select('element_id')
                .where({'block_id': block.id})
                .then(res => {
                    return res
                })
        })
        .then(element_ids => {
            return Promise.all(element_ids.map(element_id => {
                return elementModel.getElement(element_id.element_id)
                    .then(element => {
                        component.elements.push(element);
                        return element.id
                    })
            }))
        })
        .then(parent_ids => {
            return Promise.all(parent_ids.map(parent_id => {
                return knex('element_element')
                    .where({'parent_id': parent_id})
                    .then(res => {
                        return res
                    })
            }))
        })
        .then(parents_children => {
            return Promise.all(parents_children.map(parent => {
                return Promise.all(parent.map(children => {
                    if (children)
                    return elementModel.getElement(children.child_id)
                        .then(child => {
                            child.parent_id = children.parent_id;
                            component.children.push(child);
                            return child.id
                        })
                }))
            }))
        })
        .then(() => {
            return component;
        })
}