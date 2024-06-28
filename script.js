var loader = document.querySelector('.loader');
var overlay = document.querySelector('.overlay');
var header = document.querySelector('.header');
var backBtn = document.querySelector('#back-button');

window.addEventListener("load", function() {
  setTimeout(function() {
    overlay.style.opacity = '0';
    loader.style.display = 'none';
    header.style.display = 'flex';
    backBtn.style.display = 'flex';
  }, 1500);

  setTimeout(function() {
    overlay.style.display = 'none';
  }, 2000);
});

window.addEventListener('load', function() {
  setTimeout(function() {
    var iframe = document.getElementById('figma-iframe');
    iframe.src = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FzY9t29dk0T2jjxk1nOhwkP%2FWireframes%3Ftype%3Ddesign%26node-id%3D38%253A784%26mode%3Ddesign%26t%3DvsGi7Zu5y48xmYL7-1";
  }, 7000);
});

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = navMenu.querySelectorAll('a');
  const body = document.body;

  function toggleMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

    if (navMenu.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  }

  function closeMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    body.style.overflow = 'auto';
  }

  hamburger.addEventListener('click', toggleMenu);
  hamburger.addEventListener('touchstart', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      closeMenu();
    });
    link.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      closeMenu();
    });
  });

  window.addEventListener('scroll', function() {
    if (window.innerWidth > 768) {
      const header = document.querySelector('.header');
      header.classList.toggle('sticky', window.scrollY > 0);
    }
  });
});

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }

  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #FFD700}";
  document.body.appendChild(css);
};

document.addEventListener("DOMContentLoaded", function() {
  emailjs.init({
    publicKey: "2SEl0jlVjIke4rPzR",
  });

  function sendEmail(event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    emailjs.send("service_dcxyd3l", "template_us35aua", {
      name: name,
      email: email,
      message: message
    }).then(function(response) {
      alert("Your message has been sent! I'll reply within 24 hours.");
    }, function(error) {
      alert("Oops! Something went wrong. Please try again later.");
    });

    emailjs.send("service_dcxyd3l", "template_3tcem77", {
      from_name: name,
      reply_to: email,
      message: message
    }).then(function(response) {
      console.log("Email sent to yourself successfully!", response);
    }, function(error) {
      console.error("Error sending email to yourself:", error);
    });
  }

  document.getElementById("contact-form").addEventListener("submit", sendEmail);
});

$(document).ready(function() {
  var btn = $('#back-button');

  $(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 300);
  });
});

const sections = document.querySelectorAll('section');

function updateActiveNavItem() {
  const scrollPosition = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      const id = section.getAttribute('id');
      const navItem = document.querySelector(`.nav-menu a[href="#${id}"]`);

      document.querySelectorAll('.nav-menu a').forEach(item => {
        item.classList.remove('activecolor');
      });

      navItem.classList.add('activecolor');
    }
  });
}

window.addEventListener('scroll', updateActiveNavItem);

function handleNavItemClick(event) {
  event.preventDefault();
  const targetId = this.getAttribute('href').substring(1);
  const targetSection = document.getElementById(targetId);
  const offset = -50;

  targetSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  window.scrollBy(0, offset);
}

document.querySelectorAll('.nav-menu a').forEach(item => {
  item.addEventListener('click', handleNavItemClick);
});

