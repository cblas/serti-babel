using System;
using System.Collections.Generic;

namespace serti.babel.data.context_data
{
    public partial class Book
    {
        public int Id { get; set; }
        public int IdLocation { get; set; }
        public string VolumeNumber { get; set; }
        public string Title { get; set; }
    }
}
