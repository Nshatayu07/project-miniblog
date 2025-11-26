using CodePulse.API.Model.Domain;
using CodePulse.API.Model.DTO;

namespace CodePulse.API.Repositories.Interface
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAll();
        Task<Category?> GetById(Guid id);

        Task<Category> CreateAsync(Category category);

        Task<Category?> updateCategory(Guid id, Category category);

        Task<Category?> DeleteCategory(Guid id);
    }
}
