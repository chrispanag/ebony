import { UserModel, IUser } from './UserSchema';

export default class User extends UserModel {
    public id: string;
    public firstName: string;
    public lastName: string;
    public gender: string;
    public active: boolean;
    public data: any;

    public handovered: boolean;

    private _context: any;

    constructor(data: IUser) {
        super(data);

        const {
            firstName = '',
            lastName = '',
            gender = 'male',
            active = true,
            handovered = false,
            data: userData = null
        } = data;

        this.id = data.id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.active = active;
        this.handovered = handovered;
        this.data = userData;

        this._context = data.context;

        if (!data.active) {
            this.active = true;
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

    public async setContext(context: any) {
        this._context = context;
        await UserModel.collection.updateOne({ id: this.id }, { $set: { context } });
        return context;
    }

    public static async findByProviderId(id: string): Promise<IUser | null> {
        return await UserModel.findOne({ id });
    }
}
