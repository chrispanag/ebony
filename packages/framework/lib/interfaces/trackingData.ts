export type TrackingDataPrimitives = null | string | number | boolean;
export type ITrackingData =
    | TrackingDataPrimitives
    | Array<ITrackingData>
    | { [key: string]: ITrackingData };
