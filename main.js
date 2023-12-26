import 'a11y-slider/dist/a11y-slider.css'
import './sass//style.scss'

import A11YSlider from 'a11y-slider'

const body = document.getElementById('body')
const navToggle = document.getElementById('mobile-nav-toggler')
const signUpForm = document.getElementById('signup-form')
const email = document.getElementById('email')

new A11YSlider(document.querySelector('.testimonials-slider'), {
  slidesToShow: 1,
  arrows: false,
  dots: true,
  responsive: {
    768: {
      slidesToShow: 2,
      arrows: false,
      dots: false
    },

    992: {
      slidesToShow: 3,
      arrows: false,
      dots: false
    }
  }
})

navToggle.addEventListener('click', toggleNavigation)
signUpForm.addEventListener('submit', validateSignupForm.bind(this))

function toggleNavigation() {
  body.toggleAttribute('data-overlay')

  navToggle.getAttribute('aria-expanded') === 'true'
    ? navToggle.setAttribute('aria-expanded', 'false')
    : navToggle.setAttribute('aria-expanded', 'true')
}

function validateSignupForm(event) {
  if (!validateEmail()) {
    event.preventDefault()
  }
}

function validateEmail() {
  if (email.value.trim() === '' || email.validity.valueMissing) {
    addErrorState(email, 'Please insert a valid email')
    return false
  } else if (email.validity.typeMismatch) {
    addErrorState(email, 'Sorry, invalid format here')
    return false
  } else {
    removeErrorState(email)
    return true
  }
}

function addErrorState(formElement, message) {
  const errorMessageElement = formElement.nextElementSibling

  formElement.setAttribute('aria-invalid', 'true')

  if (errorMessageElement instanceof HTMLElement) {
    errorMessageElement.innerText = message
    errorMessageElement.removeAttribute('hidden')
  } else {
    return
  }
}

function removeErrorState(formElement) {
  const errorMessageElement = formElement.nextElementSibling

  formElement.setAttribute('aria-invalid', 'false')

  if (errorMessageElement instanceof HTMLElement) {
    errorMessageElement.innerText = ''
    errorMessageElement.setAttribute('hidden', 'hidden')
  } else {
    return
  }
}
