import { getAllMenu, getMenu, insertMenu, updateMenu, deleteMenu } from "../services/menuService.js";

export async function getAllMenuController(req, res){
    try {
        const store_id = req.params.store_id;

        const menus = await getAllMenu(store_id);

        if (menus.length === 0){
            return res.status(404).json({
                message: "Menus not found",
            });
        }

        return res.status(200).json(menus);
    } catch (error) {
        return res.status(500).json(
            {message: error.message}
        ); 
    }
}

export async function getMenuController(req, res){
    try {
        const menu_id = req.params.menu_id;

        const menu = await getMenu(menu_id);

        if (!menu){
            return res.status(404).json({
                message: "Menu not found",
            });
        }

        return res.status(200).json(menu);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export async function insertMenuController(req, res){
    try {
        const data = req.body;

        const menu_data = await insertMenu(data);

        if (!menu_data){
            return res.status(404).json({
                message: "Failed to insert menu",
            });
        }

        return res.status(201).json(menu_data);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

export async function updateMenuController(req, res) {
    try {
        const menu_id = req.params.menu_id;
        const menu_data = req.body;

        const updated_menu = await updateMenu(menu_id, menu_data);

        if (!updated_menu) {
            return res.status(404).json({
                message: "Failed to update menu",
            });
        }

        return res.status(200).json(updated_menu);
    } catch (error) {
         return res.status(500).json({
            message: error.message,
        });
    }
}

export async function deleteMenuController(req, res) {
    try {
        const menu_id = req.params.menu_id;

        const isDeleted = await deleteMenu(menu_id);

        if (!isDeleted) {
            return res.status(404).json({
                message: "Failed to delete menu",
            }); 
        }

        return res.status(200).json(isDeleted);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}