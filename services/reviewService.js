import supabase from "../database/supabase.js";

export async function getReview(store_id) {
    const { data, error } = await supabase
        .from("store_review")
        .select(`
            *,
            users (
                username
            )
        `)
        .eq("store_id", store_id);

    if (error) throw error;

    return data;
}

export async function getReviewsByUser(user_id) {
    const { data, error } = await supabase
        .from("store_review")
        .select("*")
        .eq("user_id", user_id);

    if (error) throw error;

    return data;
}

export async function insertReview(review_data) {
    const { data: reservation, error: reservationError } = await supabase
        .from("reservation")
        .select("id, user_id, status")
        .eq("id", review_data.reservation_id)
        .single();

    if (reservationError) throw reservationError;

    if (reservation.status !== "completed") {
        throw new Error("レビューできるのは完了した予約のみです。");
    }

    if (reservation.user_id !== review_data.user_id) {
        throw new Error("この予約のレビュー権限がありません。");
    }

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