const block = require('../utils/exampleBlock');
const createRafce = require('../templates/rafce');
const createScss = require('../templates/scss');
const createZip = require('../utils/createZip');
const helpers = require('../utils/helpers');
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
            res[0].kind = 'block';
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
            color: '#fff'
        })
        .then(block_id => {
            const mods = block.modifiers.map(mod => {
                return { block_id: block_id[0], name: mod }
            })
            if (mods.length > 0) {
                return knex('block_modifier')
                    .insert(mods)
                    .then(() => {
                        return exports.getBlock(block_id[0])
                    })
                    
            } else {
                return exports.getBlock(block_id[0])
            }
        })
        .then(block => {
            return block;
        })
        .catch(err => {
            console.log(err)
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
            color: '#fff'
        })
        .then(block_id => {
            console.log(block_id)
            // const mods = block.modifiers.map(mod => {
            //     return { block_id: block_id[0], name: mod }
            // })
            // if (mods.length > 0) {
            //     return knex('block_modifier')
            //         .update(mods)
            //         .then(() => {
            //             return exports.getBlock(block_id[0])
            //         })
                    
            // } else {
            //     return exports.getBlock(block_id[0])
            // }
        })
        .then(block => {
            return block;
        })
        .catch(err => {
            console.log(err)
        })
}