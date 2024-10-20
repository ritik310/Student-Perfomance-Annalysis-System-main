using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using spms.Models;

[ApiController]
[Route("/api/student")]
public class StudentController : ControllerBase{

    private readonly SiteDbContext site;
    public StudentController(SiteDbContext site){
        this.site = site;
    }

   [HttpGet]
    public ActionResult<List<Student>> GetStudent(){
    var students = from std in site.Students
                   select std; 

    var studentList = students.ToList();

    return studentList.Any() ? studentList.ToList() : NotFound("Data Not Found"); 
}
    //Get Student By ID
   [HttpGet("{id}")]
    public ActionResult<List<Student>> GetStudentById( int id)
    {
        var student = site.Students.FirstOrDefault(std => std.StudentId == id);

        if (student == null)
        {
            return NotFound($"{id} Not Found");
        }
        return Ok(student);
    }


    [HttpPost]
    public async Task<IActionResult> AddStudent(Student std){
        var student = await site.Students.FirstOrDefaultAsync(a => a.Email == std.Email);
        var lastStudent = await site.Students.OrderByDescending(s => s.StudentId).FirstOrDefaultAsync();
        if(student != null){
            return Conflict("Student Already There");
        }
        else{
            std.StudentId = lastStudent != null ? lastStudent.StudentId + 1 : 1001 ;
            std.Password = std.StudentId.ToString();
            std.DOB = std.DOB;
            site.Students.Add(std);
            site.SaveChanges();
            return Ok("Student Added Successfully");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStudent(int id,[FromBody] Student input)
    {
        var std = await site.Students.FindAsync(id);

        if (std == null)
        {
            return Conflict($"{id} does not exist.");
        }
        else
        {
            std.FirstName = input.FirstName ?? (site.Students.FirstOrDefault(e => e.StudentId == id)?.FirstName);
            std.MiddleName = input.MiddleName != null ? input.MiddleName : site.Students.FirstOrDefault(e => e.StudentId == id)?.MiddleName;
            std.LastName = input.LastName != null ? input.LastName :site.Students.FirstOrDefault(e => e.StudentId == id)?.LastName;
            std.Email = input.Email != null ? input.Email : site.Students.FirstOrDefault(e => e.StudentId == id)?.Email;
            std.Mobile = input.Mobile != null ? input.Mobile : site.Students.FirstOrDefault(e => e.StudentId == id)?.Mobile;
            std.DOB = input.DOB != null ? input.DOB : site.Students.FirstOrDefault(e => e.StudentId == id)?.DOB;
            std.Sex = input.Sex != null ? input.Sex : site.Students.FirstOrDefault(e=>e.StudentId==id)?.Sex;
            std.CourseName = (input.CourseName != null ? input.CourseName : site.Students.FirstOrDefault(e => e.StudentId == id)?.CourseName);
            #pragma warning disable CS0472 // The result of the expression is always the same since a value of this type is never equal to 'null'
            std.Batch = (int)(input.Batch != null ? input.Batch : site.Students.FirstOrDefault(e=>e.StudentId==id)?.Batch);
            #pragma warning restore CS0472 // The result of the expression is always the same since a value of this type is never equal to 'null'
            await site.SaveChangesAsync();
            return Ok($"{std.FirstName} Update Successfully"); 
        }
    }

    
   [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudent(int id)
    {
        var student = await site.Students.FindAsync(id);

        if (student == null)
        {
            return Conflict($"{id} does not exist.");
        }
        else
        {
            site.Students.Remove(student);
            await site.SaveChangesAsync();
            return Ok($"{id} deleted successfully"); 
        }
    }

}