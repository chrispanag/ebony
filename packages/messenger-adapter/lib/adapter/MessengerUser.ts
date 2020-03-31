import { User } from "@ebony/framework";
import { senderFactory } from "./sender";
import { UserDataFields } from "./interfaces/messengerAPI";

export default class MessengerUser extends User {
  private getUserData: (id: string, fields: UserDataFields[]) => Promise<any>;

  constructor(document: any, pageToken: string) {
    super(document);

    const { getUserData } = senderFactory(pageToken);
    this.getUserData = getUserData;
  }

  public async handover() {
    this.handovered = true;
    // TODO: Implement
    return this.save();
  }

  public async dehandover() {
    this.handovered = false;
    // TODO: Implement
    return this.save();
  }

  public async getFacebookData() {
    console.log("New user");
    try {
      const userData = await this.getUserData(this.id, [
        UserDataFields.firstName,
        UserDataFields.lastName
      ]);
      const { first_name = "", last_name = "", gender = "male" } = userData;

      this.firstName = first_name;
      this.lastName = last_name;
      this.gender = gender;
    } catch (err) {
      this.firstName = "";
      this.lastName = "";
      this.gender = "";
    }
  }
}
