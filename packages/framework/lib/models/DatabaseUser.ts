import { Document } from 'mongoose';
import { IUser, UserModel } from './UserSchema';
import User from './User';

export default class DatabaseUser extends User<IUser & Document> {
    constructor(data: IUser) {
        super(new UserModel(data));
    }

    public async setContext<T extends Record<string, any>>(context: T): Promise<T> {
        this._context = context;
        await UserModel.collection.updateOne({ id: this.id }, { $set: { context } });
        return context;
    }

    public async save(): Promise<any> {
        return this.doc.save();
    }

    public static async findByProviderId(id: string): Promise<DatabaseUser | null> {
        const userModel = await UserModel.findOne({ id });
        if (userModel !== null) {
            return new DatabaseUser(userModel);
        }

        return null;
    }
}

export function userLoader(): (id: string, ...args: []) => Promise<DatabaseUser> {
    return async (id: string) => {
        try {
            const userData = await DatabaseUser.findByProviderId(id);
            if (!userData) {
                const newUser = new DatabaseUser({
                    id,
                    data: {}
                });
                newUser.save();

                return newUser;
            }

            return new DatabaseUser(userData);
        } catch (err) {
            throw err;
        }
    };
}
