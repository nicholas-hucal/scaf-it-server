const knex = require('knex')(require('../knexfile.js').development);

exports.getBlock = (block_id) => {
    return knex('block')
        .select('block.*', 'block_modifier.name as modName')
        .where({ 'block.id': block_id })
        .leftJoin('block_modifier', 'block_modifier.block_id', '=', block_id)
        .then(res => {
            if (res[0].modName) {
                res[0].modifiers = res.map(mod => mod.modName);
            } else {
                res[0].modifiers = []
            }
            delete res[0].modName;
            return res[0]
        })
        .catch(err => {
            console.log(err)
        })
}

exports.createBlock = (block) => {
    return knex('block')
        .insert({
            user_id: block.user_id,
            name: block.name,
            type: block.type,
            file_type: 'rafce',
            kind: 'block'
        })
        .then(block_id => {
            return exports.createBlockMods(block.modifiers, block_id[0]) 
        })
        .then(block_id => {
            return exports.getBlock(block_id)
        })
        .then(block => {
            return block;
        })
        .catch(err => {
            console.log(err)
        })
}

exports.deleteBlock = (block_id) => {
    return knex('block')
        .where({ 'id': block_id })
        .del()
        .then(() => {
            return {'message': 'succesfully deleted row'}
        })
}

exports.editBlock = (block) => {
    return knex('block')
        .where({ 'block.id': block.id })
        .update({
            user_id: block.user_id,
            name: block.name,
            type: block.type,
            file_type: 'rafce',
        })
        .then(() => {
            return exports.deleteBlockMods(block.id)
        })
        .then(() => {
            return exports.createBlockMods(block.modifiers, block.id) 
        })
        .then(() => {
            return exports.getBlock(block.id);
        })
        .then(block => {
            return block;
        })
        .catch(err => {
            console.log(err)
        })
}

exports.deleteBlockMods = (block_id) => {
    return knex('block_modifier')
        .where({ 'block_id': block_id })
        .del()
        .then(() => {
            return true
        })
        .catch(err => {
            console.log(err)
        })
}

exports.createBlockMods = (modifiers, block_id) => {
    const mods = modifiers.map(mod => {
        return { block_id: block_id, name: mod }
    })
    //console.log(mods)
    //handle empty mods before arrival at server
    if (mods.length > 0) {
        return knex('block_modifier')
            .insert(mods)
            .then(() => {
                return block_id
            })
    } else {
        return block_id
    }
}