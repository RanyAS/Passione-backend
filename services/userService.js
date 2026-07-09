import supabase from '../database/supabase.js';

export async function getUser(user_id) {
    const { data,  error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user_id)
        .single();

    if (error) throw error;

    return data;
}

export async function updateUser(user_id, user_data){
    const { data, error } = await supabase
        .from("users")
        .update(user_data)
        .eq("id", user_id)
        .select()
        .maybeSingle();

    if (error) throw error;

    return data;
}

