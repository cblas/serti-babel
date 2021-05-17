using System;

namespace serti.babel.app.Models
{
    public class BookViewModel
    {
        public int? Id { get; set; }
        public LocationViewModel LocationViewModel { get; set; }
        public string VolumeNumber { get; set; }
        public string Title { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
