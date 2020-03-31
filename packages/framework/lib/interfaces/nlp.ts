export interface WitNLP {
    entities: {
        intent?: WitEntityNLP[];
        sentiment?: WitEntityNLP[];
    };
}

export interface WitEntityNLP {
    value: string;
    confidence: number;
}
