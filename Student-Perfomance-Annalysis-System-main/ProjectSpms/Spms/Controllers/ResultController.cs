using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using spms.Models;

namespace spms.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ResultController : ControllerBase{

    private readonly SiteDbContext site;

    // private CalculateAvgMarks calculateAvgMarks;
    public ResultController(SiteDbContext site){
        this.site = site;
    }
    

    //Get Total result
    [HttpGet]
    public ActionResult<List<StudentResult>> GetAllResult(){
        var result = from rs in site.StudentResults
                     select rs;
        return result.Count() > 0 ? result.ToList() : NotFound();
    }

    //Get Result by student Id
    [HttpGet("{stdid}")]
    public ActionResult<List<StudentResult>> GetStudentById( int stdid)
    {
        var result = site.StudentResults.FirstOrDefault(std => std.Studnet_id == stdid);

        if (result == null)
        {
            return NotFound($"{stdid} Not Found");
        }
        return Ok(result);
    }

    //Calculate total of all student based on quize taken

    [HttpGet("classAvg")]
    public async Task<ActionResult<float>> GetClassAvg() {
        var quiz = (from q in site.Quizes
                    select q).ToList();
        var student = await site.StudentResults.Select(s=>s.Studnet_id).ToListAsync();
        if(quiz.Count == 0){
            return NotFound("You are not created any quiz");
        }
        int sum = 0;
        foreach (var stdId in student)
        {
            var studentResult = await site.StudentResults.FirstOrDefaultAsync(i => i.Studnet_id == stdId);
            if (studentResult != null)
            {
                sum += studentResult.Marks; // Accumulate sum of marks
            }
        }

        float TotalAvg = (student.Count > 0 ? (float)sum / student.Count : 0.0f); // Calculate average, avoiding division by zero
        return Ok(TotalAvg);
    }

    //Marks per student
    [HttpGet("perStudentMarks/{stdid}")]
    public async Task<ActionResult<List<StudentResult>>> GetMarksPerStudent(int stdid){
        var studentMarks = await site.StudentResults
            .Where(i => i.Studnet_id == stdid)
            .ToListAsync();
        
        if (studentMarks == null){
            return NotFound($"{stdid} Not given exam");
        }
        else{
            return Ok(studentMarks);
        }
    }
}
