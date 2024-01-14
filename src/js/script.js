// Referencje do szablonu i listy
const bookTemplate = document.getElementById("template-book").innerHTML;
const booksList = document.querySelector(".books-list");

// Inicjalizacja tablicy ulubionych książek
const favoriteBooks = [];

// Funkcja obsługująca dodawanie do ulubionych po dwukrotnym kliknięciu
function handleFavoriteClick(event) {
  const clickedImage = event.target;
  const bookElement = clickedImage.closest(".book"); // Znajdowanie najbliższego rodzica z klasą 'book'
  const bookId = bookElement.getAttribute("data-id");

  // Sprawdzenie, czy książka jest już ulubiona
  const isBookFavorite = favoriteBooks.includes(bookId);

  // Dodawanie/Usuwanie z ulubionych w zależności od statusu
  if (isBookFavorite) {
    // Usunięcie z ulubionych
    const index = favoriteBooks.indexOf(bookId);
    favoriteBooks.splice(index, 1);
  } else {
    // Dodanie do ulubionych
    favoriteBooks.push(bookId);
  }

  // Aktualizacja klasy favorite na obrazku książki
  clickedImage.classList.toggle("favorite", !isBookFavorite);
}

// Dodanie nasłuchiwacza zdarzeń dla dwukrotnego kliknięcia na obrazek książki
booksList.addEventListener("dblclick", event => {
  if (event.target.classList.contains("book__image")) {
    handleFavoriteClick(event);
  }
});

// Funkcja inicjalizująca jednokrotne nasłuchiwacze zdarzeń dla całej listy
function initActions() {
  // Referencja do listy wszystkich elementów .book__image w liście .booksList
  const bookImages = document.querySelectorAll(".books-list .book__image");

  // Przejście po każdym elemencie z listy
  bookImages.forEach(bookImage => {
    // Dodanie nasłuchiwacza
    bookImage.addEventListener("dblclick", function (event) {
      // Zatrzymanie domyślnego zachowania przeglądarki
      event.preventDefault();

      // Pobranie identyfikatora książki z data-id
      const bookId = this.getAttribute("data-id");

      // Sprawdzenie, czy książka jest już w ulubionych
      const isBookFavorite = favoriteBooks.includes(bookId);

      // Jeśli książka nie jest w ulubionych
      if (!isBookFavorite) {
        // Dodanie klasy favorite
        this.classList.add("favorite");

        // Dodanie identyfikatora do favoriteBooks
        favoriteBooks.push(bookId);
      } else {
        // Usunięcie z ulubionych
        const index = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(index, 1);

        // Usunięcie klasy favorite
        this.classList.remove("favorite");
      }
    });
  });
}

// Funkcja renderująca książki
function renderBooks() {
  dataSource.books.forEach(book => {
    // Generowanie kodu HTML na podstawie szablonu i danych książki
    const html = Handlebars.compile(bookTemplate)(book);

    // Tworzenie elementu DOM z wygenerowanego HTML
    const bookElement = document.createElement("li");
    bookElement.classList.add("book");
    bookElement.setAttribute("data-id", book.id); // Dodanie atrybutu z identyfikatorem książki
    bookElement.innerHTML = html;

    // Dodawanie nowego elementu do listy .books-list
    booksList.appendChild(bookElement);
  });
}

// Wywołanie funkcji renderującej
renderBooks();

// Inicjalizacja nasłuchiwaczy zdarzeń
initActions();
