import axios from 'axios';
import { Movie } from '../types/Movie';

const API_URL = 'http://localhost:5096/api/movie';

export const movieService = {
    getMovies: async (): Promise<Movie[]> => {
        const response = await axios.get<Movie[]>(API_URL);
        console.log({ response })
        return response.data;
    },

    getMovieById: async (id: string): Promise<Movie> => {
        const response = await axios.get<Movie>(`${API_URL}/${id}`);
        return response.data;
    },

    createMovie: async (movie: Movie): Promise<Movie> => {
        const response = await axios.post<Movie>(API_URL, movie);
        return response.data;
    },

    updateMovie: async (id: string, movie: Movie): Promise<Movie> => {
        const response = await axios.put<Movie>(`${API_URL}/${id}`, movie);
        return response.data;
    },

    deleteMovie: async (id: string): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    }
};