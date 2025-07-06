namespace EstudianteCRUD.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public ICollection<Enrollment> Enrollments { get; set; } = [];
    }
}
