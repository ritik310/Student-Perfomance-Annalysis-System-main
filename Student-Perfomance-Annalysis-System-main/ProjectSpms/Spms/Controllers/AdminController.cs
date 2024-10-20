using Microsoft.AspNetCore.Mvc;
using spms.Models;

namespace spms.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class AdminController : ControllerBase
{

    private readonly SiteDbContext site;

    public AdminController(SiteDbContext site){
        this.site = site;
    }


    [HttpGet] 
    public ActionResult<List<Admin>> GetAdmin()
    {
        List<Admin> selection = (from e in site.Admins
                        select e).ToList();
        return selection.Count() > 0 ? selection.ToList() : NotFound();
    }

    [HttpPost]
    public IActionResult AddAdmin( Admin input){
            var admin = site.Admins.Find(input.UserName);
            if(admin is null)
            {
                admin = input;
                site.Admins.Add(admin);
            
            site.SaveChanges();
            return Ok();
            }
            else
            {
                return Conflict($"{input.UserName} already exists.");
            }
    }

   [HttpDelete("{name}")]
    public async Task<IActionResult> DeleteAdmin(string name)
    {
        var admin = await site.Admins.FindAsync(name);

        if (admin == null)
        {
            return Conflict($"{name} does not exist.");
        }
        else
        {
            site.Admins.Remove(admin);
            await site.SaveChangesAsync();
            return Ok(); 
        }
    }

    [HttpPut("{name}")]
    public async Task<IActionResult> UpdateAdmin(string name,[FromBody] Admin input)
    {
    var admin = await site.Admins.FindAsync(name);

        if (admin == null)
        {
            return Conflict($"{name} does not exist.");
        }
        else
        {
            
            // Update properties if input is provided, otherwise retain existing values

            admin.UserName = input.UserName ?? (site.Admins.FirstOrDefault(e => e.UserName == name)?.UserName);
            admin.Name = input.Name ?? (site.Admins.FirstOrDefault(e => e.Name == name)?.Name);
            admin.Email = input.Email != null ? input.Email : site.Admins.FirstOrDefault(e => e.UserName == name)?.Email;
            admin.Password = input.Password != null ? input.Password : site.Admins.FirstOrDefault(e=>e.UserName == name)?.Password;
            await site.SaveChangesAsync();
            return Ok(); 
        }
    }
    
    [HttpGet("studentList")]
    public ActionResult<List<object>> GetStudent(){
    var students = from std in site.Students
                   select std;

    var studentList = students.ToList();

    return studentList.Any() ? studentList.Cast<object>().ToList() : NotFound("Data Not Found"); 
}

/* [HttpGet("studentList")]
public ActionResult<List<Student>> GetStudent()
{
    var studentList = site.Students.ToList();

    if (studentList.Any())
    {
        return studentList;
    }
    else
    {
        return NotFound("Data Not Found");
    }*/
}


    
}