import { z } from "zod";
import { apiRequest } from "../utils/api";
import type { APIBoolResponse } from "./common";

export type SessionsStatut = 0 | 1 | 2 | 3;

export const SessionsStatusNom: Record<SessionsStatut, string> = {
    0: "Active",
    1: "Terminée",
    2: "Archivée",
    3: "En suppression"
};

// --- Schémas ---
export const SessionSchema = z.object({
    id: z.number().int().positive(),
    nom: z.string(),
    annee: z.number().int().min(2025),
    statut: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)])
});

export const NewSessionSchema = SessionSchema.omit({ id: true, statut: true });

export const UpdateSessionSchema = NewSessionSchema.partial();

export const ListSessionsSchema = z.object({
    anneeMax: z.number().int(),
    anneeMin: z.number().int(),
    sessions: z.array(SessionSchema)
});

// --- Types ---
export type APISession = z.infer<typeof SessionSchema>;
export type APINewSession = z.infer<typeof NewSessionSchema>;
export type APIUpdateSession = z.infer<typeof UpdateSessionSchema>;
export type APIListSessions = z.infer<typeof ListSessionsSchema>;

// --- Endpoints API ---
export const getSessions = () => {
    return apiRequest<null, APIListSessions>('GET', '/sessions/');
}

export const createSession = (newSession: APINewSession) => {
    return apiRequest<APINewSession, APISession>('POST', '/sessions/', newSession, NewSessionSchema);
}

export const updateSession = (id: number, updateData: APIUpdateSession) => {
    return apiRequest<APIUpdateSession, APISession>('PATCH', `/sessions/${id}`, updateData, UpdateSessionSchema);
}

export const deleteSession = (id: number) => {
    return apiRequest<null, APIBoolResponse>('DELETE', `/sessions/${id}`);
}