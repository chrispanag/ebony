import { MongooseDocument, Document, Model, modelNames, model } from 'mongoose';
import { UserModel, IUser } from './UserSchema';

export default class User extends UserModel {

    public id: string;
    public firstName: string;
    public lastName: string;
    public gender: string;
    public active: boolean;

    public handovered: boolean;
    public cellLogin: boolean;
    public provider: string;

    private _context: any;

    constructor(data: IUser) {
        super(data);

        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.gender = data.gender;
        this.active = data.active;
        this.handovered = data.handovered;
        this.cellLogin = data.cellLogin;
        this.provider = data.provider;

        this._context = data.context;

        if (!data.active) {
            this.active = true;
        }
        if (!data.cellLogin) {
            this.cellLogin = false;
        }
        if (!data.handovered) {
            this.handovered = false;
        }
        if (!data.context) {
            // Initialize context
            this._context = {};
        }
    }

    get fullname() {
        return `${this.firstName} ${this.lastName}`;
    }

    get context() {
        return Object.assign({}, this._context);
    }

    set context(context: any) {
        this._context = context;
    }

    static async findByProviderId(id: string): Promise<User | null> {
        const res = await UserModel.findOne({ id });
        if (!res) {
            return null;
        }
        
        return new User(res);
    }
}