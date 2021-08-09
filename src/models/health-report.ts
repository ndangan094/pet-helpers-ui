import { Pet } from "./pet";
import { Veter } from "./veterinary";

export interface HealthReport {
    created_at?:string,
    description?:string,
    health_condition?:string,
    id?:number
    pet?:Pet;
    veterinary_clinic?:Veter,
    weight?:number
}