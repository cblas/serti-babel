using Microsoft.EntityFrameworkCore;
using serti.babel.app.Models;
using serti.babel.data.Context;
using System;
using System.Collections.Generic;
using System.Linq;

namespace serti.babel.app.Services.Location
{
    public class LocationService
    {
        public static List<LocationViewModel> Get()
        {
            using (var _dbContext = new serti_dbContext())
            {
                var locations = _dbContext.Location.AsQueryable();

                //if(filter != null)
                //{
                //    if (filter.Id != null)
                //        locations = locations.Where(location => location.Id == filter.Id);
                //}

                var locationsVm = locations.Select(location => new LocationViewModel
                {
                    Id = location.Id,
                    Shelf = location.Shelf,
                    Room = location.Room,
                    Bookseller = location.Bookseller,
                    Position = location.Position
                }).ToList();

                return locationsVm;
            }
        }

        public static bool Create(LocationViewModel locationViewModel)
        {
            using (var _dbContext = new serti_dbContext())
            {
                var location = new Location()
                {
                    Id = locationViewModel.Id,
                    Shelf = locationViewModel.Shelf,
                    Room = locationViewModel.Room,
                    Bookseller = locationViewModel.Bookseller,
                    Position = locationViewModel.Position,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };

                _dbContext.Add(location);
                return _dbContext.SaveChanges() > 0;
            }
        }

        public static bool Update(LocationViewModel locationViewModel)
        {
            using (var _dbContext = new serti_dbContext())
            {
                var locationFiltered =
                        _dbContext.Location.FirstOrDefault(_location => _location.Id == locationViewModel.Id);

                if (locationFiltered == null)
                    return false;

                locationFiltered.Shelf = locationViewModel.Shelf;
                locationFiltered.Room = locationViewModel.Room;
                locationFiltered.Bookseller = locationViewModel.Bookseller;
                locationFiltered.Position = locationViewModel.Position;
                locationFiltered.UpdatedAt = DateTime.Now;

                return _dbContext.SaveChanges() > 0;
            }
        }

        public static bool Delete(int idLocation)
        {
            using (var _dbContext = new serti_dbContext())
            {
                var locationFiltered =
                        _dbContext.Location.FirstOrDefault(_location => _location.Id == idLocation);

                if (locationFiltered == null)
                    return false;

                _dbContext.Remove(locationFiltered);
                return _dbContext.SaveChanges() > 0;
            }
        }
    }
}
