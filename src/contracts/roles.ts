import { z } from "zod";
import { apiRequest } from "../utils/api";
import type { APIBoolResponse } from "./common";

// --- Schémas ---
export const RoleSchema = z.object({
    idRole: z.number().int().positive(),
    nom: z.string(),
    permissions: z.number().int().positive()
});

export const ListRolesSchema = z.object({
    roles: z.array(RoleSchema)
});

// --- Types ---
export type APIRole = z.infer<typeof RoleSchema>;
export type APIListRoles = z.infer<typeof ListRolesSchema>;

// --- Endpoints API ---
export const getRole = (idRole: number) => {
    return apiRequest<null, APIRole>('GET', `/roles/${idRole}`);
}

export const getRoles = () => {
    return apiRequest<null, APIListRoles>('GET', `/roles/`);
}

export const deleteRole = (idRole: number) => {
    return apiRequest<null, APIBoolResponse>('DELETE', `/roles/${idRole}`);
}

export const createRole = (newRole: APIRole) => {
    return apiRequest<APIRole, APIBoolResponse>('POST', `/roles/`, newRole, RoleSchema);
}