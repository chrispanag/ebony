import User from "./User";

const dataPerUser = [
    'first_name',
    'last_name',
    'gender'
];

export default class MessengerUser extends User {
    private fb: any;

    constructor(document: any, fb: any) {
        super(document);

        if (!this.provider) {
            this.provider = 'fbmessenger';
        }
        
        this.fb = fb;
    }

    async handover() {
        this.handovered = true;
        await this.fb.handover(this.id);
        return this.save();
    }

    async dehandover() {
        this.handovered = false;
        await this.fb.dehandover(this.id);
        return this.save();
    }

    async getFacebookData() {
        const userData = await this.fb.getFBData(dataPerUser);
        const { first_name = '', last_name = '', gender = "male" } = userData;

        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;

        return this.save();
    }

}