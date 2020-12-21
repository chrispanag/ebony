import { DatabaseUser, User } from '@ebenos/framework';
import { senderFactory } from './sender';
import { UserDataFields } from './interfaces/messengerAPI';

export default class MessengerUser extends DatabaseUser {
    private getUserData: (id: string, fields: UserDataFields[]) => Promise<any>;

    constructor(databaseUser: DatabaseUser, pageToken: string) {
        super(databaseUser.doc);

        const { getUserData } = senderFactory(pageToken);
        this.getUserData = getUserData;
    }

    public async handover(): Promise<any> {
        this.handovered = true;
        // TODO: Implement
        return this.save();
    }

    public async dehandover(): Promise<any> {
        this.handovered = false;
        // TODO: Implement
        return this.save();
    }

    public async getFacebookData(): Promise<void> {
        console.log('New user');
        try {
            const userData = await this.getUserData(this.id, [
                UserDataFields.firstName,
                UserDataFields.lastName
            ]);
            const { first_name = '', last_name = '', gender = 'male' } = userData;

            this.firstName = first_name;
            this.lastName = last_name;
            this.gender = gender;
        } catch (err) {
            this.firstName = '';
            this.lastName = '';
            this.gender = '';
        }
    }
}

export function userLoader(pageToken: string): (id: string) => Promise<MessengerUser> {
    return async (id: string) => {
        try {
            const userData = await DatabaseUser.findByProviderId(id);
            if (!userData) {
                const newUser = new MessengerUser(
                    new DatabaseUser({
                        id,
                        data: {}
                    }),
                    pageToken
                );
                await newUser.getFacebookData();
                await newUser.save();

                return newUser;
            }

            return new MessengerUser(userData, pageToken);
        } catch (err) {
            throw err;
        }
    };
}
