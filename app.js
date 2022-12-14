const awesomeBooks = document.getElementById('awesomeBooks');

class Book {
  constructor(awesomeBooks) {
    this.awesomeBooks = awesomeBooks;
    this.books = [];
  }

  updateLocalstorage() {
    localStorage.setItem('bokLibrarie', JSON.stringify(this.books));
  }

  remove(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.updateLocalstorage();
  }

  removeDom(element) {
    element.querySelectorAll('.btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const parent = e.target.parentNode;
        this.remove(parent.id);
        parent.remove();
      });
    });
  }

  render(book) {
    this.awesomeBooks.innerHTML += `
    <li id="${book.id}">
    <p><span>"${book.title}"</span> by <span>${book.author}</span>.</p>
    <button class="btn">Remove</button>
</li>
        `;
    this.removeDom(awesomeBooks);
  }

  add(book) {
    this.render(book);
    this.books.push(book);
    this.removeDom(awesomeBooks);
    this.updateLocalstorage();
  }
}

const library = new Book(awesomeBooks);

document.querySelector('form').onsubmit = (e) => {
  e.preventDefault();
  const error = document.getElementById('error');
  const { title, author } = e.target;
  if (title.value.length < 3 || author.value.length < 3) {
    error.innerHTML = 'input field should contain minimum of three characters!';
    setTimeout(() => {
      error.innerHTML = '';
    }, 3000);
  } else {
    error.innerHTML = '';
    library.add({
      id: Date.now().toString(),
      title: title.value,
      author: author.value,
    });
    e.target.title.value = '';
    e.target.author.value = '';
  }
};

if (localStorage.getItem('bokLibrarie')) {
  library.books = JSON.parse(localStorage.getItem('bokLibrarie'));
} else {
  localStorage.setItem('bokLibrarie', JSON.stringify([]));
}

const list = [
  {
    linkId: 'list',
    pageId: 'listpage',
  },
  {
    linkId: 'add-new',
    pageId: 'addpage',
  },
  {
    linkId: 'contact-page',
    pageId: 'contactpage',
  },
];

list.forEach((item, index) => {
  const link = document.getElementById(item.linkId);
  const page = document.getElementById(item.pageId);

  link.onclick = () => {
    if (index === 1) {
      link.style.color = 'rgb(241, 43, 43)';
      link.previousElementSibling.style.color = '#000';
      link.nextElementSibling.style.color = '#000';
      page.classList.remove('hiden');
      page.previousElementSibling.classList.add('hiden');
      page.nextElementSibling.classList.add('hiden');
    } else if (index === 0) {
      link.style.color = 'rgb(241, 43, 43)';
      link.nextElementSibling.style.color = '#000';
      link.nextElementSibling.nextElementSibling.style.color = '#000';
      page.classList.remove('hiden');
      page.nextElementSibling.classList.add('hiden');
      page.nextElementSibling.nextElementSibling.classList.add('hiden');
    } else {
      link.style.color = 'rgb(241, 43, 43)';
      link.previousElementSibling.style.color = '#000';
      link.previousElementSibling.previousElementSibling.style.color = '#000';
      page.classList.remove('hiden');
      page.previousElementSibling.classList.add('hiden');
      page.previousElementSibling.previousElementSibling.classList.add('hiden');
    }
  };
});

setInterval(() => {
  const date = document.querySelector('.date');
  const d = new Date();
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();
  const ampm = hour >= 12 ? 'pm' : 'am';

  date.innerHTML = `${month} ${day}th ${year}, ${hour}:${minute}:${second} ${ampm}`;
}, 1000);

library.books.forEach((book) => library.render(book));
