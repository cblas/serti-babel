using System;
using System.Collections.Generic;

namespace serti.babel.data.context_data
{
    public partial class Location
    {
        public int Id { get; set; }
        public string Shelf { get; set; }
        public string Room { get; set; }
        public string Bookseller { get; set; }
        public string Position { get; set; }
    }
}
