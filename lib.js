let myLibrary = [];

// Setting up local storage
if (!localStorage.getItem("LibraryStorage"))
  localStorage.setItem("LibraryStorage", JSON.stringify([]));

document.addEventListener("DOMContentLoaded", () => {
  myLibrary = JSON.parse(localStorage.getItem("LibraryStorage"));
  bookAdd();
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Getting data from html form by ID. Creates new book, pushes it into the list and runs display function (bookAdd). Updates local storage

function addBookToLibrary(title, author, pages, read) {
  var title = document.getElementById("title").value;
  var author = document.getElementById("author").value;
  var pages = document.getElementById("pages").value;
  var read = document.getElementById("read").value;

  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  localStorage.setItem("LibraryStorage", JSON.stringify(myLibrary));
  bookAdd();
}

// Displays entries in myLibrary. Creates buttons to remove the book or change read property.

function bookAdd() {
  const library = document.querySelector("#lib2");
  library.innerHTML = "";
  for (const book of myLibrary) {
    let spasioc = myLibrary.indexOf(book);
    library.innerHTML += `<div class="book", class="${book.title}", value="${
      book.title
    }" >${book.title}</div>`;
    library.innerHTML += `<div class="book", class="${book.title}", value="${
      book.author
    }" >${book.author}</div>`;
    library.innerHTML += `<div class="book", class="${book.title}", value="${
      book.pages
    }" >${book.pages}</div>`;

    library.innerHTML += `<div class="book", class="book1" class="${
      book.title
    }",> <button class="bookbutton1" value=${spasioc} onclick="changeme(value)">${
      book.read
    }</button></div>`;

    library.innerHTML += `<div class="book" class="book1" class="${
      book.title
    }",> <button class="bookbutton2"value=${spasioc} onclick="remowe(value)"> remove</button></div>`;
  }
}
// Removes item from the list and reloads the list by calling bookAdd.
function remowe(n) {
  myLibrary.splice(n, 1);
  bookAdd();
  localStorage.setItem("LibraryStorage", JSON.stringify(myLibrary));
}

// Using button value to identify the book. Changes the value and pushes new book into the list.
let xyz;
function changeme(n) {
  xyz = myLibrary.splice(n, 1);
  if (xyz[0].read == "Read") {
    xyz[0].read = "Not read";
    myLibrary.push(xyz[0]);
    bookAdd();
    localStorage.setItem("LibraryStorage", JSON.stringify(myLibrary));
  } else {
    xyz[0].read = "Read";
    myLibrary.push(xyz[0]);
    bookAdd();
  }
}
