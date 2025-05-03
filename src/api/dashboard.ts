import { get } from "../utils/http/http";
import type { EnergyApiResponse } from '../types';

// export function getEnergyData() {
//     return get("/api/energyData")
// }

export const loadEnergyData = async () => {
    const data = await get<EnergyApiResponse>('/api/energyData');
    return data;
};