import { ISerializable } from "./elements";
import { IBaseMessageOptions } from "../adapter";

export interface IBaseInteraction {
    type: 'message' | 'typing_on' | 'typing_off' | 'mark_seen';
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

export type IInteraction<T> = IMessageInteraction<T> | ISenderActionInteraction;

export function isMessageInteraction<T>(interaction: IInteraction<T>): interaction is IMessageInteraction<T> {
    return interaction.type === 'message';
}

export function isSenderActionInteraction<T>(interaction: IInteraction<T>): interaction is ISenderActionInteraction {
    return interaction.type === 'typing_on' || interaction.type === 'typing_off' || interaction.type === 'mark_seen';
}