type TrackingDataObj = Record<
    string,
    | number
    | string
    | boolean
    | Array<TrackingDataObj | string | number | boolean>
    | TrackingDataCopy
>;
// this is realy a work around cause of the ts version
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TrackingDataCopy extends TrackingDataObj {}

export type ITrackingData = TrackingDataObj | string;
