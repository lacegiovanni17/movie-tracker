using MongoDB.Driver;
using MovieTrackerBackend.Models;

// namespace MovieTrackerBackend.Services
// {
//     public class MongoDbContext : IMongoDbContext
//     {
//         private readonly IMongoDatabase _database;

//         public MongoDbContext(string connectionString, string databaseName)
//         {
//             var client = new MongoClient(connectionString);
//             _database = client.GetDatabase(databaseName);
//         }

//         public IMongoCollection<Movie> Movies => _database.GetCollection<Movie>("Movies");
//     }
// }

namespace MovieTrackerBackend.Services
{
    public class MongoDbContext : IMongoDbContext
    {
        private readonly IMongoDatabase _database;
        public IMongoCollection<Movie> Movies => _database.GetCollection<Movie>("Movies");

        public MongoDbContext(string connectionString, string databaseName, ILogger<MongoDbContext> logger)
        {
            try
            {
                var client = new MongoClient(connectionString);
                _database = client.GetDatabase(databaseName);
                logger.LogInformation($"Successfully connected to the MongoDB database: {databaseName}");
            }
            catch (Exception ex)
            {
                logger.LogError($"Error connecting to MongoDB: {ex.Message}");
                throw;  // Re-throw the exception to fail fast if connection fails
            }
        }
    }
}
