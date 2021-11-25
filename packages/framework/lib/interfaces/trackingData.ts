export type TrackingDataPrimitives = null | string | number | boolean;
export type ITrackingData =
    | TrackingDataPrimitives
    | Array<TrackingDataPrimitives | ITrackingData>
    | { [key: string]: ITrackingData };
