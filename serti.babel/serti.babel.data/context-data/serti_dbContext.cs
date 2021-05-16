using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace serti.babel.data.context_data
{
    public partial class serti_dbContext : DbContext
    {
        public serti_dbContext()
        {
        }

        public serti_dbContext(DbContextOptions<serti_dbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Book> Book { get; set; }
        public virtual DbSet<Location> Location { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-AVAFUTS\\SQLEXPRESS; Database=serti_db; Integrated Security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.0-rtm-35687");

            modelBuilder.Entity<Book>(entity =>
            {
                entity.ToTable("book");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdLocation).HasColumnName("id_location");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("title")
                    .HasMaxLength(100);

                entity.Property(e => e.VolumeNumber)
                    .IsRequired()
                    .HasColumnName("volume_number")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.ToTable("location");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Bookseller)
                    .HasColumnName("bookseller")
                    .HasMaxLength(100);

                entity.Property(e => e.Position)
                    .HasColumnName("position")
                    .HasMaxLength(100);

                entity.Property(e => e.Room)
                    .HasColumnName("room")
                    .HasMaxLength(100);

                entity.Property(e => e.Shelf)
                    .HasColumnName("shelf")
                    .HasMaxLength(100);
            });
        }
    }
}
