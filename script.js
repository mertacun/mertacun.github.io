var loader = document.querySelector('.loader');
var overlay = document.querySelector('.overlay');
var header = document.querySelector('.header');

window.addEventListener("load", function() {

  setTimeout(function() {
    overlay.style.opacity = '0';
    loader.style.display = 'none';
    header.style.display = 'flex';
  }, 2000);

  this.setTimeout(function() {
    overlay.style.display = 'none';
  }, 2500);
});

const hamburger = document.querySelector('.hamburger')
const navMenu = document.querySelector('.nav-menu')
const navLinks = navMenu.querySelectorAll('li');

window.addEventListener('scroll', function() {
  var header = document.querySelector('.header');
  header.classList.toggle('sticky', window.scrollY > 0);
});


hamburger.addEventListener("click", () => {
  navMenu.classList.toggle('active')
  hamburger.classList.toggle('active')
})

function closeMenu() {
  hamburger.classList.remove("active")
  navMenu.classList.remove('active')
}

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu)
})


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
      publicKey: "G-CvwdhDRJDVNeFgI",
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
          item.classList.remove('active');
        });

        navItem.classList.add('active');
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