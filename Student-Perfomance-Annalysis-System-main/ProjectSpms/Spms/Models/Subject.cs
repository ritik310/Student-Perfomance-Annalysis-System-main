using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using spms.Models;

[Table("Subject")]
public class Subject
{
    [JsonIgnore]
    [Key]
    public int SrNo{get; set;}
    public int SubjectId { get; set; }
    public string SubjectName { get; set; }
    public int CourseId { get; set; }
    public string CourseName{get; set;}
    [JsonIgnore]
    public Course Course { get; set; }

    
}
