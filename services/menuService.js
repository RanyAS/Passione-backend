import supabase from '../database/supabase.js';

//各店舗のメニューを取得する
export async function getAllMenu(store_id) {
    const { data, error } = await supabase
        .from("store_menu")
        .select("*")
        .eq("store_id", store_id);

        if (error) throw error;

    return data;
}

//一つのメニューを取得する
export async function getMenu(menu_id){
    const { data, error } = await supabase
        .from("store_menu")
        .select("*")
        .eq("id", menu_id)
        .maybeSingle();

        if (error) throw error;


    return data;
}

export async function insertMenu(menu_data){
    const { data, error } = await supabase
        .from("store_menu")
        .insert(menu_data)
        .select()
        .single();

        if (error) throw error;

    return data;
}

export async function updateMenu(menu_id, menu_data){
    const { data, error } = await supabase
        .from("store_menu")
        .update(menu_data)
        .eq("id", menu_id)
        .select()
        .maybeSingle();

        if (error) throw error;
    
    return data;
}

export async function deleteMenu(menu_id) {
    const { data, error } = await supabase
        .from("store_menu")
        .delete()
        .eq("id", menu_id)
        .select()
        .maybeSingle();

        if (error) throw error;

    return true;
}