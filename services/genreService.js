import supabase from '../database/supabase.js';

export async function getGenres() {
    const { data, error } = await supabase
        .from("genre")
        .select("*");

    console.log("Error:", error);
    console.log("Data:", data);

    if(error){
        throw error;
    }

    return data;
}