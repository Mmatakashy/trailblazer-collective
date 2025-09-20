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
  
 // current.js
document.addEventListener('DOMContentLoaded', () => {
  // helper: normalize text to a simple slug for matching
  function normalize(text = '') {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFKD')                  // normalize unicode
      .replace(/[\u0300-\u036f]/g, '')    // remove diacritics
      .replace(/[^a-z0-9\s]+/g, ' ')      // remove punctuation
      .replace(/\s+/g, ' ')               // collapse whitespace
      .trim()
      .replace(/\s/g, '-');               // replace spaces with dashes
  }

  // Collect program "why" panels and build map by normalized title
  const programEls = Array.from(document.querySelectorAll('.why-projects .program'));
  const programMap = {};   // key => element
  const programKeys = [];  // preserve keys for fallback logic

  programEls.forEach(el => {
    const h3 = el.querySelector('h3');
    const title = h3 ? h3.textContent.trim() : '';
    const key = normalize(title);
    if (key) {
      programMap[key] = el;
      programKeys.push(key);
    }
    // ensure initial hidden (defensive in case CSS not present)
    el.style.display = 'none';
  });

  let openKey = null;

  // Attach listeners to all Learn More buttons
  const moreButtons = Array.from(document.querySelectorAll('.more-btn'));
  moreButtons.forEach(btn => {
    btn.addEventListener('click', (ev) => {
      const card = btn.closest('.project-card');
      if (!card) return;

      // prefer the card's h3; fallback to project-content h3
      const titleEl = card.querySelector('h3');
      const projectTitle = titleEl ? titleEl.textContent.trim() : '';
      const projectKey = normalize(projectTitle);

      // find best match in programMap
      let matchKey = projectKey;

      // direct match
      if (!programMap[matchKey]) {
        // try substring/partial match: programKey includes projectKey or vice versa
        matchKey = programKeys.find(pk => pk.includes(projectKey) || projectKey.includes(pk));
      }

      // last fallback: try removing trailing 's' or common small differences
      if (!matchKey && projectKey.endsWith('s')) {
        const alt = projectKey.replace(/s$/, '');
        matchKey = programKeys.find(pk => pk.includes(alt) || alt.includes(pk));
      }
      if (!matchKey && projectKey.endsWith('-program')) {
        const alt = projectKey.replace(/-program$/, '');
        matchKey = programKeys.find(pk => pk.includes(alt) || alt.includes(pk));
      }

      if (!matchKey) {
        console.warn('No matching "why" program found for:', projectTitle, '(normalized:', projectKey, ')');
        // optional UX: flash a small inline notice instead of console.warn
        return;
      }

      // toggle behavior: if same clicked, close it
      if (openKey === matchKey) {
        programMap[matchKey].style.display = 'none';
        openKey = null;
        return;
      }

      // hide all then show the matched one
      Object.values(programMap).forEach(el => el.style.display = 'none');
      const matchedEl = programMap[matchKey];
      matchedEl.style.display = 'block';
      matchedEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      openKey = matchKey;
    });
  });

  // Optional: close any open program when clicking outside a project
  document.addEventListener('click', (e) => {
    // if click inside a project-card or inside a program panel, ignore
    if (e.target.closest('.project-card') || e.target.closest('.why-projects .program')) return;
    // else close open program
    if (openKey) {
      Object.values(programMap).forEach(el => el.style.display = 'none');
      openKey = null;
    }
  });
});
 