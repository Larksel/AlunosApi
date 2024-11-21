using Moq;
using AlunosApi.Controllers;
using AlunosApi.Services;
using AlunosApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace AlunosApi.Tests;

public class AlunosControllerTests
{
	[Fact]
	public async Task GetAlunos_RetornaListaDeAlunos()
	{
		// Arrange
		var mockService = new Mock<IAlunoService>();
		var alunos = new List<Aluno>
		{
			new Aluno { Id = 1, Nome = "Pedro", Email = "pedrinho@gmail.com", Idade = 20 },
			new Aluno { Id = 2, Nome = "Marcos", Email = "marcos.silva@gmail.com", Idade = 35 },
			new Aluno { Id = 3, Nome = "Lucas", Email = "lucas.moreira@gmail.com", Idade = 25 },
		};

		mockService.Setup(s => s.GetAlunos()).ReturnsAsync(alunos);

		var controller = new AlunosController(mockService.Object);

		// Act
		var result = await controller.GetAlunos();

		// Assert
		var okResult = Assert.IsType<OkObjectResult>(result.Result);
		var alunosRetornados = Assert.IsAssignableFrom<IEnumerable<Aluno>>(okResult.Value);
		Assert.Equal(3, alunosRetornados.Count());
	}

	[Fact]
	public async Task GetAlunosByName_RetornaListaDeAlunosComMesmoNome()
	{
		// Arrange
		var mockService = new Mock<IAlunoService>();
		var nomeAluno = "Pedro";
		var alunos = new List<Aluno>
		{
			new Aluno { Id = 1, Nome = nomeAluno, Email = "pedrinho@gmail.com", Idade = 20 },
			new Aluno { Id = 2, Nome = nomeAluno, Email = "pedro.silva@gmail.com", Idade = 35 },
		};

		mockService.Setup(s => s.GetAlunosByNome(nomeAluno))
			.ReturnsAsync(alunos);

		var controller = new AlunosController(mockService.Object);

		// Act
		var result = await controller.GetAlunosByName(nomeAluno);

		// Assert
		var okResult = Assert.IsType<OkObjectResult>(result.Result);
		var alunosRetornados = Assert.IsAssignableFrom<IEnumerable<Aluno>>(okResult.Value);
		Assert.Equal(2, alunosRetornados.Count());
	}

	[Fact]
	public async Task GetAluno_RetornaAlunoCorreto()
	{
		// Arrange
		var mockService = new Mock<IAlunoService>();
		var id = 3;
		var aluno = new Aluno { Id = 3, Nome = "Lucas", Email = "lucas.moreira@gmail.com", Idade = 25 };

		mockService.Setup(s => s.GetAluno(id)).ReturnsAsync(aluno);

		var controller = new AlunosController(mockService.Object);

		// Act
		var result = await controller.GetAluno(id);

		// Assert
		var okResult = Assert.IsType<OkObjectResult>(result.Result);
		var alunoRetornado = Assert.IsType<Aluno>(okResult.Value);
		Assert.Equal(id, alunoRetornado.Id);
	}

	[Fact]
	public async Task Create_RetornaNovoAluno()
	{
		// Arrange
		var mockService = new Mock<IAlunoService>();
		var aluno = new Aluno { Id = 4, Nome = "Fernando", Email = "fernando.noronha@gmail.com", Idade = 18 };

		mockService.Setup(s => s.CreateAluno(aluno));

		var controller = new AlunosController(mockService.Object);

		// Act
		var result = await controller.Create(aluno);

		// Assert
		var createdResult = Assert.IsType<CreatedAtRouteResult>(result);
		var alunoCriado = Assert.IsType<Aluno>(createdResult.Value);
		Assert.Equal(aluno, alunoCriado);
	}

	[Fact]
	public async Task Update_RetornaBadRequest_SeIdIncorreto()
	{
		// Arrange
		var mockService = new Mock<IAlunoService>();
		var idIncorreto = 3;
		var aluno = new Aluno { Id = 4, Nome = "Fernando", Email = "fernando.noronha@gmail.com", Idade = 18 };

		mockService.Setup(s => s.UpdateAluno(aluno));

		var controller = new AlunosController(mockService.Object);

		// Act
		var result = await controller.Update(idIncorreto, aluno);

		// Assert
		var updateResult = Assert.IsType<BadRequestObjectResult>(result);
		Assert.Equal("Dados inconsistentes", updateResult.Value);
	}

	[Fact]
	public async Task Delete_RetornaNaoEncontrado_SeAlunoInexistente()
	{
		// Arrange
		var mockService = new Mock<IAlunoService>();
		var idInexistente = 3;
		var aluno = new Aluno { Id = 4, Nome = "Fernando", Email = "fernando.noronha@gmail.com", Idade = 18 };

		mockService.Setup(s => s.GetAluno(aluno.Id)).ReturnsAsync(aluno);
		mockService.Setup(s => s.DeleteAluno(aluno));

		var controller = new AlunosController(mockService.Object);

		// Act
		var result = await controller.Delete(idInexistente);

		// Assert
		var deleteResult = Assert.IsType<NotFoundObjectResult>(result);
		Assert.Equal($"Aluno com id {idInexistente} não encontrado", deleteResult.Value);
	}
}