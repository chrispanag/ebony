export interface WitNLP {
    text: string;
    intents: WitIntentNLP[];
    entities: any;
}

export interface WitEntityNLP {
    value: string;
    confidence: number;
}

export interface WitIntentNLP {
    id: string;
    name: string;
    confidence: number;
}
