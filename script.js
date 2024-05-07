document.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.innerWidth <= 1025;

  // Function to create and observe IntersectionObservers
  function createObserver(selector, observerOptions, toggleClass) {
    const items = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(toggleClass);
        } else {
          entry.target.classList.remove(toggleClass);
        }
      });
    }, observerOptions);

    items.forEach(item => {
      observer.observe(item);
    });
  }

  // Create observers for different sections
  createObserver('#about .phrase', { root: null, threshold: isMobile ? 0.5 : 1 }, 'active');
  // createObserver('#gallery .image-box', { root: null, threshold: isMobile ? 0.5 : 1 }, 'active');
  createObserver('#blog .featured-article, #blog .article', { root: null, threshold: isMobile ? 0.01 : 0.3 }, 'fadeInUp');
  createObserver('#contact > div', { root: null, threshold: isMobile ? 0.01 : 0.7 }, 'fadeInUp');
});

// Navigation ----------------------------------------
const nav = document.getElementById('nav');
const menuIcon = document.querySelector('.menu-icon');
const listItems = document.querySelectorAll('nav ul li a');

function toggleMenu() {
  nav.classList.toggle('active');
  menuIcon.classList.toggle('active');
  listItems.forEach((listItem) => {
    listItem.classList.toggle('active');
  });
}

function hideMenu() {
  nav.classList.remove('active');
  menuIcon.classList.remove('active');
  listItems.forEach((listItem) => {
    listItem.classList.remove('active');
  });
}

// Form Submission ---------------------------------
document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const form = this;
  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
      if (response.ok) {
        form.reset();
        const toast = document.getElementById("toast");
        toast.classList.add("show");
        setTimeout(function(){ toast.classList.remove("show"); }, 10000);        
      } else {
        // Handle errors here
        alert('Form submission failed!');
    }
  })
  .catch(error => {
      console.error('Error:', error);
  });
});



// dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

// Dark Mode
const themeSwitcher = document.getElementById('theme-switcher');

function updateThemeIcon(isDarkMode) {
themeSwitcher.children[0].classList.replace(isDarkMode ? 'fa-sun' : 'fa-moon', isDarkMode ? 'fa-moon' : 'fa-sun');
}

// Determine if dark mode is preferred
function prefersDarkMode() {
return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Set the theme based on the preference
function setThemeBasedOnPreference() {
const isDarkMode = prefersDarkMode();
document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
updateThemeIcon(isDarkMode);
}

// Switch Theme manually
function switchTheme() {
const currentTheme = document.documentElement.getAttribute('data-theme');
const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
document.documentElement.setAttribute('data-theme', newTheme);
localStorage.setItem('theme', newTheme);
updateThemeIcon(newTheme === 'dark');
}

// Event Listener
themeSwitcher.addEventListener('click', switchTheme);

// Initialize Theme
function initializeTheme() {
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme === 'dark');
} else {
    setThemeBasedOnPreference();
}
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeBasedOnPreference);

// Initialize theme when the script loads
initializeTheme();


function togglePhoneNumber() {
    var phoneNumber = document.getElementById("phone-number");
    phoneNumber.classList.toggle("show");
}


