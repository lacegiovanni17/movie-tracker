using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using MovieTrackerBackend.Models;

namespace MovieTrackerBackend.Services
{
    public class MovieService
    {
        private readonly IMongoCollection<Movie> _movies;

        public MovieService(IMongoDbContext context)
        {
            _movies = context.Movies;
        }

        public async Task<Movie> CreateMovieAsync(Movie movie)
        {
            await _movies.InsertOneAsync(movie);
            return movie;
        }

        public async Task<List<Movie>> GetMoviesAsync()
        {
            return await _movies.Find(_ => true).ToListAsync();
        }

        public async Task<Movie> GetMovieByIdAsync(string id)
        {
            return await _movies.Find(movie => movie.Id == id).FirstOrDefaultAsync();
        }

        public async Task UpdateMovieAsync(string id, Movie movie)
        {
            movie.Id = id; // Ensure the movie has the correct _id before replacing
            await _movies.ReplaceOneAsync(m => m.Id == id, movie);
        }

        public async Task RemoveMovieAsync(string id)
        {
            await _movies.DeleteOneAsync(movie => movie.Id == id);
        }
    }
}