import type { Book } from '../models/Book';
import type { User } from '../models/User';
import type { Library } from './Library';

export namespace BorrowService {
  export function borrowBook(
    bookId: string, 
    userId: string, 
    booksDb: Library<Book>, 
    usersDb: Library<User>
  ): { success: boolean; message: string } {
    
    const book = booksDb.findById(bookId);
    const user = usersDb.findById(userId);

    if (!book) return { success: false, message: 'Книгу не знайдено.' };
    if (!user) return { success: false, message: 'Користувача не знайдено.' };
    
    if (book.isBorrowed) {
      return { success: false, message: 'Ця книга вже позичена.' };
    }

    if (user.borrowedBooks.length >= 3) {
      return { success: false, message: 'Користувач вже досяг ліміту (3 книги).' };
    }

    book.isBorrowed = true;
    user.borrowBook(bookId);

    return { success: true, message: `Книгу успішно позичено користувачем ${user.name}.` };
  }

  export function returnBook(
    bookId: string, 
    userId: string, 
    booksDb: Library<Book>, 
    usersDb: Library<User>
  ): { success: boolean; message: string } {
    
    const book = booksDb.findById(bookId);
    const user = usersDb.findById(userId);

    if (!book) return { success: false, message: 'Книгу не знайдено.' };
    if (!user) return { success: false, message: 'Користувача не знайдено.' };

    book.isBorrowed = false;
    user.returnBook(bookId);

    return { success: true, message: 'Книгу успішно повернуто.' };
  }
}