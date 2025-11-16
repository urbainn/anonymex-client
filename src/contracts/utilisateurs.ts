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

export const GetAuthInfoSchema = z.object({ premiereConnexion: z.boolean() });

export const PostInvitationSchema = z.object({ email: z.string(), jetonInvitation: z.string() });

export const CreerUtilisateurSchema = z.object({
    jetonInvitation: z.string(),
    email: z.string(),
    nom: z.string(),
    prenom: z.string(),
    motDePasse: z.string()
});

// --- Types ---
export type APIUtilisateur = z.infer<typeof UtilisateurSchema>;
export type APIListUtilisateur = z.infer<typeof ListUtilisateursSchema>;
export type APILoginBody = z.infer<typeof LoginUtilisateurSchema>;
export type APIUpdateUtilisateur = z.infer<typeof UpdateUtilisateurSchema>;
export type APIGetAuthInfo = z.infer<typeof GetAuthInfoSchema>;
export type APICreateUtilisateur = z.infer<typeof CreerUtilisateurSchema>;
export type APIInvitationInfo = z.infer<typeof PostInvitationSchema>;

// --- Endpoints API ---
export const getUtilisateurs = () => {
    return apiRequest<null, APIListUtilisateur>('GET', '/utilisateurs');
}

export const loginUtilisateur = (loginData: APILoginBody) => {
    return apiRequest<APILoginBody, APIBoolResponse>('POST', '/utilisateurs/auth/login', loginData, LoginUtilisateurSchema);
}

export const updateUtilisateur = (id: number, updateData: APIUpdateUtilisateur) => {
    return apiRequest<APIUpdateUtilisateur, APIBoolResponse>('PATCH', `/utilisateurs/${id}`, updateData, UpdateUtilisateurSchema);
}

export const deleteUtilisateur = (id: number) => {
    return apiRequest<null, APIBoolResponse>('DELETE', `/utilisateurs/${id}`);
}

export const getAuthInfo = () => {
    return apiRequest<null, APIGetAuthInfo>('GET', '/utilisateurs/auth/info');
}

export const getInvitationInfo = (jetonInvitation: string, email: string) => {
    return apiRequest<APIInvitationInfo, APIBoolResponse>('POST', '/utilisateurs/invitations/info', { jetonInvitation, email }, PostInvitationSchema);
}

export const creerUtilisateur = (createData: APICreateUtilisateur) => {
    return apiRequest<APICreateUtilisateur, APIBoolResponse>('POST', '/utilisateurs', createData, CreerUtilisateurSchema);
}