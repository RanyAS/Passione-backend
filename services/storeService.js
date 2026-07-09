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