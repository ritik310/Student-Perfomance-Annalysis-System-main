
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using spms.Models;

namespace spms.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CourseController : ControllerBase{

    private readonly SiteDbContext site;

    public CourseController(SiteDbContext site){
        this.site = site;
    }
    
    [HttpGet]
    public ActionResult<List<Course>> GetCourse(){
        var course = from crs in site.Courses
                     select crs;
        return course.Count() > 0 ? course.ToList() : NotFound();
    }
    
    [HttpPost]
    public IActionResult AddCourse(Course input){
        var course = site.Courses.Find(input.CourseId);
            if(course is null)
            {
                course=input;
                site.Courses.Add(course);
                site.SaveChanges();
                return Ok();
            }
            else
            {
                return Conflict($"{input.CourseId} already exists.");
            }       
    }  
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCourse(int id,Course input){
        var course = await site.Courses.FirstOrDefaultAsync(crs=>crs.CourseId == id);
        if(course == null){
            return NotFound($"{id} Not Found");
        }
        course.CourseName = input.CourseName != null ? input.CourseName : site.Courses.FirstOrDefault(c=>c.CourseId == id)?.CourseName;
        site.SaveChanges();
        return Ok("Course Update Successfully");
    }   

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourse(int id){
        var course = await site.Courses.FirstOrDefaultAsync(crs=>crs.CourseId == id);
        if(course == null){
            return NotFound($"{id} Not Found");
        }
        site.Courses.Remove(course);
        await site.SaveChangesAsync();
        return Ok($"{course.CourseName} Delete Successfully");
    }

 [HttpPost("{courseId}")]
public IActionResult AddSubjectsToCourse(int courseId, [FromBody] List<Subject> subjects)
{
    try
    {
        var course = site.Courses.FirstOrDefault(crs => crs.CourseId == courseId);

        if (course == null)
        {
            return NotFound("Course not found");
        }

        foreach (var subject in subjects)
        {
            var existingSubject = site.Subjects.FirstOrDefault(s => s.SubjectId == subject.SubjectId);

            if (existingSubject == null)
            {
                subject.CourseName = course.CourseName; // Assign course name to subject
                course.Subjects.Add(subject); // Add subject to the course
            }
            else
            {
                // If subject already exists in the database, return Conflict
                return Conflict("Subject with ID " + subject.SubjectId + " is already present");
            }
        }

        site.SaveChanges();

        return Ok("Subjects added to the course successfully");
    }
    catch (Exception e)
    {
        // Log the exception for further investigation
        Console.WriteLine(e.Message);
        return StatusCode(500, "Internal Server Error");
    }
}

}