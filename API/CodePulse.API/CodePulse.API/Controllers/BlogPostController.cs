using AutoMapper;
using CodePulse.API.Model.Domain;
using CodePulse.API.Model.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.DataAnnotations;
using System.Net.WebSockets;

namespace CodePulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostController : ControllerBase
    {
        private readonly IBlogPostRepository blogPostRepository;
        private readonly IMapper mapper;

        public ICategoryRepository CategoryRepository { get; }

        public BlogPostController(IBlogPostRepository blogPostRepository, ICategoryRepository categoryRepository, IMapper mapper)
        {
            this.blogPostRepository = blogPostRepository;
            CategoryRepository = categoryRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBlogPosts()
        {
            var data = await blogPostRepository.GetAllBlogPosts();

            var result = this.mapper.Map<List<BlogPostDto>>(data);

            return Ok(result);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetBlogPostById([FromRoute] Guid id)
        {
            var data = await blogPostRepository.GetBlogPostById(id);

            if(data is null)
            {
                return NotFound();
            }

            var result = this.mapper.Map<BlogPostDto>(data);

            return Ok(result);
        }

        [HttpGet]
        [Route("{url}")]
        public async Task<IActionResult> GetBlogpostByUrl([FromRoute] string url)
        {
            var data = await this.blogPostRepository.GetBlogpostByUrl(url);

            if(data is null)
            {
                return NotFound();
            }

            var result = this.mapper.Map<BlogPostDto>(data);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBlogPost(CreateBlogPostDto blogPost)
        {
            var data = new BlogPost
            {
                Title = blogPost.Title,
                ShortDescription = blogPost.ShortDescription,
                UrlHandle = blogPost.UrlHandle,
                Content = blogPost.Content,
                FeaturedImageUrl = blogPost.FeaturedImageUrl,
                PublishedDate = blogPost.PublishedDate,
                Author = blogPost.Author,
                IsVisible = blogPost.IsVisible,
                Categories = new List<Category>()
            };

            foreach(var category in blogPost.Categories)
            {
                var existing = await CategoryRepository.GetById(category);
                if (existing is not null)
                {
                    data.Categories.Add(existing);
                }
            }

            data = await blogPostRepository.CreateBlogPost(data);

            var result = new BlogPostDto
            {
                Id = data.Id,
                Title = data.Title,
                ShortDescription = data.ShortDescription,
                UrlHandle = data.UrlHandle,
                Content = data.Content,
                FeaturedImageUrl = data.FeaturedImageUrl,
                PublishedDate = data.PublishedDate,
                Author = data.Author,
                IsVisible = data.IsVisible,
                Categories = data.Categories.Select(x => new CategoryDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle
                }).ToList()
            };

            return Ok(result);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateBlogPost([FromRoute] Guid id, CreateBlogPostDto blogPost)
        {
            var data = new BlogPost
            {
                Id = id,
                Title = blogPost.Title,
                ShortDescription = blogPost.ShortDescription,
                UrlHandle = blogPost.UrlHandle,
                Content = blogPost.Content,
                FeaturedImageUrl = blogPost.FeaturedImageUrl,
                PublishedDate = blogPost.PublishedDate,
                Author = blogPost.Author,
                IsVisible = blogPost.IsVisible,
                Categories = new List<Category>()
            };

            foreach (var category in blogPost.Categories)
            {
                var existing = await this.CategoryRepository.GetById(category);
                if(existing is not null)
                {
                    data.Categories.Add(existing);
                }
            }

            var response = await blogPostRepository.UpdateBlogPost(id, data);

            if(response is null)
            {
                return NotFound();
            }

            var result = new BlogPostDto
            {
                Id = response.Id,
                Title = response.Title,
                ShortDescription = response.ShortDescription,
                UrlHandle = response.UrlHandle,
                Content = response.Content,
                FeaturedImageUrl = response.FeaturedImageUrl,
                PublishedDate = response.PublishedDate,
                Author = response.Author,
                IsVisible = response.IsVisible,
                Categories = response.Categories.Select(y => new CategoryDto
                {
                    Id = y.Id,
                    Name = y.Name,
                    UrlHandle = y.UrlHandle,
                }).ToList()
            };

            return Ok(result);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteBlogPost([FromRoute] Guid id)
        {
            var data = await blogPostRepository.DeleteBlogPost(id);
            if(data is null)
            {
                return NotFound();
            }

            var result = this.mapper.Map<BlogPostDto>(data);

            return Ok(result);
        }
    }
}

