import supabase from "../database/supabase.js";

export async function getReview(store_id) {
    const { data, error } = await supabase
        .from("store_review")
        .select("*")
        .eq("store_id", store_id);

        if (error) throw error;

    return data;
}

export async function insertReview(review_data) {
    const { data, error } = await supabase
        .from("store_review")
        .insert(review_data)
        .select()
        .single();

        if (error) throw error;

    return data;
}

export async function deleteReview(review_id) {
    const { data, error } = await supabase
        .from("store_review")
        .delete()
        .eq("id", review_id)
        .select()
        .maybeSingle();

        if (error) throw error;

    return data;
}