/**
 * ebony-framework
 *
 * @module sendAPI
 * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
 * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
 * @license MIT
 *
 */
import * as attachments from './attachments';
import * as buttons from './buttons';
import * as quickreplies from './quickreplies';
import * as templates from './templates';
import { Message } from './message';
declare const elements: {
    cardElement({ title, subtitle, image_url, buttons }: import("./interfaces").ElementInput): {
        title: string | null;
        subtitle: string | null;
        image_url: string | null;
        buttons: {}[];
    };
    listElement({ title, subtitle, image_url, action, buttons }: import("./interfaces").ListElementInput): {
        title: string | null;
        image_url: string | null;
        subtitle: string | null;
        default_action: string | null;
        buttons: {}[];
    };
    ButtonTemplate: typeof templates.ButtonTemplate;
    GenericTemplate: typeof templates.GenericTemplate;
    ListTemplate: typeof templates.ListTemplate;
    MediaTemplate: typeof templates.MediaTemplate;
    QuickReply: typeof quickreplies.QuickReply;
    LocationQuickReply: typeof quickreplies.LocationQuickReply;
    TextQuickReply: typeof quickreplies.TextQuickReply;
    /**
     * ebony-framework
     *
     * @module sendAPI
     * @author Christos Panagiotakopoulos <chrispanag@gmail.com>
     * @copyright Copyright(c) 2018 Christos Panagiotakopoulos
     * @license MIT
     *
     */
    Attachment: typeof attachments.Attachment;
    ImageAttachment: typeof attachments.ImageAttachment;
    TemplateAttachment: typeof attachments.TemplateAttachment;
    Button: typeof buttons.Button;
    UrlButton: typeof buttons.UrlButton;
    CallButton: typeof buttons.CallButton;
    ShareButton: typeof buttons.ShareButton;
    PostbackButton: typeof buttons.PostbackButton;
};
export { Message, elements };
//# sourceMappingURL=index.d.ts.map