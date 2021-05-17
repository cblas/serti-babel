using System;
using System.Collections.Generic;

namespace serti.babel.data.Context
{
    public partial class Location
    {
        public int Id { get; set; }
        public string Shelf { get; set; }
        public string Room { get; set; }
        public string Bookseller { get; set; }
        public string Position { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
