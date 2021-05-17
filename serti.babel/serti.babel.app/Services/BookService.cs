using serti.babel.app.Models;
using serti.babel.data.Context;
using System;
using System.Collections.Generic;
using System.Linq;

namespace serti.babel.app.Services
{
    public class BookService
    {
        public static List<BookViewModel> Get()
        {
            using (var _dbContext = new serti_dbContext())
            {
                var books = _dbContext.Book.AsQueryable();

                var booksVm = books.Select(book => new BookViewModel
                {
                    Id = book.Id,
                    LocationViewModel = new LocationViewModel
                    {
                        Id = book.IdLocationNavigation.Id,
                        Shelf = book.IdLocationNavigation.Shelf,
                        Room = book.IdLocationNavigation.Room,
                        Bookseller = book.IdLocationNavigation.Bookseller,
                        Position = book.IdLocationNavigation.Position
                    },
                    VolumeNumber = book.VolumeNumber,
                    Title = book.VolumeNumber,
                }).ToList();

                return booksVm;
            }
        }

        public static bool Create(BookViewModel bookViewModel)
        {
            using (var _dbContext = new serti_dbContext())
            {
                var book = new Book()
                {
                    IdLocation = (int)bookViewModel.LocationViewModel.Id,
                    VolumeNumber = bookViewModel.VolumeNumber,
                    Title = bookViewModel.Title,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };

                _dbContext.Book.Add(book);
                return _dbContext.SaveChanges() > 0;
            }
        }

        public static bool Update(BookViewModel bookViewModel)
        {
            using (var _dbContext = new serti_dbContext())
            {
                var bookFiltered =
                        _dbContext.Book.FirstOrDefault(_book => _book.Id == bookViewModel.Id);

                if (bookFiltered == null)
                    return false;

                bookFiltered.VolumeNumber = bookViewModel.VolumeNumber;
                bookFiltered.Title = bookFiltered.Title;
                bookFiltered.UpdatedAt = DateTime.Now;

                return _dbContext.SaveChanges() > 0;
            }
        }

        public static bool Delete(int idBook)
        {
            using (var _dbContext = new serti_dbContext())
            {
                var bookFiltered =
                        _dbContext.Book.FirstOrDefault(_book => _book.Id == idBook);

                if (bookFiltered == null)
                    return false;

                _dbContext.Remove(bookFiltered);
                return _dbContext.SaveChanges() > 0;
            }
        }
    }
}
