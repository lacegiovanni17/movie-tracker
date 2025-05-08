// using System;

// namespace MovieTrackerBackend.Models
// {
//     public class Movie
//     {
//         public string? Id { get; set; }
//         public string? Title { get; set; }
//         public string? Notes { get; set; }
//         public bool Watched { get; set; }
//         public int Rating { get; set; }
//     }
// }


using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MovieTrackerBackend.Models
{
    public class Movie
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string? Title { get; set; }
        public string? Notes { get; set; }
        public bool Watched { get; set; }
        public int Rating { get; set; }
    }
}