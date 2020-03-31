export interface SendAPIBody {
    recipient: {
        id: string;
    };
    message?: any;
    notification_type?: string;
    messaging_type?: string;
    sender_action?: string;
}

export enum UserDataFields {
    firstName = 'first_name',
    lastName = 'last_name',
    profilePic = 'profile_pic',
    locale = 'locale',
    timezone = 'timezone',
    gender = 'gender'
}