using AlunosApi.Context;
using AlunosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AlunosApi.Services
{
    public class AlunosService(AppDbContext dbContext) : IAlunoService
    {
        private readonly AppDbContext _dbContext = dbContext;

        public async Task<IEnumerable<Aluno>> GetAlunos()
        {
            // Não recomendado em produção. Filtrar ou paginar dados.
            return await _dbContext.Alunos.ToListAsync();
        }

        public async Task<IEnumerable<Aluno>> GetAlunosByNome(string nome)
        {
            IEnumerable<Aluno> alunos;
            if (!string.IsNullOrWhiteSpace(nome))
            {
                alunos = await _dbContext.Alunos.Where(aluno => aluno.Nome.Contains(nome)).ToListAsync();
            } 
            else
            {
                alunos = await GetAlunos();
            }

            return alunos;
        }

        public async Task<Aluno> GetAluno(int id)
        {
            var aluno = await _dbContext.Alunos.FindAsync(id);
            return aluno;
        }

        public async Task CreateAluno(Aluno aluno)
        {
            _dbContext.Alunos.Add(aluno); // Inclui no contexto
            await _dbContext.SaveChangesAsync(); // Manda para o banco de dados
        }

        public async Task UpdateAluno(Aluno aluno)
        {
            _dbContext.Entry(aluno).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAluno(Aluno aluno)
        {
            _dbContext.Alunos.Remove(aluno);
            await _dbContext.SaveChangesAsync();
        }
    }
}
