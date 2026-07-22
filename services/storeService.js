import supabase from '../database/supabase.js';

export async function getStore(store_id) {
    const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("id", store_id)
        .single();

    if (error) throw error;

    return data;
}

export async function updateStore(store_id, store_data){
    const { data, error } = await supabase
        .from("stores")
        .update(stores_data)
        .eq("id", store_id)
        .select()
        .maybeSingle();

    if (error) throw error;

    return data;
}

export async function getStoreFromGenre(genre_id) {
    let query = supabase
        .from("stores")
        .select("*");

    if (genre_id) {
        query = query.eq("genre_id", genre_id);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
}