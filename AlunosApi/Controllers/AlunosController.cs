using AlunosApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AlunosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunosController(IAlunoService alunoService) : ControllerBase
    {
        private IAlunoService _alunoService = alunoService;
    }
}
