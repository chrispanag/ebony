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

        const {
            firstName = '',
            lastName = '',
            gender = "male",
            active = true,
            handovered = false,
            cellLogin = false
        } = data;

        this.id = data.id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.active = active;
        this.handovered = handovered;
        this.cellLogin = cellLogin;

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

    public async setContext(context: any) {
        this.context = context;
        await UserModel.collection.updateOne({ id: this.id }, { $set: { context } });
        return context;
    }

    public static async findByProviderId(id: string): Promise<IUser | null> {
        const res = await UserModel.findOne({ id });
        if (!res) {
            return null;
        }

        return res;
    }

}