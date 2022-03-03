import { ITrackingData } from './trackingData';
export interface IPayload extends Record<string, any> {
    text: string;
    tracking_data?: ITrackingData;
    location?: { lon: number; lat: number };
    contact?: {
        name?: string;
        phone_number: string;
        avatar?: string;
    };
    type?: string;
}
