// Przykładowe importy, dostosuj je do swojego projektu
import Handlebars from 'handlebars';
import bookTemplate from './path/to/bookTemplate.hbs';

class BooksList {
  constructor() {
    // Inicjalizacja danych
    this.initData();

    // Inicjalizacja elementów DOM
    this.getElements();

    // Inicjalizacja nasłuchiwaczy zdarzeń
    this.initActions();

    // Renderowanie książek
    this.renderBooks();
  }

  initData() {
    // Inicjalizacja danych
    this.data = dataSource.books; // Upewnij się, że dataSource.books jest zdefiniowane
    this.favoriteBooks = [];
    this.filters = [];
  }

  getElements() {
    // Referencje do elementów DOM
    this.booksList = document.querySelector('.books-list');
    this.filtersForm = document.querySelector('.filters form');
  }

  initActions() {
    // Dodanie nasłuchiwacza dla całej listy .books-list
    this.booksList.addEventListener('click', this.handleBookClick.bind(this));

    // Dodanie nasłuchiwacza dla formularza
    this.filtersForm.addEventListener('click', this.handleFilterClick.bind(this));
  }

  handleBookClick(event) {
    // Obsługa kliknięcia na książkę
    const bookImage = event.target.closest('.book__image');
    if (bookImage) {
      const bookId = bookImage.getAttribute('data-id');
      const isBookFavorite = this.favoriteBooks.includes(bookId);

      if (!isBookFavorite) {
        bookImage.classList.add('favorite');
        this.favoriteBooks.push(bookId);
      } else {
        const index = this.favoriteBooks.indexOf(bookId);
        this.favoriteBooks.splice(index, 1);
        bookImage.classList.remove('favorite');
      }

      // Filtruj książki po zmianie w ulubionych
      this.filterBooks();
    }
  }

  handleFilterClick(event) {
    // Obsługa kliknięcia w checkbox w formularzu
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
      const filterValue = event.target.value;

      if (event.target.checked) {
        if (!this.filters.includes(filterValue)) {
          this.filters.push(filterValue);
        }
      } else {
        const index = this.filters.indexOf(filterValue);
        if (index !== -1) {
          this.filters.splice(index, 1);
        }
      }

      // Aktualizacja wybranych filtrów
      console.log(this.filters);

      // Filtruj książki po zmianie w filtrach
      this.filterBooks();
    }
  }

  filterBooks() {
    // Filtracja książek
    for (const book of this.data) {
      let shouldBeHidden = false;

      for (const filter of this.filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      const bookImage = this.booksList.querySelector(`.book__image[data-id="${book.id}"]`);

      if (bookImage) {
        if (shouldBeHidden) {
          bookImage.classList.add('hidden');
        } else {
          bookImage.classList.remove('hidden');
        }
      }
    }
  }

  renderBooks() {
    // Renderowanie książek
    this.data.forEach(book => {
      const html = Handlebars.compile(bookTemplate)(book);
      const bookElement = document.createElement('li');
      bookElement.classList.add('book');
      bookElement.innerHTML = html;
      this.booksList.appendChild(bookElement);
    });
  }
}

// Inicjalizacja aplikacji
const app = new BooksList();
