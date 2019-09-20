/**
 * ebony-framework
 *
 * @module utilities/menuProcessor
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */

const readProfileJSON = require('./profileReader');

interface PostbackCall {
    title: string;
    payload?: string;
}

function menuFactory() {

    const menu_entries = readProfileJSON();

    function isMenu({ title, payload }: PostbackCall) {
        if (menu_entries.find((s: any) => ((s.title === title) || (s.payload === payload)))) {
            return true;
        }

        return false;
    }

    function titlesToPayloadsMenu() {
        const mapping: { [key: string]: any } = {};
        for (const pair of menu_entries) {
            mapping[pair.title] = pair.payload;
        }

        return mapping;
    }

    return {
        isMenu,
        titlesToPayloadsMenu
    };
}

module.exports = menuFactory;
