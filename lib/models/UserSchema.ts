import { Schema, Document, model } from 'mongoose';

type UserModel = Document & {
    first_name: string;
    last_name: string;
    gender: string;
    _context: any;
    active: boolean;

    handovered: boolean;
    cellLogin: boolean;
    provider: string;
};

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    gender: String,
    _context: Schema.Types.Mixed,

    active: Boolean,
    handovered: Boolean,
    cellLogin: Boolean,
    provider: String
}, { timestamps: { createdAt: 'registeredOn', updatedAt: 'lastUpdate' } });

export const UserSchema = model<UserModel>("User", userSchema);