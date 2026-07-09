import { getGenres } from "../services/genreService.js";

export async function getGenresController(req, res) {
    try {
        const genres = await getGenres();

        return res.status(200).json(genres);

    } catch (error) {
        res.status(500).json(
            {message: error.message}
        );
    }
}