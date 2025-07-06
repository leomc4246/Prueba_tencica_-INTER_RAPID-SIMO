namespace EstudianteCRUD.Models
{
    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public byte Credits { get; set; } = 3;
        public int ProfessorId { get; set; }
        public Professor Professor { get; set; } = null!;
        public ICollection<Enrollment> Enrollments { get; set; } = [];
    }
}
