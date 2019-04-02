//models
const libraryModel = (function() {
  class StorageData {
    persistData() {
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    }
    readStorage() {
      const storage = JSON.parse(localStorage.getItem("myLibrary"));
      if (storage) myLibrary = storage;
    }
  }

  function Book(title, author, pages, id, read = true) {
    // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = id;
    this.read = read;
  }

  let myLibrary = [];

  const storage = new StorageData();
  return {
    addBook: (title, author, page, read) => {
      read == "Read" ? (read = true) : (read = false);

      let id, newItem;
      //create id
      if (myLibrary.length > 0) {
        id = myLibrary[myLibrary.length - 1].id + 1;
      } else {
        id = 0;
      }
      newItem = new Book(title, author, page, id, read);
      //create new book & push into book array
      myLibrary.push(newItem);
      //save to local storage
      storage.persistData();
      //return newly created book for rendering.
      return newItem;
    },
    deleteBook: id => {
      //find index
      const index = myLibrary.findIndex(el => el.id == id);
      //delete
      myLibrary.splice(index, 1);
      //save to localStorage
      storage.persistData();
    },
    toggleRead: id => {
      //find book using id
      const book = myLibrary.find(el => el.id == id);
      //set read to either false or true.
      book.read ? (book.read = false) : (book.read = true);
      //save to localStorage
      storage.persistData();
      //return book
      return book;
    },
    storageSystem: () => {
      return storage;
    },
    library: () => {
      return myLibrary;
    }
  };
})();

//view
const libraryView = (function() {
  const domStrings = {
    title: document.getElementById("title"),
    author: document.getElementById("author"),
    pages: document.getElementById("pages"),
    read: document.getElementById("read"),
    btn: document.querySelector(".btn"),
    remove: document.getElementById("remove"),
    content: document.querySelector("#lib3")
  };

  return {
    render: book => {
      //prepare html to be rendered with all info.
      const load = ` <div id="lib2"><div class="book", class="${
        book.title
      }", value="${book.title}" data-itemid=${book.id}>${
        book.title
      }</div> <div class="book", class="${book.title}", value="${
        book.author
      }" >${book.author}</div> <div class="book", class="${
        book.title
      }", value="${book.pages}" >${
        book.pages
      }</div><div class="book", class="book1" class="${
        book.title
      }"> <button class='${
        book.read ? "bookbutton1" : "bookbutton3"
      } dane' data-itemid=${book.id}>${
        book.read ? "read" : "not read"
      }</button></div> <div class="book" class="book1" class="${
        book.title
      }"> <button class="bookbutton2 islam" data-itemid=${
        book.id
      } > remove</button></div> </div>`;
      //render html
      domStrings.content.insertAdjacentHTML("beforeend", load);
    },
    updateRead: book => {
      //select clicked HTML
      const clickedBook = document.querySelector(
        `button[data-itemid='${book.id}']`
      );
      //update UI colors
      clickedBook.classList.toggle("bookbutton1");
      clickedBook.classList.toggle("bookbutton3");

      //update UI text
      clickedBook.textContent = book.read ? "read" : "not read";
    },
    clearField: () => {
      //select all fields
      const allFields = Array.from(document.querySelectorAll("input"));
      //loop over all node items and clear content.
      allFields.forEach(el => (el.value = ""));
    },
    remove: el => {
      //select target element & remove climb 5x levels
      el.parentElement.removeChild(el);
    },
    domS: () => {
      return domStrings;
    },
    getInput: () => {
      return {
        author: domStrings.author.value,
        title: domStrings.title.value,
        pages: domStrings.pages.value,
        read: domStrings.read.value
      };
    }
  };
})();

//Controller

const libraryControl = (function(libModel, libView) {
  //import DOM selectors
  const DOM = libView.domS();

  function setEventListener() {
    //add listener to button
    DOM.btn.addEventListener("click", addItem);
    DOM.content.addEventListener("click", deleteItem);
    DOM.content.addEventListener("click", updateStatus);
  }
  //add to Library & render to UI
  function addItem(e) {
    e.preventDefault();
    const input = libView.getInput();
    if (!input.title == "" && !input.author == "" && input.pages > 0) {
      //Add to Library
      const newBook = libModel.addBook(
        input.title,
        input.author,
        input.pages,
        input.read
      );
      //render to UI
      libView.render(newBook);
      //clearfields
      libView.clearField();
    } else {
      alert("All input fields need to be filled.");
    }
  }

  //remove from Lib & UI
  function deleteItem(e) {
    if (e.target.matches(".islam")) {
      //capture
      const htmlBook = e.target.closest(".islam").parentElement.parentElement;
      const bookID = parseInt(e.target.closest(".islam").dataset.itemid, 10);
      //delete from lib
      libModel.deleteBook(bookID);
      //delete from ui
      libView.remove(htmlBook);
    }
  }
  //update read status
  function updateStatus(e) {
    if (e.target.matches(".dane")) {
      //capture id
      const bookID = parseInt(e.target.closest(".dane").dataset.itemid, 10);
      //update library
      const book = libModel.toggleRead(bookID);
      //update ui
      libView.updateRead(book);
    }
  }

  return {
    init: () => {
      setEventListener();
    },
    restore: () => {
      const libStorage = libModel.storageSystem();
      libStorage.readStorage();
      const arrLib = libModel.library();

      if (arrLib.length > 0) {
        arrLib.forEach(el => {
          libView.render(el);
        });
      }
    }
  };
})(libraryModel, libraryView);

libraryControl.init();
libraryControl.restore();
