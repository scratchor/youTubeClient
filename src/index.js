// eslint-disable-next-line no-unused-vars
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
// eslint-disable-next-line no-unused-vars
import style from './main.css';
// eslint-disable-next-line no-unused-vars
import { get, nextPageToken } from './fetch.js';

document.addEventListener('DOMContentLoaded', build);
// eslint-disable-next-line import/no-mutable-exports
let {
  innerWidth,
  prevLiAmountAtCurrentPage,
  currentPage,
  prevLeftItem,
  button1,
  button4,
  btn1Num,
  touchstart,
  uploadVideos,
  viewedLi,
  inputValue,
} = {
  innerWidth: window.innerWidth,
  prevLiAmountAtCurrentPage: Math.floor(document.documentElement.clientWidth / 300) || 1,
  currentPage: 1,
  prevLeftItem: 1,
  button1: 1,
  button4: 4,
  btn1Num: 1,
  touchstart: 0,
  uploadVideos: 15,
  // eslint-disable-next-line no-use-before-define
  viewedLi: currentPage * prevLiAmountAtCurrentPage / uploadVideos,
  nextPageToken: null,
  inputValue: undefined,
};

function build() {
  const header = document.createElement('HEADER');
  document.body.appendChild(header);
  const divInput = document.createElement('div');
  divInput.classList.add('input_wrapper');
  const i = document.createElement('i');
  i.classList.add('fas');
  i.classList.add('fa-search');
  i.classList.add('search_img');
  i.classList.add('fa-2x');
  const input = document.createElement('input');
  input.classList.add('input');
  input.setAttribute('type', 'search');
  input.setAttribute('placeholder', 'What video you are looking for?');
  input.setAttribute('size', '80');
  input.required = true;
  divInput.appendChild(i);
  divInput.appendChild(input);
  header.appendChild(divInput);
  const main = document.createElement('main');
  document.body.appendChild(main);
  const divItems = document.createElement('div');
  divItems.classList.add('items_wrapper');
  const ul = document.createElement('ul');
  ul.classList.add('ul_wrapper');
  divItems.appendChild(ul);
  main.appendChild(divItems);
  const footer = document.createElement('footer');
  document.body.appendChild(footer);
  const divButton = document.createElement('div');
  divButton.classList.add('button_wrapper');
  const chevronLeft = document.createElement('i');
  chevronLeft.classList.add('fas');
  chevronLeft.classList.add('fa-chevron-left');
  chevronLeft.classList.add('fa-3x');
  chevronLeft.classList.add('chevron');
  // eslint-disable-next-line no-shadow
  const button1 = document.createElement('div');
  const tooltip1 = document.createElement('span');
  tooltip1.classList.add('tooltiptext');
  button1.classList.add('button');
  button1.classList.add('number');
  button1.textContent = '1';
  tooltip1.textContent = `Page ${button1.textContent}`;
  button1.setAttribute('id', 'btn1');
  const button2 = document.createElement('div');
  const tooltip2 = document.createElement('span');
  tooltip2.classList.add('tooltiptext');
  button2.classList.add('button');
  button2.textContent = '2';
  tooltip2.textContent = `Page ${button2.textContent}`;
  button2.setAttribute('id', 'btn2');
  const button3 = document.createElement('div');
  const tooltip3 = document.createElement('span');
  tooltip3.classList.add('tooltiptext');
  button3.classList.add('button');
  button3.textContent = '3';
  tooltip3.textContent = `Page ${button3.textContent}`;
  button3.setAttribute('id', 'btn3');
  // eslint-disable-next-line no-shadow
  const button4 = document.createElement('div');
  const tooltip4 = document.createElement('span');
  tooltip4.classList.add('tooltiptext');
  button4.classList.add('button');
  button4.textContent = '4';
  tooltip4.textContent = `Page ${button4.textContent}`;
  button4.setAttribute('id', 'btn4');
  const chevronRight = document.createElement('i');
  chevronRight.classList.add('fas');
  chevronRight.classList.add('fa-chevron-right');
  chevronRight.classList.add('fa-3x');
  chevronRight.classList.add('chevron');
  divButton.appendChild(chevronLeft);
  divButton.appendChild(button1);
  button1.appendChild(tooltip1);
  divButton.appendChild(button2);
  button2.appendChild(tooltip2);
  divButton.appendChild(button3);
  button3.appendChild(tooltip3);
  divButton.appendChild(button4);
  button4.appendChild(tooltip4);
  divButton.appendChild(chevronRight);
  footer.appendChild(divButton);
  tippy(chevronLeft, {
    content: 'Previous four pages',
    delay: 100,
    arrow: true,
    arrowType: 'round',
    size: 'large',
    duration: 500,
    animation: 'scale',
    multiple: true,
  });
  tippy(chevronRight, {
    content: 'Next four pages',
    delay: 100,
    arrow: true,
    arrowType: 'round',
    size: 'large',
    duration: 500,
    animation: 'scale',
    multiple: true,
  });
  window.addEventListener('resize', (() => (Math.abs(window.innerWidth !== innerWidth) ? window.requestAnimationFrame(calcSize) : false)));
  i.addEventListener('click', startSearch);
  i.addEventListener('mousedown', (e => e.preventDefault()));
  divButton.addEventListener('mousedown', (e => e.preventDefault()));
  input.addEventListener('keyup', (e => (e.keyCode === 13 ? startSearch(e) : false)));
  ul.addEventListener('touchstart', ((e) => { touchstart = e.changedTouches[0].pageX; }));
  ul.addEventListener('touchend', Calctouch);
  divButton.addEventListener('contextmenu', (e => e.preventDefault()));
  chevronLeft.addEventListener('mouseup', leftChevronHandlerl);
  button1.addEventListener('mouseup', button1Handler);
  button2.addEventListener('mouseup', button2Handler);
  button3.addEventListener('mouseup', button3Handler);
  button4.addEventListener('mouseup', button4Handler);
  chevronRight.addEventListener('mouseup', rightChevronHandlerl);
}


