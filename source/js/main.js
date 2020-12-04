'use strict';

var body = document.querySelector('body');
var popup = body.querySelector('.popup');
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

var createOverlay = function () {
  return '<div class="overlay" id="js-overlay"></div>';
};

var render = function (container, template, place) {
  container.insertAdjacentHTML(place, template);
};

function addListenerButton(element) {
  element.oninput = function () {
    if (element.value.length === 6) {
      element.value = element.value + ')';
    }
  };

  element.onkeydown = function (evt) {
    if (evt.keyCode === 46
      || evt.keyCode === 27
      || evt.keyCode === 13
      || evt.keyCode === 9
      || evt.keyCode === 8) {
      return;
    } else {
      if ((evt.keyCode < 48 || evt.keyCode > 57) && (evt.keyCode < 96 || evt.keyCode > 105)) {
        evt.preventDefault();
      }
    }
  };

  element.onkeyup = function () {
    element.value = element.value.replace('/[+]7\ \([\d]{2,3}\)\ [\d]{7}$/');
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

if (popup) {
  var buttonMenu = body.querySelector('.main-menu__link');
  var buttonCloseMenu = body.querySelector('.popup__button');
  var inputNamePopup = body.querySelector('#input-name-popup');
  var inputPhonePopup = body.querySelector('#input-phone-popup');
  var inputMessagePopup = body.querySelector('#input-message-popup');

  buttonMenu.addEventListener('click', function (evt) {
    evt.preventDefault();

    popup.classList.add('open');
    render(body, createOverlay(), 'beforeend');
    body.classList.add('no-scroll');
    inputNamePopup.focus();
    inputNamePopup.value = '';
    inputPhonePopup.value = '';
    inputMessagePopup.value = '';

    body.querySelector('.overlay').addEventListener('click', function () {
      popup.classList.remove('open');
      body.querySelector('.overlay').remove();
      body.classList.remove('no-scroll');
    });
  });

  buttonCloseMenu.addEventListener('click', function () {
    popup.classList.remove('open');
    body.querySelector('.overlay').remove();
    body.classList.remove('no-scroll');
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      popup.classList.remove('open');
      body.querySelector('.overlay').remove();
      body.classList.remove('no-scroll');
    }
  });

  addListenerButton(inputPhonePopup);

  addListenerForm(formPopup);
}

var buttonOpenSiteSection = body.querySelector('#button-footer-1');

var buttonOpenAddress = body.querySelector('#button-footer-2');

function addListenerButtonFooter(activeElement, passiveElement) {
  activeElement.addEventListener('click', function () {
    activeElement.parentElement.classList.toggle('open');
    if (passiveElement.parentElement.classList.contains('open')) {
      passiveElement.parentElement.classList.remove('open');
    }
  });
}

addListenerButtonFooter(buttonOpenSiteSection, buttonOpenAddress);

addListenerButtonFooter(buttonOpenAddress, buttonOpenSiteSection);

// Picture element HTML5 shiv
document.createElement('picture');
