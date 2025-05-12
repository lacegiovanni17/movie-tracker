import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieService } from '../services/movieService';
import { Movie } from '../types/Movie';

interface MovieFormProps {
    isEditing: boolean;
}

const MovieForm: React.FC<MovieFormProps> = ({ isEditing }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<Movie>({
        title: '',
        notes: '',
        watched: false,
        rating: 0
    });
    const [loading, setLoading] = useState<boolean>(isEditing);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isEditing && id) {
            const fetchMovie = async () => {
                try {
                    const data = await movieService.getMovieById(id);
                    setMovie(data);
                    setLoading(false);
                } catch (err) {
                    setError('Failed to fetch movie details');
                    setLoading(false);
                }
            };

            fetchMovie();
        }
    }, [id, isEditing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setMovie(prevMovie => ({
                ...prevMovie,
                [name]: target.checked
            }));
        } else {
            setMovie(prevMovie => ({
                ...prevMovie,
                [name]: value
            }));
        }
    };

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setMovie(prevMovie => ({
            ...prevMovie,
            rating: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && id) {
                await movieService.updateMovie(id, movie);
                navigate(`/details/${id}`);
            } else {
                await movieService.createMovie(movie);
                navigate('/');
            }
        } catch (err) {
            setError(`Failed to ${isEditing ? 'update' : 'create'} movie`);
        }
    };
    if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="mb-0">{isEditing ? 'Edit Movie' : 'Add New Movie'}</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={movie.title || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="notes" className="form-label">Notes</label>
                                    <textarea
                                        className="form-control"
                                        id="notes"
                                        name="notes"
                                        rows={3}
                                        value={movie.notes || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="watched"
                                        name="watched"
                                        checked={movie.watched}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="watched">Watched</label>
                                </div>
                                
                                {movie.watched && (
                                    <div className="mb-3">
                                        <label htmlFor="rating" className="form-label">Rating (0-10): {movie.rating}</label>
                                        <input
                                            type="range"
                                            className="form-range"
                                            id="rating"
                                            name="rating"
                                            min="0"
                                            max="10"
                                            step="1"
                                            value={movie.rating}
                                            onChange={handleRatingChange}
                                        />
                                        <div className="d-flex justify-content-between">
                                            <small>0</small>
                                            <small>5</small>
                                            <small>10</small>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="d-flex justify-content-between mt-4">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary" 
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        {isEditing ? 'Update' : 'Add'} Movie
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieForm;