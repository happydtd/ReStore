解决cors问题，在api的program.cs中加入
builder.Services.AddCors();
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
});

client port number改变
在vite.config.ts中修改
export default defineConfig({
  server:{
    port: 3000
  },
  plugins: [react()],
})
