using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace spms.Models;

[Table("quiz")]
public class Quize{
    [Key]
    [Column("id")]
    public int QuizeId{get;set;}


    public string Title{get;set;}
}