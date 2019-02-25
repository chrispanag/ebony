import { Schema, model, Document } from 'mongoose';

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    context: any;
    active: boolean;
    handovered: boolean;
    cellLogin: boolean;
    provider: string;
}

const userSchema = new Schema({
    id: String,
    firstName: String,
    lastName: String,
    gender: String,
    context: Schema.Types.Mixed,

    active: Boolean,
    handovered: Boolean,
    cellLogin: Boolean,
    provider: String
}, { timestamps: { createdAt: 'registeredOn', updatedAt: 'lastUpdate' } });

export const UserModel = model<IUser & Document>("User", userSchema);