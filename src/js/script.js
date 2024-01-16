document.addEventListener("DOMContentLoaded", function () {
    class Book {
      constructor(id, name, price, image, rating) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.rating = rating;
        this.details = {};
      }
  
      determineRatingBgc() {
        const rating = this.rating;
        if (rating < 6) {
          return "linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)";
        } else if (rating > 6 && rating <= 8) {
          return "linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)";
        } else if (rating > 8 && rating <= 9) {
          return "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)";
        } else {
          return "linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)";
        }
      }
    }
  
    class BookManager {
      constructor() {
        this.bookTemplate = document.getElementById("template-book").innerHTML;
        this.booksList = document.querySelector(".books-list");
        this.filtersForm = document.querySelector(".filters");
        this.favoriteBooks = [];
        this.filters = [];
      }
  
      handleFavoriteClick(event) {
        const clickedImage = event.target;
        const bookElement = clickedImage.closest(".book");
        const bookId = bookElement.getAttribute("data-id");
        const isBookFavorite = this.favoriteBooks.includes(bookId);
  
        if (isBookFavorite) {
          const index = this.favoriteBooks.indexOf(bookId);
          this.favoriteBooks.splice(index, 1);
        } else {
          this.favoriteBooks.push(bookId);
        }
  
        this.updateFavoriteClass(clickedImage, !isBookFavorite);
      }
  
      updateFavoriteClass(imageElement, isFavorite) {
        const bookElement = imageElement.closest(".book");
  
        if (isFavorite) {
          bookElement.classList.add("favorite");
        } else {
          bookElement.classList.remove("favorite");
        }
      }
  
      initActions() {
        const bookImages = document.querySelectorAll(".books-list .book__image");
  
        bookImages.forEach((bookImage) => {
          bookImage.addEventListener("dblclick", (event) => {
            event.preventDefault();
            const bookId = bookImage.getAttribute("data-id");
            const isBookFavorite = this.favoriteBooks.includes(bookId);
  
            if (!isBookFavorite) {
              bookImage.classList.add("favorite");
              this.favoriteBooks.push(bookId);
            } else {
              const index = this.favoriteBooks.indexOf(bookId);
              this.favoriteBooks.splice(index, 1);
              bookImage.classList.remove("favorite");
            }
          });
        });
      }
  
      renderBooks() {
        dataSource.books.forEach((bookData) => {
          const book = new Book(
            bookData.id,
            bookData.name,
            bookData.price,
            bookData.image,
            bookData.rating
          );
  
          const ratingBgc = book.determineRatingBgc();
          const ratingWidth = (book.rating / 10) * 100;
  
          const html = Handlebars.compile(this.bookTemplate)({
            name: book.name,
            price: book.price,
            image: book.image,
            id: book.id,
            ratingBgc: ratingBgc,
            ratingWidth: ratingWidth,
            rating: book.rating,
          });
  
          const bookElement = document.createElement("li");
          bookElement.classList.add("book");
          bookElement.setAttribute("data-id", book.id);
          bookElement.innerHTML = html;
          this.booksList.appendChild(bookElement);
        });
      }
  
      filterBooks() {
        dataSource.books.forEach((bookData) => {
          let shouldBeHidden = false;
  
          for (const filter of this.filters) {
            if (!bookData.details[filter]) {
              shouldBeHidden = true;
              break;
            }
          }
  
          const bookImage = document.querySelector(
            `.book__image[data-id="${bookData.id}"]`
          );
  
          if (shouldBeHidden) {
            bookImage.classList.add("hidden");
          } else {
            bookImage.classList.remove("hidden");
          }
        });
      }
  
      setupEventListeners() {
        this.booksList.addEventListener("click", (event) => {
          if (event.target.classList.contains("book__image")) {
            this.handleFavoriteClick(event);
          }
        });
  
        this.filtersForm.addEventListener("change", (event) => {
          if (
            event.target.tagName === "INPUT" &&
            event.target.type === "checkbox" &&
            event.target.name === "filter"
          ) {
            const filterValue = event.target.value;
  
            if (event.target.checked) {
              this.filters.push(filterValue);
            } else {
              const index = this.filters.indexOf(filterValue);
              this.filters.splice(index, 1);
            }
  
            this.filterBooks();
          }
        });
      }
    }
  
    const bookManager = new BookManager();
    bookManager.renderBooks();
    bookManager.initActions();
    bookManager.setupEventListeners();
  });
