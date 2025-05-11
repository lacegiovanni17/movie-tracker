using MongoDB.Driver;
using MovieTrackerBackend.Models;

namespace MovieTrackerBackend.Services
{
    public interface IMongoDbContext
    {
        IMongoCollection<Movie> Movies { get; }
    }
}