using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using spms.Models;

namespace spms.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class SubjectController : ControllerBase
{

    private readonly SiteDbContext site;
    public SubjectController(SiteDbContext site){
        this.site = site;
    }

    [HttpGet] 
    public ActionResult<List<Subject>> GetSubject()
    {
        List<Subject> selection = (from e in site.Subjects
                        select e).ToList();
        return selection.Count() > 0 ? selection.ToList() : NotFound();
    }

   [HttpDelete("{SubjectId}")]
    public async Task<IActionResult> DeleteAdmin(int SubjectId)
    {
        var subject = await site.Subjects.FirstOrDefaultAsync(s=>s.SubjectId == SubjectId);

        if (subject == null)
        {
            return Conflict($"{SubjectId} does not exist.");
        }
        else
        {
            site.Subjects.Remove(subject);
            await site.SaveChangesAsync();
            return Ok(); 
        }
    }

    [HttpPut("{subjectId}")]
    public async Task<IActionResult> UpdateAdmin(int subjectId,[FromBody] Subject input)
    {
        var subject = await site.Subjects.FirstOrDefaultAsync(s=>s.SubjectId == subjectId);

        if (subject == null)
        {
            return Conflict($"{subjectId} does not exist.");
        }
        else
        {
            subject.SubjectName = input.SubjectName ?? (site.Subjects.FirstOrDefault(e => e.SubjectId == subjectId)?.SubjectName);
            #pragma warning disable CS0472 // The result of the expression is always the same since a value of this type is never equal to 'null'
            subject.SubjectId = (int)(input.SubjectId != 0 ? input.SubjectId : (site.Subjects.FirstOrDefault(e=>e.SubjectId == subjectId)?.SubjectId));
            #pragma warning restore CS0472 // The result of the expression is always the same since a value of this type is never equal to 'null'
            await site.SaveChangesAsync();
            return Ok(); 
        }
    }


    [HttpGet("{CourseName}")]
    public async Task<ActionResult<List<Subject>>> GetSubjectByCourse(string CourseName){
        try{

            var subject = await site.Subjects.Where(sub=>sub.CourseName == CourseName).ToListAsync();
            if(subject == null || subject.Count == 0){
                return NotFound("Subject is not present");
            }
            else{
                return Ok(subject);
            }
        }
        catch (Exception e){
        // Log the exception for further investigation
        Console.WriteLine(e.Message);
        return StatusCode(500, "Internal Server Error");
    }
    } 
    
}