using System;
using System.Collections.Generic;

namespace serti.babel.data.Context
{
    public partial class Book
    {
        public int Id { get; set; }
        public int IdLocation { get; set; }
        public string VolumeNumber { get; set; }
        public string Title { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
