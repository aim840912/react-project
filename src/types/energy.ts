export interface EnergyItem {
    name: string;
    data: number[];
}

export type EnergyChartSeries = EnergyItem & {
    type: 'line' | 'bar';
    stack: string;
};

export interface EnergyApiResponse {
    code: number;
    message: string;
    data: EnergyItem[];
}

export interface EnterpriseEnergyData {
    name: string;
    building: string;
    elec: number;
    hot: number;
    c: number;
}
