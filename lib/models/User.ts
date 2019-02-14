import { UserSchema } from "./UserSchema";

export default class User extends UserSchema {
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