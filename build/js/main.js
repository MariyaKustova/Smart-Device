'use strict';

var body = document.querySelector('body');
var buttonMenu = body.querySelector('.main-menu__button');
var buttonCloseMenu = body.querySelector('.popup__button');
var popup = body.querySelector('.popup');
var inputNamePopup = body.querySelector('#input-name-popup');
var inputPhonePopup = body.querySelector('#input-phone-popup');
var inputMessagePopup = body.querySelector('#input-message-popup');
var inputPhoneForm = body.querySelector('#input-phone-form');

var isStorageSupport = supportLocalStorage();

function supportLocalStorage() {
  try {
    localStorage.setItem('test', 'test');
    localStorage.remove('test');

    return true;
  } catch (err) {
    return false;
  }
}

body.classList.remove('no-js');

body.querySelector('.address').classList.remove('open');

body.querySelector('.site-sections').classList.remove('open');

var createOverlay = function () {
  return '<div class="overlay" id="js-overlay"></div>';
};

var render = function (container, template, place) {
  container.insertAdjacentHTML(place, template);
};

if (popup) {
  buttonMenu.addEventListener('click', function () {

    popup.classList.add('open');
    render(body, createOverlay(), 'beforeend');
    inputNamePopup.focus();
    inputNamePopup.value = '';
    inputPhonePopup.value = '';
    inputMessagePopup.value = '';

    body.querySelector('.overlay').addEventListener('click', function () {
      popup.classList.remove('open');
      body.querySelector('.overlay').remove();
    });
  });

  buttonCloseMenu.addEventListener('click', function () {
    popup.classList.remove('open');
    body.querySelector('.overlay').remove();
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      popup.classList.remove('open');
      body.querySelector('.overlay').remove();
    }
  });

  addListenerButton(inputPhonePopup);

  addListenerForm(formPopup);
}

function addListenerButton(element) {
  element.onchange = function () {
    element.value = element.value + ')';
  };

  element.onkeyup = function () {
    element.value = element.value.replace('[+]7[\(]\d{10}[\)]');
  };

  element.onfocus = function () {
    element.value = '+7(';
  };
}

addListenerButton(inputPhoneForm);


var formPopup = body.querySelector('#form-popup');
var form = body.querySelector('#form');

function addListenerForm(element) {
  element.addEventListener('submit', function () {
    if (isStorageSupport) {

      localStorage.setItem('inputName', element.querySelector('input[type="text"]').value);
      localStorage.setItem('inputPhone', element.querySelector('input[type="tel"]').value);
      localStorage.setItem('inputMessage', element.querySelector('textarea').value);
    }
  });
}

addListenerForm(form);

var buttonsFooter = body.querySelectorAll('.page-footer__button');

buttonsFooter.forEach(function (item) {
  item.addEventListener('click', function () {
    item.parentNode.parentNode.classList.toggle('open');
  });
});

// Picture element HTML5 shiv
document.createElement('picture');
