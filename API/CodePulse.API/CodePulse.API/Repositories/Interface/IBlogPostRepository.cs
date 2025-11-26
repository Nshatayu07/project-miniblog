using CodePulse.API.Model.Domain;

namespace CodePulse.API.Repositories.Interface
{
    public interface IBlogPostRepository
    {
        Task<IEnumerable<BlogPost>> GetAllBlogPosts();

        Task<BlogPost?> GetBlogPostById(Guid id);

        Task<BlogPost?> GetBlogpostByUrl(string url);

        Task<BlogPost> CreateBlogPost(BlogPost blogPost);

        Task<BlogPost?> UpdateBlogPost(Guid id, BlogPost blogPost);

        Task<BlogPost?> DeleteBlogPost(Guid id);
    }
}
