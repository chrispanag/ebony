import { Schema, model, Document } from 'mongoose';

export interface IUser {
    id: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    context?: any;
    active?: boolean;
    handovered?: boolean;
    cellLogin?: boolean;
    data: any;
}

const userSchema = new Schema(
    {
        id: String,
        firstName: String,
        lastName: String,
        gender: String,
        context: Schema.Types.Mixed,

        active: Boolean,
        handovered: Boolean,
        cellLogin: Boolean,
        data: Schema.Types.Mixed
    },
    { timestamps: { createdAt: 'registeredOn', updatedAt: 'lastUpdate' } }
);

export const UserModel = model<IUser & Document>('User', userSchema);
