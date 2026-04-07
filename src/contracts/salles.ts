import { z } from "zod";
import { apiRequest } from "../utils/api";
import type { APIBoolResponse } from "./common";

// --- Schémas ---
export const SalleSchema = z.object({
    codeSalle: z.string(),
    libelleSalle: z.string(),
    codeBatiment: z.string(),
    libelleBatiment: z.string()
});

export const ListSallesSchema = z.object({
    salles: z.array(SalleSchema)
});

// --- Types ---
export type APISalle = z.infer<typeof SalleSchema>;
export type APIListSalles = z.infer<typeof ListSallesSchema>;

// --- Endpoints API ---
export const getSalle = (code: string) => {
    return apiRequest<null, APISalle>('GET', `/salles/${code}`);
}

export const deleteSalle = (code: string) => {
    return apiRequest<null, APIBoolResponse>('DELETE', `/salles/${code}`);
}

export const createSalle = (newSalle: APISalle) => {
    return apiRequest<APISalle, APIBoolResponse>('POST', `/salles/`, newSalle, SalleSchema);
}