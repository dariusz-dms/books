document.addEventListener("DOMContentLoaded", function () {
    const bookTemplate = document.getElementById("template-book").innerHTML;
    const booksList = document.querySelector(".books-list");
    const filtersForm = document.querySelector(".filters");
    const favoriteBooks = [];
    const filters = [];
  
    function handleFavoriteClick(event) {
      const clickedImage = event.target;
      const bookElement = clickedImage.closest(".book");
      const bookId = bookElement.getAttribute("data-id");
      const isBookFavorite = favoriteBooks.includes(bookId);
  
      if (isBookFavorite) {
        const index = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(index, 1);
      } else {
        favoriteBooks.push(bookId);
      }
  
      updateFavoriteClass(clickedImage, !isBookFavorite);
    }
  
    booksList.addEventListener("click", function (event) {
      if (event.target.classList.contains("book__image")) {
        handleFavoriteClick(event);
      }
    });
  
    function updateFavoriteClass(imageElement, isFavorite) {
      const bookElement = imageElement.closest(".book");
  
      if (isFavorite) {
        bookElement.classList.add("favorite");
      } else {
        bookElement.classList.remove("favorite");
      }
    }
  
    function initActions() {
      const bookImages = document.querySelectorAll(".books-list .book__image");
  
      bookImages.forEach(bookImage => {
        bookImage.addEventListener("dblclick", function (event) {
          event.preventDefault();
          const bookId = this.getAttribute("data-id");
          const isBookFavorite = favoriteBooks.includes(bookId);
  
          if (!isBookFavorite) {
            this.classList.add("favorite");
            favoriteBooks.push(bookId);
          } else {
            const index = favoriteBooks.indexOf(bookId);
            favoriteBooks.splice(index, 1);
            this.classList.remove("favorite");
          }
        });
      });
    }
  
    function renderBooks() {
      dataSource.books.forEach(book => {
        const html = Handlebars.compile(bookTemplate)(book);
        const bookElement = document.createElement("li");
        bookElement.classList.add("book");
        bookElement.setAttribute("data-id", book.id);
        bookElement.innerHTML = html;
        booksList.appendChild(bookElement);
      });
    }
  
    function filterBooks() {
      const bookImages = document.querySelectorAll(".books-list .book__image");
  
      dataSource.books.forEach(book => {
        let shouldBeHidden = false;
  
        for (const filter of filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
  
        const bookImage = document.querySelector(`.book__image[data-id="${book.id}"]`);
  
        if (shouldBeHidden) {
          bookImage.classList.add("hidden");
        } else {
          bookImage.classList.remove("hidden");
        }
      });
    }
  
    filtersForm.addEventListener("change", function (event) {
      if (event.target.tagName === "INPUT" && event.target.type === "checkbox" && event.target.name === "filter") {
        const filterValue = event.target.value;
  
        if (event.target.checked) {
          filters.push(filterValue);
        } else {
          const index = filters.indexOf(filterValue);
          filters.splice(index, 1);
        }
  
        filterBooks();
      }
    });
  
    renderBooks();
    initActions();
  });
