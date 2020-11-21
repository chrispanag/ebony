import { UserModel, IUser } from './UserSchema';
export default class User<DataModel extends IUser> implements IUser {
    public id: string;
    public firstName: string;
    public lastName: string;
    public gender: string;
    public active: boolean;
    public data: any;

    public handovered: boolean;

    public doc: DataModel;
    protected _context: any;

    constructor(data: DataModel) {
        this.doc = data;

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
}

export function userLoader() {
    throw new Error('Not Implemented!');
}
