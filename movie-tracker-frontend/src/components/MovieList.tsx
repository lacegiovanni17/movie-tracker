import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { movieService } from '../services/movieService';
import { Movie } from '../types/Movie';

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await movieService.getMovies();
                console.log({ data })
                setMovies(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch movies');
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            try {
                await movieService.deleteMovie(id);
                setMovies(movies.filter(movie => movie.id !== id));
            } catch (err) {
                setError('Failed to delete movie');
            }
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
    
    if (error) return (
        <div className="alert alert-danger mx-3 mx-md-0" role="alert">
            {error}
        </div>
    );

    return (
        <div className="container-fluid container-md px-4 mt-4">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4">
                <h2 className="mb-3 mb-sm-0">My Movies</h2>
                <Link to="/add" className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i>Add New Movie
                </Link>
            </div>
            
            {movies.length === 0 ? (
                <div className="text-center p-5 bg-light rounded">
                    <p className="mb-4">No movies found in your collection.</p>
                    <Link to="/add" className="btn btn-outline-primary">Add Your First Movie</Link>
                </div>
            ) : (
                <div className="row g-4">
                    {movies.map(movie => (
                        <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={movie.id}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h5 className="card-title text-truncate" title={movie.title}>
                                            {movie.title}
                                        </h5>
                                        <span className={`badge ${movie.watched ? 'bg-success' : 'bg-secondary'}`}>
                                            {movie.watched ? 'Watched' : 'Unwatched'}
                                        </span>
                                    </div>
                                    
                                    {movie.notes && (
                                        <p className="card-text text-muted small" style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {movie.notes}
                                        </p>
                                    )}
                                    
                                    {movie.watched && (
                                        <div className="mt-3">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <span className="small fw-bold">Rating:</span>
                                                <span className="badge bg-primary">{movie.rating}/10</span>
                                            </div>
                                            <div className="progress" style={{ height: '8px' }}>
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
                                    )}
                                </div>
                                <div className="card-footer bg-transparent border-top-0">
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/edit/${movie.id}`} className="btn btn-sm btn-outline-primary">
                                            <i className="bi bi-pencil me-1"></i>Edit
                                        </Link>
                                        <button 
                                            onClick={() => movie.id && handleDelete(movie.id)} 
                                            className="btn btn-sm btn-outline-danger"
                                        >
                                            <i className="bi bi-trash me-1"></i>Delete
                                        </button>
                                        <Link to={`/details/${movie.id}`} className="btn btn-sm btn-outline-secondary">
                                            <i className="bi bi-info-circle me-1"></i>Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
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

export default MovieList;