const _ = require('lodash');
const { resolve } = require('path');
const { readFileSync } = require('fs');

function readProfile() {
    try {
        // Read Messenger Profile File
        const json = readFileSync(resolve(__dirname, '../../config/profile.json'));
        const [persistent_menu] = JSON.parse(json).persistent_menu;
        const menu = persistent_menu.call_to_actions.map(e => {
            const { title, type } = e;
            if (type == "postback")
                return { title, payload: e.payload };

            if (type == "nested")
                return e.call_to_actions.map(ne => {
                    const { title, type } = ne;
                    if (type == "postback")
                        return { title, payload: ne.payload };

                    return false;
                });

            return false;
        });

        return _.compact(_.flatten(menu));

    } catch (err) {
        // Handle Errors on the reading of the file
        if (err.code == 'ENOENT') {
            console.log("[Error] profile.json not found");
            return [];
        }

        console.log(err);
        throw new Error("[Error] Error reading profile.json");
    }
}

module.exports = readProfile;
