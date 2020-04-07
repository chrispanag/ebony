import { ISerializable } from "./elements";
import { IBaseMessageOptions } from "../adapter";

export interface IBaseInteraction {
    type: 'message' | 'typing_on' | 'typing_off' | 'mark_seen' | 'notify';
    options: IBaseMessageOptions;
}

export interface IMessageInteraction<T extends {}> extends IBaseInteraction {
    type: 'message';
    id: string;
    message: ISerializable;
    options: IBaseMessageOptions & T;
}

export interface ISenderActionInteraction extends IBaseInteraction {
    type: 'typing_on' | 'typing_off' | 'mark_seen';
    id: string;
}

export interface INotifyInteraction extends IBaseInteraction {
    type: 'notify';
    notifyData: string;
}

export type IInteraction<T> = IMessageInteraction<T> | ISenderActionInteraction | INotifyInteraction;

export function isMessageInteraction<T>(interaction: IInteraction<T>): interaction is IMessageInteraction<T> {
    return interaction.type === 'message';
}

export function isSenderActionInteraction<T>(interaction: IInteraction<T>): interaction is ISenderActionInteraction {
    return interaction.type === 'typing_on' || interaction.type === 'typing_off' || interaction.type === 'mark_seen';
}

export function isNotifyInteraction<T>(interaction: IInteraction<T>): interaction is INotifyInteraction {
    return interaction.type === 'notify';
}