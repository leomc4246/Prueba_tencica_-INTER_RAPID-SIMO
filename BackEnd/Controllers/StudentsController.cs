using EstudianteCRUD.Data;
using EstudianteCRUD.Models;
using EstudianteCRUD.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EstudianteCRUD.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly EnrollmentService _enr;

    public StudentsController(AppDbContext db, EnrollmentService enr) =>
        (_db, _enr) = (db, enr);


    [HttpPost("{id:int}/enroll")]
    public async Task<IActionResult> Enroll(int id, [FromBody] int[] subjectIds)
    {
        var res = await _enr.EnrollAsync(id, subjectIds);
        return res.Success ? Ok() : BadRequest(res.Error);
    }

    [HttpGet("{id:int}/schedule")]
    public async Task<IActionResult> Schedule(int id)
    {
        var schedule = await _db.Enrollments
            .Where(e => e.StudentId == id)
            .Select(e => new
            {
                Subject = e.Subject.Name,
                Professor = e.Subject.Professor.FullName,
                Peers = e.Subject.Enrollments
                                .Where(x => x.StudentId != id)
                                .Select(x => x.Student.FullName)
            })
            .ToListAsync();

        return Ok(schedule);
    }


    [HttpGet]                        
    public async Task<IActionResult> List()
    {
        var students = await _db.Students
            .Select(s => new { s.Id, s.FullName, s.Email })
            .ToListAsync();

        return Ok(students);
    }

    [HttpGet("{id:int}")]             
    public async Task<IActionResult> Get(int id)
    {
        var student = await _db.Students
            .Include(s => s.Enrollments)
                .ThenInclude(e => e.Subject)
                    .ThenInclude(sub => sub.Professor)
            .Where(s => s.Id == id)
            .Select(s => new
            {
                s.Id,
                s.FullName,
                s.Email,
                EnrolledSubjects = s.Enrollments.Select(e => new
                {
                    e.Subject.Id,
                    Name = e.Subject.Name,
                    Professor = e.Subject.Professor.FullName
                })
            })
            .FirstOrDefaultAsync();

        return student is null ? NotFound() : Ok(student);
    }

   
    [HttpPost]
    public async Task<ActionResult<Student>> Post([FromBody] Student dto)
    {
        
        _db.Students.Add(dto);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new { id = dto.Id }, dto); 
    }

   
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Put(int id, [FromBody] Student dto)
    {
        if (id != dto.Id) return BadRequest("ID mismatch");

        var existing = await _db.Students.FindAsync(id);
        if (existing is null) return NotFound();

        existing.FullName = dto.FullName;
        existing.Email = dto.Email;
        

        await _db.SaveChangesAsync();
        return NoContent(); 
    }

    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var student = await _db.Students
            .Include(s => s.Enrollments)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (student is null) return NotFound();

       
        _db.Enrollments.RemoveRange(student.Enrollments);

        _db.Students.Remove(student);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}
