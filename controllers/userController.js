import { getUser, updateUser } from '../services/userService.js';

const userData = [
    "username",
    "email",
    "address",
    "image_path"
]

export async function getUserController(req, res){
    try {
        const user_id = req.params.user_id;

        const user = await getUser(user_id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(
            {message: error.message}
        );
    }
}

export async function updateUserController(req, res){
    try {
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({
                message: "User ID is required",
            })
        }

        const user_data = {};

        for (const field of userData) {
            if (req.body[field] !== undefined) {
                user_data[field] = req.body[field];
            }
        }

        if (Object.keys(user_data).length === 0) {
            return res.status(400).json({
                message: "No data to update.",
            });
        }

        const updatedUser = await updateUser(user_id, user_data);

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        return res.status(200).json(updatedUser);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}

