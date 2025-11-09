import { z } from "zod";
import { apiRequest } from "../utils/api";
import type { APIBoolResponse } from "./common";

// --- Schémas ---
export const UtilisateurSchema = z.object({
    id: z.number().int().positive(),
    email: z.email(),
    nom: z.string(),
    prenom: z.string(),
    idRole: z.number().int().positive()
});

export const ListUtilisateursSchema = z.object({
    utilisateurs: z.array(UtilisateurSchema)
});

export const LoginUtilisateurSchema = UtilisateurSchema.pick({ email: true }).extend({ motDePasse: z.string() });

export const UpdateUtilisateurSchema = UtilisateurSchema.omit({ id: true, idRole: true }).partial();

// --- Types ---
export type APIUtilisateur = z.infer<typeof UtilisateurSchema>;
export type APIListUtilisateur = z.infer<typeof ListUtilisateursSchema>;
export type APILoginBody = z.infer<typeof LoginUtilisateurSchema>;
export type APIUpdateUtilisateur = z.infer<typeof UpdateUtilisateurSchema>;

// --- Endpoints API ---
export const getUtilisateurs = () => {
    return apiRequest<null, APIListUtilisateur>('GET', '/utilisateurs');
}

export const loginUtilisateur = (loginData: APILoginBody) => {
    return apiRequest<APILoginBody, APIBoolResponse>('POST', '/utilisateurs/login', loginData, LoginUtilisateurSchema);
}

export const updateUtilisateur = (id: number, updateData: APIUpdateUtilisateur) => {
    return apiRequest<APIUpdateUtilisateur, APIBoolResponse>('PATCH', `/utilisateurs/${id}`, updateData, UpdateUtilisateurSchema);
}

export const deleteUtilisateur = (id: number) => {
    return apiRequest<null, APIBoolResponse>('DELETE', `/utilisateurs/${id}`);
}