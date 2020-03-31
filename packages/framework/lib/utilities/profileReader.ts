/**
 * ebony-framework
 *
 * @module utilities/profileReader
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */

import { compact, flatten } from 'lodash';
import { resolve } from 'path';
import { readFileSync } from 'fs';

function readProfile() {
    try {
        // Read Messenger Profile File
        const json = readFileSync(resolve(__dirname, '../../config/profile.json'), {
            encoding: 'utf16'
        });
        const [persistent_menu] = JSON.parse(json).persistent_menu;
        const menu = persistent_menu.call_to_actions.map((e: any) => {
            const { title, type } = e;
            if (type === 'postback') {
                return { title, payload: e.payload };
            }

            if (type === 'nested') {
                return e.call_to_actions.map((ne: any) => {
                    if (ne.type === 'postback') {
                        return { title: ne.title, payload: ne.payload };
                    }

                    return false;
                });
            }

            return false;
        });

        return compact(flatten(menu));
    } catch (err) {
        // Handle Errors on the reading of the file
        if (err.code === 'ENOENT') {
            console.log('[Warning] profile.json not found');
            return [];
        }

        throw new Error('[Error] Error reading profile.json');
    }
}

module.exports = readProfile;
