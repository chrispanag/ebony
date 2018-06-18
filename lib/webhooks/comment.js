/*
 * ebony-framework
 * Copyright(c) 2018 Christos Panagiotakopoulos
 * MIT Licensed
 */

function commentWebhook(FB_PAGE_ID, { isContestPost = () => null, contestEnroll = () => null }) {
    if (!FB_PAGE_ID)
        throw new Error("[Fatal] Comment Webhook: No FB_PAGE_ID is set");

    return data => {
        if (data.item == 'comment') {
            if (data.from.id != FB_PAGE_ID) {
                if (isContestPost(data.parent_id) && isContestPost(data.post_id) && data.verb == "add") {
                    const { num } = isContestPost(data.parent_id);
                    return contestEnroll(data, num);
                }
            }
        }
    };
}

module.exports = commentWebhook;

