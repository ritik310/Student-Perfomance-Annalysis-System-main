using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace spms.Models;
[Table("course")]
public class Course{

    [Key]
    public int CourseId{get; set;}
    public string CourseName{get; set;}   
    public List<Subject> Subjects { get; set; } = new();

}