/*!
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

const readProfileJSON = require('./profileReader');

function menuFactory() {

    const menu_entries = readProfileJSON();

    function isMenu({ title, payload }) {
        if (menu_entries.find(s => ((s.title == title)  ||(s.payload == payload))))
            return true;
            
        return false;
    }

    function titlesToPayloadsMenu() {
        const mapping = {};
        for (const pair of menu_entries) {
            mapping[pair.title] = pair.payload;
        }

        return mapping;
    }

    return {
        isMenu,
        titlesToPayloadsMenu 
    }
}

module.exports = menuFactory;
