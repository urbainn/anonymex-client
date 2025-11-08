import { z } from "zod";
import { apiRequest } from "../utils/api";

export type SessionsStatut = 1 | 2 | 3 | 4;

export const SessionsStatusNom: Record<SessionsStatut, string> = {
    1: "Active",
    2: "Terminée",
    3: "Archivée",
    4: "En suppression"
};

// --- Schémas ---
export const SessionSchema = z.object({
    id: z.number().int().positive(),
    nom: z.string(),
    annee: z.number().int().min(2025),
    statut: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)])
});

export const NewSessionSchema = SessionSchema.omit({ id: true, statut: true });

export const UpdateSessionSchema = NewSessionSchema.partial();

export const ListSessionsSchema = z.object({
    anneeMax: z.number().int(),
    anneeMin: z.number().int(),
    sessions: z.array(SessionSchema)
});

export const DeleteSessionSchema = z.object({
    id: z.number().int().positive()
});

// --- Types ---
export type APISession = z.infer<typeof SessionSchema>;
export type APINewSession = z.infer<typeof NewSessionSchema>;
export type APIUpdateSession = z.infer<typeof UpdateSessionSchema>;
export type APIListSessions = z.infer<typeof ListSessionsSchema>;
export type APIDeleteSession = z.infer<typeof DeleteSessionSchema>;

// --- Endpoints API ---
export const getSessions = () => {
    return apiRequest<null, APIListSessions>('GET', '/sessions');
}

export const createSession = (newSession: APINewSession) => {
    return apiRequest<APINewSession, APISession>('POST', '/sessions', newSession, NewSessionSchema);
}

export const updateSession = (id: number, updateData: APIUpdateSession) => {
    return apiRequest<APIUpdateSession, APISession>('PUT', `/sessions/${id}`, updateData, UpdateSessionSchema);
}

export const deleteSession = (id: number) => {
    return apiRequest<null, { message: string }>('DELETE', `/sessions/${id}`);
}