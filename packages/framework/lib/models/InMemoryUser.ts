import User from './User';
import { IUser } from './UserSchema';

const userStore: { [key: string]: InMemoryUser } = {};

export default class InMemoryUser extends User<IUser> {
    constructor(data: IUser) {
        super(data);
    }
}

export function userLoader() {
    return (id: string): Promise<InMemoryUser> => {
        if (id in userStore) {
            return Promise.resolve(userStore[id]);
        }

        const user = new User({ id, data: {} });
        userStore[id] = user;

        return Promise.resolve(user);
    };
}
