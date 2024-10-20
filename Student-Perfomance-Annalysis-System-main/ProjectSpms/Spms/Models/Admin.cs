using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace spms.Models;

[Table("Admin")]
public class Admin{
    [Key]
    [Column("user_name")]
    public string UserName{get; set;}

    public string Password{get; set;}

    public string Email{get; set;}

    public string Name{get; set;}

}