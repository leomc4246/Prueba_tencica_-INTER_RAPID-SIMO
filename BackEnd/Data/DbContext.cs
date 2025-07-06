using EstudianteCRUD.Models;
using Microsoft.EntityFrameworkCore;

namespace EstudianteCRUD.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Student> Students => Set<Student>();
        public DbSet<Professor> Professors => Set<Professor>();
        public DbSet<Subject> Subjects => Set<Subject>();
        public DbSet<Enrollment> Enrollments => Set<Enrollment>();

        public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ────────────────────────────────────────
            // STUDENTS  →  students
            // ────────────────────────────────────────
            modelBuilder.Entity<Student>(e =>
            {
                e.ToTable("students");              

                e.HasKey(s => s.Id);

                e.Property(s => s.Id)
                    .HasColumnName("id")            
                    .ValueGeneratedOnAdd();

                e.Property(s => s.FullName)
                    .HasColumnName("full_name")
                    .IsRequired()
                    .HasMaxLength(120);

                e.Property(s => s.Email)
                    .HasColumnName("email")
                    .IsRequired()
                    .HasMaxLength(120);
            });

            // ────────────────────────────────────────
            // PROFESSORS  →  professors
            // ────────────────────────────────────────
            modelBuilder.Entity<Professor>(e =>
            {
                e.ToTable("professors");

                e.HasKey(p => p.Id);

                e.Property(p => p.Id)
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                e.Property(p => p.FullName)
                    .HasColumnName("full_name")
                    .IsRequired()
                    .HasMaxLength(120);
            });

            // ────────────────────────────────────────
            // SUBJECTS  →  subjects
            // ────────────────────────────────────────
            modelBuilder.Entity<Subject>(e =>
            {
                e.ToTable("subjects");

                e.HasKey(s => s.Id);

                e.Property(s => s.Id)
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                e.Property(s => s.Name)
                    .HasColumnName("name")
                    .IsRequired()
                    .HasMaxLength(120);

                e.Property(s => s.Credits)
                    .HasColumnName("credits")
                    .HasDefaultValue((byte)3);

                e.Property(s => s.ProfessorId)
                    .HasColumnName("professor_id")
                    .IsRequired();

                
                e.HasOne(s => s.Professor)
                 .WithMany(p => p.Subjects)
                 .HasForeignKey(s => s.ProfessorId)
                 .OnDelete(DeleteBehavior.Restrict);
            });

            // ────────────────────────────────────────
            // ENROLLMENTS  →  enrollments
            // ────────────────────────────────────────
            modelBuilder.Entity<Enrollment>(e =>
            {
                e.ToTable("enrollments");

                e.HasKey(en => new { en.StudentId, en.SubjectId });     

                e.Property(en => en.StudentId)
                    .HasColumnName("student_id");

                e.Property(en => en.SubjectId)
                    .HasColumnName("subject_id");

                
                e.HasOne(en => en.Student)
                  .WithMany(st => st.Enrollments)
                  .HasForeignKey(en => en.StudentId)
                  .OnDelete(DeleteBehavior.Cascade);

                
                e.HasOne(en => en.Subject)
                  .WithMany(sb => sb.Enrollments)
                  .HasForeignKey(en => en.SubjectId)
                  .OnDelete(DeleteBehavior.Cascade);
            });

            
        }

    }
}
