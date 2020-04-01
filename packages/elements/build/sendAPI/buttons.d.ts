import { GenericTemplate } from './templates';
/**
 * ebony-framework
 *
 * A module that includes the various Button types
 *
 * @module sendAPI/buttons
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */
/**
 * @typedef {object} SerializedButton
 * @property {string} type
 * @property {...string} params
 */
/** A General button class */
export declare class Button {
    type: string;
    params: {};
    /**
     * Creates a generic button
     * @param {string} type - The type of the button
     * @param {object} params - The various parameters the button includes
     */
    constructor(type: string, params?: {});
    /**
     * @returns {SerializedButton} - An object that is understandable by Facebook
     */
    serialize(): {
        type: string;
    };
}
/**
 * A URL Button
 * @extends Button
 */
export declare class UrlButton extends Button {
    /**
     * Create a UrlButton
     * @param {string} title - The title of the button
     * @param {string} url - The url the button points to
     * @param {?string} webview_height_ratio - The height of the webview viewport
     */
    constructor(title: string, url: string, webview_height_ratio?: string, messenger_extensions?: boolean);
}
/**
 * A Call Button
 * @extends Button
 */
export declare class CallButton extends Button {
    /**
     * Create a CallButton
     * @param {string} title - The title of the button
     * @param {string} payload - The phone number
     */
    constructor(title: string, payload: string);
}
/**
 * A Share button
 * @extends Button
 */
export declare class ShareButton extends Button {
    constructor(generic?: GenericTemplate | null);
}
/**
 * A Postback Button
 * @extends Button
 */
export declare class PostbackButton extends Button {
    /**
     * Create a PostbackButton
     * @param {string} title - The title of the button
     * @param {object|string} payload - The payload returned when the button is pushed
     */
    constructor(title: string, payload?: any | string);
}
//# sourceMappingURL=buttons.d.ts.map