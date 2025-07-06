using EstudianteCRUD.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EstudianteCRUD.Controllers
{
    [ApiController, Route("api/subjects")]
public class SubjectsController : ControllerBase
{
    private readonly AppDbContext _db;
    public SubjectsController(AppDbContext db) => _db = db;

  
    [HttpGet]                     
    public async Task<IActionResult> List()
    {
        var subjects = await _db.Subjects
            .Select(s => new {
                s.Id,
                s.Name,
                s.Credits,
                Professor = s.Professor.FullName
            })
            .ToListAsync();

        return Ok(subjects);
    }

   
    [HttpGet("{id}/students")]
    public async Task<IActionResult> Students(int id)
    {
        var names = await _db.Enrollments
            .Where(e => e.SubjectId == id)
            .Select(e => e.Student.FullName)
            .ToListAsync();

        return Ok(names);
    }


        [HttpGet("{id:int}/schedule")]
        public async Task<IActionResult> Schedule(int id)
        {
          
            var raw = await _db.Enrollments
                .Where(e => e.StudentId == id)
                .Select(e => new
                {
                    SubjectId = e.SubjectId,
                    SubjectName = e.Subject.Name,
                    Professor = e.Subject.Professor.FullName,
                    Peers = e.Subject.Enrollments
                                   .Where(x => x.StudentId != id)
                                   .Select(x => x.Student.FullName)
                })
                .AsNoTracking()
                .ToListAsync();         

          
            var schedule = raw
                .GroupBy(x => new { x.SubjectId, x.SubjectName, x.Professor })
                .Select(g => new {
                    subject = new
                    {
                        name = g.Key.SubjectName,
                        professor = g.Key.Professor
                    },
                    peers = g.SelectMany(x => x.Peers).Distinct().ToList()
                })
                .ToList();

            return Ok(schedule);
        }


    }
}
