import { get } from "../shared/http/http";
export interface EnergyItem {
    name: string;
    data: number[];
}
export interface EnergyApiResponse {
    code: number;
    message: string;
    data: EnergyItem[];
}

export const loadEnergyData = async () => {
    const data = await get<EnergyApiResponse>('/api/energyData');
    return data;
};