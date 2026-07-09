import supabase from '../database/supabase.js';

export async function getGenres() {
    const { data, error } = await supabase
        .from("genre")
        .select("*");

    if(error){
        throw error;
    }

    return data;
}