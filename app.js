const title = document.querySelector('#title');
const author = document.querySelector('#author');
const myButtton = document.querySelector('.add-button');
const list = document.querySelector('.container ul');
myButtton.addEventListener('click', () => {
  if(title.value || author.value !== '') {
   e.preventDefault();
    const myLi = document.createElement('li');
    myLi.innerHTML = title.value + ' by ' + author.value;
    list.appendChild(myLi);

    const mySpan = document.createElement('span');
    mySpan.innerHTML = 'X';
    myLi.appendChild(mySpan);
  }
  const close = document.querySelectorAll('span');
  for (let i = 0; i < close.length; i++) {
    close[i].addEventListener('click', () => {
  
      close[i].parentElement.remove();
    });
    }
  title.value = '';
    author.value = '';
});
