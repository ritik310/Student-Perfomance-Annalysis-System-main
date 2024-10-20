using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using spms.Models;

namespace spms.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    //[Authorize]
    public class LoginController : ControllerBase
    {
        private readonly SiteDbContext _site;

        public LoginController(SiteDbContext site)
        {
            _site = site;
        }

        [HttpPost("adminLogin")]
        public async Task<IActionResult> AdminLogin(Admin input)
        {
            var admin = await _site.Admins.FirstOrDefaultAsync(a => a.UserName == input.UserName);

            if (admin != null && admin.Password == input.Password)
            {
                var identity = new ClaimsIdentity("Admin");
                identity.AddClaim(new Claim(ClaimTypes.Name, input.UserName));

                await HttpContext.SignInAsync(new ClaimsPrincipal(identity));
                var selection = _site.Admins.Where(a => a.UserName == input.UserName);

                return Ok(selection.ToList());
            }
            else
            {
                return NotFound("User Not Found");
            }
        }

        [HttpPost("studentLogin")]
        public async Task<IActionResult> StudentLogin([FromBody] Student input)
        {
            var student = await _site.Students.FirstOrDefaultAsync(a => a.StudentId == input.StudentId);
            Console.WriteLine(student.StudentId);
            if (student != null && student.Password == input.Password)
            {
                var identity = new ClaimsIdentity("Student");
                identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, input.StudentId.ToString()));

                await HttpContext.SignInAsync(new ClaimsPrincipal(identity));
                var selection = _site.Students.Where(a => a.StudentId == input.StudentId);

                return Ok(selection.ToList());
            }
            else
            {
                return NotFound("User Not Found");
            }
        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Ok("Successful Logout");
        }
    }
}
