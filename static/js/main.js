// ===== TERMINAL TYPING EFFECT =====
const commands = ['whoami', 'cat profile.json'];
let cmdIndex = 0, charIndex = 0;
const typedEl = document.getElementById('typed-cmd');
const outputEl = document.getElementById('terminal-output');

function typeCmd() {
  const cmd = commands[cmdIndex];
  if (charIndex < cmd.length) {
    typedEl.textContent += cmd[charIndex++];
    setTimeout(typeCmd, 80 + Math.random() * 40);
  } else if (cmdIndex === 0) {
    setTimeout(() => {
      typedEl.textContent = '';
      charIndex = 0;
      cmdIndex = 1;
      typeCmd();
    }, 600);
  } else {
    outputEl.style.display = 'block';
  }
}
setTimeout(typeCmd, 800);

// ===== NAV SCROLL =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.project-card, .skill-group, .about-stats .stat, .contact-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== SKILL BARS =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.level + '%'; }, 200);
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-group').forEach(g => skillObserver.observe(g));

// ===== MEDIUM POSTS =====
async function loadMediumPosts() {
  const grid = document.getElementById('blog-grid');
  try {
    const res = await fetch('/api/medium-posts');
    const data = await res.json();
    if (!data.posts || data.posts.length === 0) {
      grid.innerHTML = `<div class="blog-no-posts">
        <p>Articles loading... <a href="https://medium.com/@nisargpatel24880" target="_blank" style="color:var(--green)">Read on Medium ↗</a></p>
      </div>`;
      return;
    }
    grid.innerHTML = data.posts.map(post => {
      const date = post.published ? new Date(post.published).toLocaleDateString('en-US', {year:'numeric',month:'short',day:'numeric'}) : '';
      const tags = post.tags.map(t => `<span class="blog-tag">${t}</span>`).join('');
      return `
        <a href="${post.link}" target="_blank" class="blog-card fade-in">
          <span class="blog-date">${date}</span>
          <h3 class="blog-title">${post.title}</h3>
          <p class="blog-summary">${post.summary}</p>
          ${tags ? `<div class="blog-tags">${tags}</div>` : ''}
          <span class="blog-read-more">read_more() ↗</span>
        </a>`;
    }).join('');
    grid.querySelectorAll('.blog-card').forEach(c => observer.observe(c));
  } catch(e) {
    grid.innerHTML = `<div class="blog-no-posts">
      <p>Could not load articles. <a href="https://medium.com/@nisargpatel24880" target="_blank" style="color:var(--green)">Read on Medium ↗</a></p>
    </div>`;
  }
}
loadMediumPosts();

// ===== CONTACT FORM =====
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type=submit]');
  btn.textContent = 'message_sent() ✓';
  btn.style.background = '#00cc6a';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'send_message() ↵';
    btn.style.background = '';
    btn.disabled = false;
    this.reset();
  }, 3000);
});

// ===== RESUME MODAL =====
function openResume() {
  const modal = document.getElementById('resumeModal');
  if (modal) modal.style.display = 'flex';
}

function closeResume() {
  const modal = document.getElementById('resumeModal');
  if (modal) modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
  const modal = document.getElementById('resumeModal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    const modal = document.getElementById('resumeModal');
    if (modal) modal.style.display = 'none';
  }
});