function button1Handler() {
  const x = document.documentElement.clientWidth;
  document.querySelector('.ul_wrapper').scrollLeft = x * `${btn1Num - 1}`;
  const elemWithNumber = document.querySelector('.number');
  const btn1 = document.querySelector('.button');
  elemWithNumber.classList.remove('number');
  btn1.classList.add('number');
  checkUpload(btn1);
  animateLi();
}

function button2Handler() {
  const x = document.documentElement.clientWidth;
  document.querySelector('.ul_wrapper').scrollLeft = x * `${btn1Num - 1 + 1}`;
  const elemWithNumber = document.querySelector('.number');
  const btn2 = document.querySelectorAll('.button')[1];
  elemWithNumber.classList.remove('number');
  btn2.classList.add('number');
  checkUpload(btn2);
  animateLi();
}

function button3Handler() {
  const x = document.documentElement.clientWidth;
  document.querySelector('.ul_wrapper').scrollLeft = x * `${btn1Num - 1 + 2}`;
  const elemWithNumber = document.querySelector('.number');
  const btn3 = document.querySelectorAll('.button')[2];
  elemWithNumber.classList.remove('number');
  btn3.classList.add('number');
  checkUpload(btn3);
  animateLi();
}

function button4Handler() {
  const x = document.documentElement.clientWidth;
  document.querySelector('.ul_wrapper').scrollLeft = x * `${btn1Num - 1 + 3}`;
  const elemWithNumber = document.querySelector('.number');
  const btn4 = document.querySelectorAll('.button')[3];
  elemWithNumber.classList.remove('number');
  btn4.classList.add('number');
  checkUpload(btn4);
  animateLi();
}

function rightChevronHandlerl() {
  const x = document.documentElement.clientWidth;
  const elemWithNumber = document.querySelector('.number');
  nextAllPage();
  document.querySelector('.ul_wrapper').scrollLeft += 4 * x;
  checkUpload(elemWithNumber);
  animateLi();
}

function leftChevronHandlerl() {
  if (button1 === 1) {
    return;
  }
  const x = document.documentElement.clientWidth;
  const elemWithNumber = document.querySelector('.number');
  backAllPage();
  document.querySelector('.ul_wrapper').scrollLeft -= 4 * x;
  checkUpload(elemWithNumber);
  animateLi();
}

function startSearch() {
  const input = document.querySelector('.input');
  if (inputValue === `${input.value}`) {
    let n = 0;
    while (n <= 14) {
      createLi();
      n += 1;
    }
    get(`${input.value}`, nextPageToken, uploadLi, uploadVideos);
  } else {
    const items = document.querySelectorAll('.item');
    const ul = document.querySelector('.ul_wrapper');
    items.forEach(e => ul.removeChild(e));
    // eslint-disable-next-line prefer-destructuring
    innerWidth = window.innerWidth;
    prevLiAmountAtCurrentPage = Math.floor(document.documentElement.clientWidth / 300) || 1;
    currentPage = 1;
    prevLeftItem = 1;
    button1 = 1;
    button4 = 4;
    btn1Num = 1;
    touchstart = 0;
    uploadVideos = 15;
    // eslint-disable-next-line no-use-before-define
    viewedLi = currentPage * prevLiAmountAtCurrentPage / uploadVideos;
    inputValue = `${input.value}`;
    let n = 0;
    while (n <= 14) {
      createLi();
      n += 1;
    }
    const buttons = document.querySelectorAll('.button');
    buttons.forEach((e, i) => e.childNodes[0].textContent = i + 1);
    buttons.forEach(e => e.setAttribute('id', `btn${e.childNodes[0].textContent}`));
    btn1Num = document.querySelector('.button').childNodes[0].textContent;
    const toolTips = document.querySelectorAll('.tooltiptext');
    toolTips.forEach((e, i) => e.textContent = `Page ${+buttons[i].childNodes[0].textContent}`);
    get(`${input.value}`, '', uploadLi, uploadVideos);
  }
}

