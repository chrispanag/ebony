/**
 * ebony-framework
 * 
 * @module webhooks/commentWebhook
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 * 
 */

/**
 * @param {string} FB_PAGE_ID - The Page ID of the page being watched
 * @param {object} options    - The functions run
 * @param {function} options.isContestPost - The function that checks if a post is watched
 * @param {function} options.contestEnroll - The function that runs after somebody comments on a watched post
 * @returns {function} - Returns a function that runs when a feed change happens
 * @throws Will throw an error if the FB_PAGE_ID argument is not set
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
