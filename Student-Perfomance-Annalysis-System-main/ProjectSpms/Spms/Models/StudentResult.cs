using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace spms.Models;

[Table("student_result")]
public class StudentResult {
    [Key]
    public int MarkId{get; set;}
    public int Marks{get;set;}
    [Column("student_id")]
    public int Studnet_id{get;set;}

    [Column("quiz_id")]
    public int QuizeId{get; set;}

}