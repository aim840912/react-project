import { get } from ".";

export interface EnergyApiResponse {
    code: number;
    message: string;
    data: EnergyItem[];
}

export interface EnergyItem {
    name: string;
    data: number[];
}

export const loadEnergyData = async (): Promise<EnergyItem[]> => {
    const response = await get<EnergyApiResponse>('/api/energyData');
    return response?.data || [];
};