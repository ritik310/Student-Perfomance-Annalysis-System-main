using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace spms.Models
{
    [Table("Student")]
    public class Student
    {
        public int StudentId { get; set; }

        public string FirstName { get; set; }

        public string MiddleName { get; set; }

        public string LastName { get; set; }

        public string Mobile { get; set; }

        public string Email { get; set; }

        public string DOB { get; set; }

        public string Sex{get; set;}

        public int Batch{get; set;}

        //[JsonIgnore]

        public string Password { get; set; } 
        
        public string CourseName{get; set;}
    }
}
