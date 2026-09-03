import supabase from "../database/supabase.js";

export async function getAllHistory(user_id) {
    const { data, error } = await supabase
        .from("user_history")
        .select(`
            *,
            stores(*)
            `)
        .eq("user_id", user_id);
    
         if (error) throw error;

    return data;
}

export async function insertHistory(history_data) {
    const { data, error } = await supabase
        .from("user_history")
        .insert(history_data)
        .select()
        .single();

        if (error) throw error;

    return data;
}

export async function deleteHistory(history_id) {
    const { data, error } = await supabase
        .from("user_history")
        .delete()
        .eq("id", history_id)
        .select()
        .maybeSingle();

        if (error) throw error;

    return data;
}