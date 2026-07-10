import supabase from "../database/supabase.js";

export async function getAllFavStore(user_id) {
    const { data, error } = await supabase
        .from("user_fav")
        .select(`
            *,
            store(*)`)
        .eq("user_id", user_id);

        if (error) throw error;
    
    return data;
}

export async function addFavStore(fav_data) {
    const { data: existing, error: checkError } = await supabase
        .from("user_fav")
        .select("id")
        .eq("user_id", fav_data.user_id)
        .eq("store_id", fav_data.store_id)
        .maybeSingle();

    if (checkError) throw checkError;

    if (existing) {
        throw new Error("お気に入りに登録済みです。");
    }

    const { data, error } = await supabase
        .from("user_fav")
        .insert(fav_data)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function deleteFavStore(user_id, store_id) {
    const { data, error } = await supabase
        .from("user_fav")
        .delete()
        .eq("user_id", user_id)
        .eq("store_id", store_id)
        .select()
        .maybeSingle();

        if (error) throw error;

    return data;
}