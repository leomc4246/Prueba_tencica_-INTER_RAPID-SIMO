namespace EstudianteCRUD.Models
{
    public class Professor
    {
        public int Id { get; set; }
        public string FullName { get; set; } = null!;
        public ICollection<Subject> Subjects { get; set; } = [];
    }
}
