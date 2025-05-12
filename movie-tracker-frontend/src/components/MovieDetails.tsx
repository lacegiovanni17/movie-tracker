import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { movieService } from '../services/movieService';
import { Movie } from '../types/Movie';

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            if (!id) return;

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
    }, [id]);

    const handleDelete = async () => {
        if (!movie?.id) return;

        if (window.confirm('Are you sure you want to delete this movie?')) {
            try {
                await movieService.deleteMovie(movie.id);
                navigate('/');
            } catch (err) {
                setError('Failed to delete movie');
            }
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="container mt-4">
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
            <div className="text-center mt-3">
                <button onClick={() => navigate(-1)} className="btn btn-primary">
                    Go Back
                </button>
            </div>
        </div>
    );

    if (!movie) return (
        <div className="container mt-4">
            <div className="alert alert-warning" role="alert">
                Movie not found
            </div>
            <div className="text-center mt-3">
                <Link to="/" className="btn btn-primary">
                    Back to Movies
                </Link>
            </div>
        </div>
    );

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-header bg-transparent">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                        <h2 className="mb-3 mb-md-0">{movie.title}</h2>
                        <span className={`badge ${movie.watched ? 'bg-success' : 'bg-secondary'} fs-6`}>
                            {movie.watched ? 'Watched' : 'Not Watched'}
                        </span>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-12">
                            {movie.notes ? (
                                <div className="mb-4">
                                    <h5 className="card-subtitle mb-2 text-muted">Notes</h5>
                                    <p className="card-text">{movie.notes}</p>
                                </div>
                            ) : (
                                <div className="mb-4">
                                    <p className="text-muted fst-italic">No notes added</p>
                                </div>
                            )}

                            {movie.watched && (
                                <div className="mb-4">
                                    <h5 className="card-subtitle mb-3 text-muted">Rating</h5>
                                    <div className="d-flex align-items-center">
                                        <div className="me-3">
                                            <span className="display-4">{movie.rating}</span>
                                            <span className="text-muted">/10</span>
                                        </div>
                                        <div className="flex-grow-1" style={{ maxWidth: '300px' }}>
                                            <div className="progress" style={{ height: '10px' }}>
                                                <div
                                                    className={`progress-bar ${getRatingColorClass(movie.rating)}`}
                                                    role="progressbar"
                                                    style={{ width: `${movie.rating * 10}%` }}
                                                    aria-valuenow={movie.rating}
                                                    aria-valuemin={0}
                                                    aria-valuemax={10}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="card-footer bg-transparent">
                    <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
                        <div>
                            <Link to="/" className="btn btn-outline-secondary me-2">
                                <i className="bi bi-arrow-left me-1"></i>Back
                            </Link>
                        </div>
                        <div>
                            <Link to={`/edit/${movie.id}`} className="btn btn-primary me-2">
                                <i className="bi bi-pencil me-1"></i>Edit
                            </Link>
                            <button onClick={handleDelete} className="btn btn-danger">
                                <i className="bi bi-trash me-1"></i>Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper function to get color class based on rating
const getRatingColorClass = (rating: number): string => {
    if (rating >= 8) return 'bg-success';
    if (rating >= 5) return 'bg-info';
    if (rating >= 3) return 'bg-warning';
    return 'bg-danger';
};

export default MovieDetails;