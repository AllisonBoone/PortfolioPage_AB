'use strict';

// Function to show the button when scrolling down
window.onscroll = function () {
  const button = document.querySelector('.back-to-top');
  if (window.scrollY > 300) {
    button.classList.add('show');
  } else {
    button.classList.remove('show');
  }
};

// Smooth scroll to the top when the button is clicked
document.querySelector('.back-to-top').addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Scroll to the top when the page is refreshed or loaded
window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 0);
};
