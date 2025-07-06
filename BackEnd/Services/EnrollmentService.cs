using EstudianteCRUD.Data;
using EstudianteCRUD.Helpers;
using EstudianteCRUD.Models;
using Microsoft.EntityFrameworkCore;

namespace EstudianteCRUD.Services
{
    public class EnrollmentService
    {
        private readonly AppDbContext _db;
        public EnrollmentService(AppDbContext db) => _db = db;

        public async Task<Result> EnrollAsync(int studentId, int[] subjectIds)
        {
            if (subjectIds.Length == 0) return Result.Fail("Sin materias");
            if (subjectIds.Length > 3) return Result.Fail("Máximo 3 materias");

            var existingSubjs = await _db.Enrollments
                .Where(e => e.StudentId == studentId)
                .Select(e => e.SubjectId)
                .ToListAsync();

            if (existingSubjs.Count + subjectIds.Length > 3)
                return Result.Fail("Supera el límite de 3 materias");

            
            var professorIds = await _db.Subjects
                .Where(s => subjectIds.Contains(s.Id))
                .Select(s => s.ProfessorId)
                .ToListAsync();

            
            var professorsAlready = await _db.Enrollments
                .Where(e => e.StudentId == studentId)
                .Select(e => e.Subject.ProfessorId)
                .ToListAsync();

            if (professorIds.Concat(professorsAlready).Distinct().Count()
                != professorIds.Count + professorsAlready.Count)
                return Result.Fail("No se permite repetir profesor");

            foreach (var sid in subjectIds)
                _db.Enrollments.Add(new Enrollment { StudentId = studentId, SubjectId = sid });

            await _db.SaveChangesAsync();
            return Result.Ok();
        }
    }
}
