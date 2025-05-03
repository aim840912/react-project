export interface EstateDataType {
    key: string;
    name: string;
    person: string;
    tel: string;
    status: string;
    vacancyRate: number;
    propertyFee: string;
}

export interface RoomType {
    roomNumber: number;
    decorationType: "毛坯" | "精裝";
    area: number;
    unitPrice: number;
    src: string
}

export interface EstateRecordDataType {
    key: string;
    orderNo: string;
    date: string;
    carNo: string;
    type: string;
    startDate: string;
    time: string;
    count: string;
    cost: string;
}

export interface InParkCatDataType {
    key: string;
    carNo: string;
    name: string;
    tel: string;
    type: string;
    rest: string;
    time: string;
    pic: string;
}