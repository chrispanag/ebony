export interface IPostbackTrackingData {
    isPostback: true;
    type: string;
    data?: Record<string, any>;
}

export function isPostbackTrackingData(
    tracking_data: unknown
): tracking_data is IPostbackTrackingData {
    return (
        typeof tracking_data === 'object' &&
        tracking_data !== null &&
        'isPostback' in tracking_data &&
        'type' in tracking_data
    );
}
