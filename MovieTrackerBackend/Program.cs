using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MovieTrackerBackend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// ✅ Add CORS services
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddSingleton<IMongoDbContext, MongoDbContext>(provider =>
{
    var config = provider.GetRequiredService<IConfiguration>();
    var logger = provider.GetRequiredService<ILogger<MongoDbContext>>();

    var connectionString = config["MongoDb:ConnectionString"]
        ?? throw new ArgumentNullException("MongoDb:ConnectionString");
    var databaseName = config["MongoDb:DatabaseName"]
        ?? throw new ArgumentNullException("MongoDb:DatabaseName");

    return new MongoDbContext(connectionString, databaseName, logger);
});

builder.Services.AddSingleton<MovieService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    // ✅ Enable HTTPS redirection ONLY in production
    app.UseHttpsRedirection();
}

app.UseCors();
app.UseAuthorization();
app.MapControllers();
app.Run();
