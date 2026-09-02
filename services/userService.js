import supabase, { supabaseAdmin } from '../database/supabase.js';

export async function getUser(user_id) {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user_id)
        .single();

    if (error) throw error;

    return data;
}

export async function updateUser(user_id, user_data) {
    const { data, error } = await supabase
        .from("users")
        .update(user_data)
        .eq("id", user_id)
        .select()
        .maybeSingle();

    if (error) throw error;

    return data;
}

export async function uploadUserImage(user_id, file) {
    const fileExt =
        file.originalname.split(".").pop()?.toLowerCase() || "jpg";

    const filePath = `${user_id}/profile.${fileExt}`;

    const { error: uploadError } = await supabaseAdmin.storage
        .from("user-images")
        .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: true,
        });

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabaseAdmin.storage
        .from("user-images")
        .getPublicUrl(filePath);

    const imageUrl = data.publicUrl;

    const { data: user, error: updateError } = await supabaseAdmin
        .from("users")
        .update({
            image_path: imageUrl,
        })
        .eq("id", user_id)
        .select()
        .single();

    if (updateError) {
        throw updateError;
    }

    return user;
}