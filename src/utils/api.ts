import type z from "zod";

const URL_API_BASE = "http://localhost:3000/api";

export async function apiRequest<B /* type body */, R /* type réponse */>(
    methode: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    body?: B,
    bodySchema?: z.ZodType<B>
): Promise<{ status: number; data: R | null; error: string | null }> {

    // Vérifier les données du body si un schéma est fourni
    if (bodySchema && body) {
        const parseResult = bodySchema.safeParse(body);
        if (!parseResult.success) {
            console.error('Erreur de validation du corps de la requête:', parseResult.error);
            return {
                status: 400,
                data: null,
                error: 'Données du corps de la requête invalides'
            };
        }
        body = parseResult.data;
    }

    const url = new URL(URL_API_BASE + endpoint);

    // Si requête GET, ajouter les paramètres du body à l'URL
    if (methode === 'GET' && body) {
        Object.entries(body).forEach(([key, value]) => {
            url.searchParams.append(key, String(value));
        });
    }

    const response = await fetch(url.toString(), {
        method: methode,
        headers: {
            'Content-Type': 'application/json'
        },
        body: methode !== 'GET' && body ? JSON.stringify(body) : undefined
    }).catch((error) => {
        console.error('Erreur lors de la requête API:', error);
        return null;
    });

    if (!response) {
        return {
            status: 500,
            data: null,
            error: 'Erreur réseau lors de la requête API'
        };
    }

    const status = response.status;
    let data: R | null = null;
    let error: string | null = null;

    if (status >= 200 && status < 300) {
        // Les réponses sont renvoyées au format JSON
        data = await response.json();
    } else {
        // Les erreurs sont renvoyées au format texte
        error = await response.text();
    }

    // TODO: gérer 401 Unauthorized directement ici (rediriger vers login)

    return { status, data, error };
}