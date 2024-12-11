解决cors问题，在api的program.cs中加入
builder.Services.AddCors();
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
});