function Calctouch(e) {
  const distance = e.changedTouches[0].pageX - touchstart;
  if (Math.abs(distance) > 30) {
    if (distance < 0) {
      nextPage();
    } else {
      prevPage();
    }
  }
}

function nextPage() {
  const elemWithNumber = document.querySelector('.number');
  const buttons = document.querySelectorAll('.button');
  const nextPageNum = +elemWithNumber.childNodes[0].textContent + 1; // here
  if (elemWithNumber === buttons[3]) {
    nextAllPage();
  }
  const nextButton = document.getElementById(`btn${nextPageNum}`);
  const x = document.documentElement.clientWidth;
  elemWithNumber.classList.remove('number');
  document.querySelector('.ul_wrapper').scrollLeft += x;
  nextButton.classList.add('number');
  checkUpload(nextButton);
  animateLi();
}

function prevPage() {
  const elemWithNumber = document.querySelector('.number');
  const buttons = document.querySelectorAll('.button');
  const prevPageNum = +elemWithNumber.childNodes[0].textContent - 1;
  if (elemWithNumber === buttons[0] && document.querySelector('.ul_wrapper').scrollLeft !== 0) {
    backAllPage();
  } else if (document.querySelector('.ul_wrapper').scrollLeft === 0) {
    return;
  }
  const prevButton = document.getElementById(`btn${prevPageNum}`);
  const x = document.documentElement.clientWidth;
  elemWithNumber.classList.remove('number');
  document.querySelector('.ul_wrapper').scrollLeft -= x;
  prevButton.classList.add('number');
  prevLeftItem = ((prevButton.childNodes[0].textContent - 1) * prevLiAmountAtCurrentPage + 1);
  currentPage = +prevButton.childNodes[0].textContent;
  animateLi();
}

function calcSize() {
  ({ innerWidth } = { innerWidth: window.innerWidth });
  const x = document.documentElement.clientWidth;
  if (x < 300) {
    const elems = document.querySelectorAll('.item');
    elems.forEach(e => e.style.width = '300px');
    elems.forEach(e => e.style.margin = '0');
    return;
  }
  let itemNumber = Math.floor(x / 300) || 1;
  let Allmargin = x - itemNumber * 300;
  if (Allmargin <= 30) {
    itemNumber = itemNumber - 1 || 1;
    Allmargin = x - itemNumber * 300;
  }
  let margin = Allmargin / (itemNumber * 2);
  if (margin < 0) {
    margin = 0;
  }
  const currentPageNumber = Math.ceil(prevLeftItem / itemNumber) || 1;
  if (currentPageNumber > button4) {
    do {
      nextAllPage();
    } while (currentPageNumber > button4);
  } else if (currentPageNumber < button1) {
    do {
      backAllPage();
    } while (currentPageNumber < button1);
  }
  const elems = document.querySelectorAll('.item');
  elems.forEach(e => e.style.width = '300px');
  elems.forEach(e => e.style.margin = `0 ${margin}px`);
  document.querySelector('.items_wrapper').style.height = 'auto';
  const elemWithNumber = document.querySelector('.number');
  elemWithNumber.classList.remove('number');
  const pageNum = document.getElementById(`btn${currentPageNumber}`);
  pageNum.classList.add('number');
  document.querySelector('.ul_wrapper').scrollLeft = x * (currentPageNumber - 1);
  prevLiAmountAtCurrentPage = itemNumber;
  const prevPageNumber = +document.querySelector('.number').childNodes[0].textContent - 1;
  prevLeftItem = prevPageNumber * prevLiAmountAtCurrentPage + 1;
  currentPage = +pageNum.childNodes[0].textContent;
  viewedLi = currentPage * prevLiAmountAtCurrentPage / uploadVideos;
  animateLi();
  if (viewedLi >= 0.5) {
    startSearch();
    uploadVideos += 15;
  }
}

