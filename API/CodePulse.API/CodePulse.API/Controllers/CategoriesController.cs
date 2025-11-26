using AutoMapper;
using CodePulse.API.Data;
using CodePulse.API.Model.Domain;
using CodePulse.API.Model.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CodePulse.API.Controllers
{
    //https://localhost:xxxx/api/categories
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository categoryRepository;
        private readonly IMapper mapper;

        public CategoriesController(ICategoryRepository categoryRepository,IMapper mapper)
        {
            this.categoryRepository = categoryRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await categoryRepository.GetAll();

            var response = this.mapper.Map<List<CategoryDto>>(categories);
                
            return Ok(response);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetCategoryById([FromRoute] Guid id)
        {
            var category = await categoryRepository.GetById(id);

            if (category is null)
            {
                return NotFound();
            }

            var result = this.mapper.Map<CategoryDto>(category);

            return Ok(result);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> updateCategory([FromRoute] Guid id, CreateCategoryRequestDto category)
        {
            var record = new Category
            {
                Id = id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            var data = await categoryRepository.updateCategory(id, record);
            if(data is null)
            {
                return NotFound();
            }

            var result = this.mapper.Map<CategoryDto>(data);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryRequestDto request)
        {
            // Map Dto to Domain model
            var category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };

            await categoryRepository.CreateAsync(category);

            // Domain to dto
            var response = this.mapper.Map<CategoryDto>(category);

            return Ok(response);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] Guid id)
        {
            var category = await categoryRepository.DeleteCategory(id);
            if (category is null)
            {
                return NotFound();
            }

            var response = this.mapper.Map<CategoryDto>(category);

            return Ok(response);
        }

    }
}
