const helpers = require('../utils/helpers');

exports.default = (name) => {
    return {
        name: name,
        type: 'main',
        componentName: helpers.createComponentName(test),
        modifiers: [
            {
                id: 3434343,
                element_id: 83838383,
                name: 'active'
            }
        ],
        elements: [
            {
                id: 83838383,
                name: 'header',
                type: 'section',
                sort: 1,
                modifiers: [
                    {
                        id: 3434343,
                        element_id: 83838383,
                        name: 'active'
                    },
                    {
                        id: 3434344,
                        element_id: 83838383,
                        name: 'deleted'
                    }
                ]
            },
            {
                id: 83838381,
                name: 'logo',
                type: 'image',
                sort: 1,
                modifiers: []
            }
        ]
    }
}