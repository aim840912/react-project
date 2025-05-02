import { get } from "../utils/http/http";

export function getEnergyData() {
    return get("/energyData")
}