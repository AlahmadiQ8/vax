export interface Metadata {
    notes: string;
    url: string;
}

export interface Portal {
    name: string;
    short_name: string;
    key: string;
    url: string;
    show_name_in_card: boolean;
    type: string;
    metadata: Metadata;
}

export interface Appointments {
    count: number;
    summary: string;
}

export interface Location {
    id: string;
    name: string;
    active: boolean;
    available: boolean;
    updated_at: Date;
    last_available_at?: Date;
    portal: string;
    area: string;
    appointments: Appointments;
    formatted_address: string;
}

export interface TurboVaxRootObject {
    last_updated_at: Date;
    portals: Portal[];
    locations: Location[];
}

export interface CvsRoot {
    responseMetaData: ResponseMetaData
}

export interface ResponseMetaData {
    statusCode: string
    statusDesc: string
    conversationID: string
    refId: string
}

export interface WalgreensObject {
    appointmentsAvailable: boolean;
    availabilityGroups: any[];
    stateName: string;
    stateCode: string;
    zipCode: string;
    radius: number;
    days: number;
}