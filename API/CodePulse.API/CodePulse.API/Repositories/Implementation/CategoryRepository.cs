using CodePulse.API.Data;
using CodePulse.API.Model.Domain;
using CodePulse.API.Model.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext dbContext;

        public CategoryRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<Category>> GetAll()
        {
            return await dbContext.Categories.ToListAsync();
        }

        public async Task<Category?> GetById(Guid id)
        {
            var category = await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if(category is null)
            {
                return null;
            }

            return category;
        }

        public async Task<Category> CreateAsync(Category category)
        {
            await dbContext.Categories.AddAsync(category);
            await dbContext.SaveChangesAsync();

            return category;
        }

        public async Task<Category?> updateCategory(Guid id, Category category)
        {
            var data = await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);

            if(data is null)
            {
                return null;
            }
            data.Name = category.Name;
            data.UrlHandle = category.UrlHandle;

            await dbContext.SaveChangesAsync();

            return data;
        }

        public async Task<Category?> DeleteCategory(Guid id)
        {
            var category = await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
            if(category is null)
            {
                return null;
            }

            dbContext.Categories.Remove(category);
            await dbContext.SaveChangesAsync();
            return category;
        }
    }
}