function nextAllPage() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(e => e.childNodes[0].textContent = +e.childNodes[0].textContent + 4);
  buttons.forEach(e => e.setAttribute('id', `btn${e.childNodes[0].textContent}`));
  btn1Num = document.querySelector('.button').childNodes[0].textContent;
  const toolTips = document.querySelectorAll('.tooltiptext');
  toolTips.forEach((e, i) => e.textContent = `Page ${+buttons[i].childNodes[0].textContent}`);
  button1 += 4;
  button4 += 4;
  animateLi();
}

function backAllPage() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(e => e.childNodes[0].textContent = +e.childNodes[0].textContent - 4);
  buttons.forEach(e => e.setAttribute('id', `btn${e.childNodes[0].textContent}`));
  btn1Num = document.querySelector('.button').childNodes[0].textContent;
  const toolTips = document.querySelectorAll('.tooltiptext');
  toolTips.forEach((e, i) => e.textContent = `Page ${+buttons[i].childNodes[0].textContent}`);
  button1 -= 4;
  button4 -= 4;
  animateLi();
}

function createLi() {
  const ul = document.querySelector('.ul_wrapper');
  const li = document.createElement('li');
  li.classList.add('item');
  const img = document.createElement('img');
  img.style.width = '100%';
  img.style.height = '180px';
  img.setAttribute('src', '');
  img.setAttribute('alt', 'Foto from YouTube');
  const title = document.createElement('p');
  const a = document.createElement('a');
  title.classList.add('title');
  title.appendChild(a);
  li.appendChild(img);
  li.appendChild(title);
  const divAuthor = document.createElement('div');
  divAuthor.classList.add('author');
  divAuthor.classList.add('clip_info');
  const iMen = document.createElement('i');
  iMen.classList.add('fas');
  iMen.classList.add('fa-male');
  iMen.classList.add('fa-2x');
  const author = document.createElement('p');
  author.textContent = 'Author';
  divAuthor.appendChild(iMen);
  divAuthor.appendChild(author);
  const divCalendar = document.createElement('div');
  divCalendar.classList.add('calendar');
  divCalendar.classList.add('clip_info');
  const iCalendar = document.createElement('i');
  iCalendar.classList.add('far');
  iCalendar.classList.add('fa-calendar-alt');
  divCalendar.classList.add('fa-2x');
  const calendar = document.createElement('p');
  calendar.textContent = 'Date of publication';
  divCalendar.appendChild(iCalendar);
  divCalendar.appendChild(calendar);
  const divEye = document.createElement('div');
  divEye.classList.add('eye');
  divEye.classList.add('clip_info');
  const iEye = document.createElement('i');
  iEye.classList.add('far');
  iEye.classList.add('fa-eye');
  iEye.classList.add('fa-2x');
  const eye = document.createElement('p');
  eye.textContent = 'Number of views';
  divEye.appendChild(iEye);
  divEye.appendChild(eye);
  li.appendChild(divAuthor);
  li.appendChild(divCalendar);
  li.appendChild(divEye);
  const description = document.createElement('p');
  description.textContent = 'Long or (really rarely) short description';
  description.classList.add('description');
  li.appendChild(description);
  ul.appendChild(li);
}

function uploadLi(data, i, videoNum) {
  i = i + videoNum - 15;
  const items = document.querySelectorAll('.item');
  let date = data.snippet.publishedAt.split('');
  date.length = 10;
  date = date.join('');
  items[i].childNodes[0].src = data.snippet.thumbnails.medium.url;
  items[i].childNodes[1].childNodes[0].textContent = data.snippet.title;
  items[i].childNodes[1].childNodes[0].href = `https://www.youtube.com/watch?v=${data.id}`;
  items[i].childNodes[2].childNodes[1].textContent = data.snippet.channelTitle;
  items[i].childNodes[3].childNodes[1].textContent = date;
  items[i].childNodes[4].childNodes[1].textContent = data.statistics.viewCount;
  items[i].childNodes[5].textContent = data.snippet.description;
  calcSize();
  document.querySelector('.input_wrapper').style.marginTop = '10px';
  document.querySelector('.ul_wrapper').style.display = 'block';
  document.querySelector('.button_wrapper').style.display = 'block';
}


function checkUpload(page) {
  prevLeftItem = ((page.childNodes[0].textContent - 1) * prevLiAmountAtCurrentPage + 1);
  currentPage = +page.childNodes[0].textContent;
  viewedLi = currentPage * prevLiAmountAtCurrentPage / uploadVideos;
  if (viewedLi >= 0.5) {
    startSearch();
    uploadVideos += 15;
  }
}

function animateLi() {
  const items = document.querySelectorAll('.item');
  items.forEach(e => e.classList.remove('animate'));
  const itemsArray = Array.from(items).slice(prevLeftItem - 1, prevLeftItem - 1 + prevLiAmountAtCurrentPage);
  itemsArray.forEach(e => e.classList.add('animate'));
}
