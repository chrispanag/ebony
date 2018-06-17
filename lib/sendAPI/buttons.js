class Button {
    constructor(type, params = {}) {
        this.type = type;
        this.params = params;
    }

    serialize() {
        const basicButton = {
            type: this.type,
        }

        return Object.assign(basicButton, this.params);
    }
}

class UrlButton extends Button {
    constructor(title, url, webview_height_ratio = "full") {
        super("web_url", {
            title,
            url,
            webview_height_ratio
        });
    }
}

class CallButton extends Button {
    constructor(title, payload) {
        super("phone_number", {
            title,
            payload
        });
    }
}

class ShareButton extends Button {
    constructor(generic = null) {
        let params = {}
        if (generic)
            params = {
                share_contents: {
                    attachment: JSON.stringify(generic)
                }
            }
            
        super("element_share", params);
    }
}

class PostbackButton extends Button {
    constructor(title, payload) {
        super("postback", {
            title,
            payload
        });
    }
}

module.exports = {
    UrlButton,
    CallButton,
    ShareButton,
    PostbackButton
};