document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');

  const projectDetails = {
    'project1': {
      title: "Paula's - Responsive E-Commerce Website",
      technologies: ["HTML", "CSS", "JavaScript"],
      description: "Paula's E-Commerce Website is a fully responsive e-commerce platform built with HTML, CSS, and JavaScript. While the website is functional, it's not fully operational, lacking a checkout process and some other functions. However, users can browse products, add them to the cart, and sort them based on various criteria. The shop page fetches products dynamically from a source, providing users with a diverse selection. Additionally, pagination is implemented to enhance the browsing experience, allowing users to navigate through multiple pages of products.",
      githubLink: "https://github.com/mertacun/paula-s-ecommerce-website",
      liveDemoLink: "https://paula-s-ecommerce-website.vercel.app",
      disabled: false
    },
    'project2': {
      title: "Multilingual Customer Feedback Hub",
      technologies: ["HTML", "CSS", "JavaScript"],
      description: "This project is a feedback form for a store, but users can display it in whichever language they prefer. Users can write their feedback in any language, and the application translates that feedback into English simultaneously, displaying it on the screen. The English-translated feedback is then submitted to the relevant person or department.",
      githubLink: "https://github.com/mertacun/multilingual-feedback",
      liveDemoLink: "https://multilingual-feedback.vercel.app",
      disabled: false
    },
    'project3': {
      title: "Quizzapp - Responsive Quiz Application",
      technologies: ["HTML", "CSS", "JavaScript"],
      description: "Quizzapp is a fun general knowledge quiz app. It contains a database of more than 500 questions stored in a questions.js file. The app generates 10 random questions for each round. At the end of the quiz, users receive feedback on their performance out of 10.",
      githubLink: "https://github.com/mertacun/quizzapp",
      liveDemoLink: "https://quizzapp-beta.vercel.app",
      disabled: false
    },
    'project4': {
      title: "Red Light Violations in Ottawa",
      technologies: ["Python"],
      description: "This Python program displays red light violations in Ottawa for a specific street. Users input a street name, and the program displays the number of violations for each month in the year 2023.",
      githubLink: "https://github.com/mertacun/Ottawa-red-light-camera-violations",
      liveDemoLink: "#",
      disabled: true
    },
    'project5': {
      title: "Pomorhythm - Pomodoro Timer App",
      technologies: ["HTML", "CSS", "JavaScript"],
      description: "Pomorhythm is a pomodoro timer app designed to help users manage their work and break times effectively. It offers standard 25-minute work sessions with 5-minute short breaks and 15-minute long breaks. Users can also toggle a music feature to enhance their productivity.",
      githubLink: "https://github.com/mertacun/pomodoro-timer",
      liveDemoLink: "https://pomodoro-timer-six-flame.vercel.app",
      disabled: false
    },
    'project6': {
      title: "Final Grade Calculator",
      technologies: ["Python"],
      description: "This Python application calculates the user's final grade based on the grades they received from assignments and tests. Users input their grades, and the application computes their final grade according to a predefined grading scheme.",
      githubLink: "https://github.com/mertacun/final-grade-calculator",
      liveDemoLink: "#",
      disabled: true
    },
    'project7': {
      title: "Mobimovers - Company Website",
      technologies: ["HTML", "CSS"],
      description: "Mobimovers is a static company website built using only HTML and CSS. It serves as an online presence for the company, providing information about its services, team members, and contact details.",
      githubLink: "https://github.com/mertacun/mobimovers-company-page",
      liveDemoLink: "https://mobimovers-company-page.vercel.app",
      disabled: false
    },
    'project8': {
      title: "Interest Calculator - Bank Console Application",
      technologies: ["C Sharp"],
      description: "This C# console application calculates the user's money in a savings account with interest. Users input their initial deposit amount, interest rate, and the number of years, and the application computes the final amount after the specified time period.",
      githubLink: "https://github.com/mertacun/saving-accounts",
      liveDemoLink: "#",
      disabled: true
    },
    'project9': {
      title: "Pokedex",
      technologies: ["HTML", "CSS", "JavaScript"],
      description: "The Pokedex project is a web application that displays information about various Pokémon species. Users can sort the Pokémon and access detailed information about each one. The data is sourced from a JavaScript file containing information about different Pokémon.",
      githubLink: "https://github.com/mertacun/pokedex",
      liveDemoLink: "https://pokedex-nine-sand.vercel.app",
      disabled: false
    },
    'project10': {
      title: "Picture of the Day - NASA",
      technologies: ["HTML", "CSS", "JavaScript"],
      description: "This application displays a picture taken by NASA for a specific date entered by the user. Along with the image, the application provides a description of the picture, allowing users to learn more about it.",
      githubLink: "https://github.com/mertacun/nasa-picture-of-the-day",
      liveDemoLink: "https://nasa-picture-of-the-day-seven.vercel.app",
      disabled: false
    },
    'project11': {
      title: "Color of the Day",
      technologies: ["HTML", "CSS", "JavaScript"],
      description: "This application shows the color associated with a specific date entered by the user. Each day is assigned a unique color, and the application displays this color along with its name and RGB values.",
      githubLink: "https://github.com/mertacun/color-of-the-day",
      liveDemoLink: "https://color-of-the-day.vercel.app",
      disabled: false
    },
    'project12': {
      title: "Very Simple Calculator",
      technologies: ["HTML", "CSS", "JavaScript"],
      description: "The Very Simple Calculator is a basic calculator application with a strict integer mode. Users can perform addition, subtraction, multiplication, and division operations on integer values.",
      githubLink: "https://github.com/mertacun/simple-calculator",
      liveDemoLink: "#",
      disabled: true
    }
  };

  cards.forEach(function(card) {
    card.addEventListener('click', function() {
      const popupId = card.querySelector('.bg-overlay').getAttribute('data-popup');
      const project = projectDetails[popupId];

      if (project) {
        const technologiesHTML = project.technologies.map(tech => {
          const techImagePath = `img/skills/${tech.toLowerCase().replace(/\s/g, '')}logo.png`;
          return `
            <div class="technology">
              <img src="${techImagePath}" alt="${tech}" title="${tech}" class="tech-logo">
              <span>${tech}</span>
            </div>
          `;
        }).join('');

        const popupContent = `
          <div class="popup" id="${popupId}">
            <span class="close" onclick="closePopup('${popupId}')">&times;</span>
            <div class="popup-content">
              <div class="project-image" onclick="showBigImage('${popupId}')">
                <img src="img/projects/${popupId}.png" alt="${popupId}" class="popup-img">
              </div>
              <div class="project-details">
                <h2>${project.title}</h2>
                <p><strong>Technologies:</strong></p>
                <div class="technologies">${technologiesHTML}</div>
                <p><strong>Description:</strong></p>
                <p>${project.description}</p>
                <div class="project-links">
                  <a href="${project.githubLink}" target="_blank"><i class="fab fa-github"></i> Github Repo</a>
                  ${!project.disabled ? `<a href="${project.liveDemoLink}" target="_blank"><i class="fas fa-desktop"></i> Live Demo</a>` : '<span class="disabled-link"> Live Demo Not Yet Available</span>'}
                </div>
              </div>
            </div>
          </div>
        `;

        document.getElementById('popup-container').innerHTML = popupContent;
        document.getElementById('overlay').style.display = 'block';
        document.getElementById(popupId).style.display = 'block';
        document.body.style.overflow = 'hidden';
        setTimeout(function() {
          document.getElementById(popupId).classList.add('show');
        }, 50);
      }
    });
  });
});

function closePopup(popupId) {
  document.getElementById(popupId).classList.remove('show');
  document.getElementById('overlay').style.display = 'none';
  document.getElementById(popupId).style.display = 'none';
  document.body.style.overflow = 'auto';
}

function showBigImage(popupId) {
  const img = document.getElementById(popupId).querySelector('.popup-img');
  const imgUrl = img.getAttribute('src');
  window.open(imgUrl, '_blank');
}
