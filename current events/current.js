// Filter Projects
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        card.classList.add('fade-in');
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Toggle More Info
document.querySelectorAll('.more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const info = btn.nextElementSibling;
    info.style.display = (info.style.display === 'block') ? 'none' : 'block';
    btn.textContent = (info.style.display === 'block') ? 'Show Less' : 'Learn More';
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const paragraphs = document.querySelectorAll(".why-projects p");
    const revealOnScroll = () => {
      paragraphs.forEach(p => {
        const rect = p.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          p.classList.add("show");
        }
      });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
  });

  document.addEventListener("DOMContentLoaded", function () {
    const paragraphs = document.querySelectorAll(".projects-inner p");
    const revealOnScroll = () => {
      paragraphs.forEach(p => {
        const rect = p.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          p.classList.add("show");
        }
      });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
  });