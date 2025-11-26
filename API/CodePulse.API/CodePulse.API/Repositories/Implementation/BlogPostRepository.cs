using CodePulse.API.Data;
using CodePulse.API.Model.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly ApplicationDbContext dbContext;

        public BlogPostRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<BlogPost>> GetAllBlogPosts()
        {
            return await dbContext.BlogPosts.Include(x => x.Categories).ToListAsync();
        }

        public async Task<BlogPost?> GetBlogPostById(Guid id)
        {
            var data = await dbContext.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == id);
            if(data is null)
            {
                return null;
            }
            return data;
        }

        public async Task<BlogPost?> GetBlogpostByUrl(string url)
        {
            var data = await this.dbContext.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.UrlHandle == url);
            if(data is null)
            {
                return null;
            }

            return data;
        }

        public async Task<BlogPost> CreateBlogPost(BlogPost blogPost)
        {
            await dbContext.BlogPosts.AddAsync(blogPost);
            await dbContext.SaveChangesAsync();

            return blogPost;
        }

        public async Task<BlogPost?> UpdateBlogPost(Guid id, BlogPost blogPost)
        {
            var data = await dbContext.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == id);

            if(data is null){
                return null;
            }

            data.Title = blogPost.Title;
            data.Author = blogPost.Author;
            data.ShortDescription = blogPost.ShortDescription;
            data.Content = blogPost.Content;
            data.PublishedDate = blogPost.PublishedDate;
            data.FeaturedImageUrl = blogPost.FeaturedImageUrl;
            data.IsVisible = blogPost.IsVisible;
            data.UrlHandle = blogPost.UrlHandle;

            data.Categories.Clear();

            foreach(var cat in blogPost.Categories)
            {
                var existing = await this.dbContext.Categories.FirstOrDefaultAsync(x => cat.Id == x.Id);
                if(existing is not null)
                {
                    data.Categories.Add(existing);
                }
            }

            await dbContext.SaveChangesAsync();

            return data;
        }

        public async Task<BlogPost?> DeleteBlogPost(Guid id)
        {
            var data = await dbContext.BlogPosts.FirstOrDefaultAsync(x => x.Id == id);
            if (data is null)
            {
                return null;
            }

            dbContext.BlogPosts.Remove(data);
            await dbContext.SaveChangesAsync();
            return data;
        }
    }
}
