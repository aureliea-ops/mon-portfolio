const navbar = document.getElementById("navbar");
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");
const backToTop = document.getElementById("back-to-top");
const contactForm = document.getElementById("contact-form");
const successMsg = document.getElementById(".skill-progress");

const skillBars = document.querySelectorAll(".skill-progress");

const revealElements = document.querySelectorAll(".reveal");

if (burger) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  if (window.scrollY > 400) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }

  revealOnScroll();

  animateSkillBars();
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;

  skillBars.forEach((bar) => {
    const rect = bar.getBoundingClientRect();
    // rect.top < window.innerHeight = la barre est visible dans l'écran
    if (rect.top < window.innerHeight - 50) {
      // data-level = l'attribut HTML data-level="75" → "75"
      const level = bar.getAttribute("data-level");
      // On change la largeur = la barre s'anime grâce à la transition CSS
      bar.style.width = level + "5%";
      skillsAnimated = true;
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((el) => observer.observe(el));

function revealOnScroll() {
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    let isValid = true;

    isValid =
      validateField(name, "name-error", "Votre nom est requis") && isValid;
    isValid = validateEmail(email, "email-error") && isValid;
    isValid =
      validateField(subject, "subject-error", "Le sujet est requis") && isValid;
    isValid =
      validateField(message, "message-error", "Votre message est requis") &&
      isValid;

    if (isValid) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.textContent = "Envoi en cours...";
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        submitBtn.textContent = "Envoyer le message";
        submitBtn.disabled = false;
        successMsg.style.display = "block";

        setTimeout(() => {
          successMsg.style.display = "none";
        }, 5000);
      }, 1500);
    }
  });
}

function validateField(field, errorId, errorText) {
  const errorSpan = document.getElementById(errorId);

  if (!field.value.trim()) {
    // .trim() enlève les espaces au début et fin
    field.classList.add("invalid");
    errorSpan.textContent = errorText;
    return false;
  } else {
    field.classList.remove("invalid");
    errorSpan.textContent = "";
    return true;
  }
}

function validateEmail(field, errorId) {
  const errorSpan = document.getElementById(errorId);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!field.value.trim()) {
    field.classList.add("invalid");
    errorSpan.textContent = "Votre email est requis";
    return false;
  } else if (!emailRegex.test(field.value)) {
    field.classList.add("invalid");
    errorSpan.textContent = "Format email invalide (exemple@domaine.fr)";
    return false;
  } else {
    field.classList.remove("invalid");
    errorSpan.textContent = "";
    return true;
  }
}

document.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    field.classList.remove("invalid");
    const errorId = field.id + "-error";
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) errorSpan.textContent = "";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  revealOnScroll();
  animateSkillBars();
});
