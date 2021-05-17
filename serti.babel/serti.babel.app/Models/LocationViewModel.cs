using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serti.babel.app.Models
{
    public class LocationViewModel
    {
        public int? Id { get; set; }
        public string Shelf { get; set; }
        public string Room { get; set; }
        public string Bookseller { get; set; }
        public string Position { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
