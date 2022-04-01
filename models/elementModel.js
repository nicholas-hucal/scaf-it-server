const knex = require('knex')(require('../knexfile.js').development);

exports.getElement = (element_id) => {
    return knex('element')
        .select('element.*', 'element_modifier.name as modName')
        .where({ 'element.id': element_id })
        .leftJoin('element_modifier', 'element_modifier.element_id', '=', element_id)
        .then(res => {
            if (res[0].modName) {
                res[0].modifiers = res.map(mod => mod.modName);
            } else {
                res[0].modifiers = []
            }
            delete res[0].modName;
            res[0].kind = 'element';
            res[0].elements = [];
            return res[0]
        })
        .catch(err => {
            console.log(err)
        })
}

exports.createElement = (element) => {
    return knex('element')
        .insert({
            name: element.name,
            type: element.type,
            sort: 0
        })
        .then(element_id => {
            return exports.createElementMods(element.modifiers, element_id[0]) 
        })
        .then(element_id => {
            if (element.parent.kind === 'block') {
                return exports.createBlockElements(element.parent.user_id, element_id)
            } else {
                return exports.createElementElements(element.parent.user_id, element_id)
            }
        })
        .then(element_id => {
            return exports.getElement(element_id)
        })
        .then(element => {
            return element;
        })
        .catch(err => {
            console.log(err)
        })
}

exports.createElementElements = (parent_id, child_id) => {
    return knex('element_element')
        .insert({
            parent_id: parent_id,
            child_id: child_id
        })
        .then(() => {
            return child_id;
        })
        .catch(() => {
            return false;
        })
}

exports.createBlockElements = (block_id, element_id) => {
    return knex('block_element')
        .insert({
            block_id: block_id,
            element_id: element_id
        })
        .then(() => {
            return element_id;
        })
        .catch(() => {
            return false;
        })
}

exports.deleteElement = (element_id) => {
    return knex('element')
        .where({ 'id': element_id })
        .del()
        .then(() => {
            return {'message': 'succesfully deleted row'}
        })
}

// exports.editBlock = (block) => {
//     return knex('block')
//         .where({ 'block.id': block.id })
//         .update({
//             user_id: block.user_id,
//             name: block.name,
//             type: block.type,
//             file_type: 'rafce',
//         })
//         .then(() => {
//             return exports.deleteBlockMods(block.id)
//         })
//         .then(() => {
//             return exports.createBlockMods(block.modifiers, block.id) 
//         })
//         .then(() => {
//             return exports.getBlock(block.id);
//         })
//         .then(block => {
//             return block;
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }

// exports.deleteBlockMods = (block_id) => {
//     return knex('block_modifier')
//         .where({ 'block_id': block_id })
//         .del()
//         .then(() => {
//             return true
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }

exports.createElementMods = (modifiers, element_id) => {
    const mods = modifiers.map(mod => {
        return { element_id: element_id, name: mod }
    })
    if (mods.length > 0) {
        return knex('element_modifier')
            .insert(mods)
            .then(() => {
                return element_id
            })
    } else {
        return element_id
    }
}