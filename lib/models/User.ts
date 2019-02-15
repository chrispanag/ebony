import { UserSchema, UserModel } from "./UserSchema";

export default class User extends UserSchema {

    constructor(doc: any) {
        super(doc);

        if (!doc.active) {
            this.active = true;
        }
        if (!doc.cellLogin) {
            this.cellLogin = false;
        }
        if (!doc.handovered) {
            this.handovered = false;
        }
        if (!doc._context) {
            // Initialize context
            this._context = {};
        }
    }

    get fullname() {
        return `${this.first_name} ${this.last_name}`;
    }

    get context() {
        return this._context;
    }

    set context(context: any) {
        this._context = context;
        this.save();
    }
}