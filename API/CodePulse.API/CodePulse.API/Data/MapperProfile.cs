using AutoMapper;
using CodePulse.API.Model.Domain;
using CodePulse.API.Model.DTO;

namespace CodePulse.API.Data
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<BlogPost, BlogPostDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
        }
    }
}
