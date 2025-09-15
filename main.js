document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.copy');
  if (btn) {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.ip || 'fivem.waxanity.eu');
      btn.textContent = 'Skopírované';
      setTimeout(() => (btn.textContent = 'Kopírovať'), 1500);
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.teamv3 .role-nav');
  if (!nav) return;

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href?.startsWith('#')) return;
      e.preventDefault();
      const t = document.querySelector(href);
      if (t) window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
    });
  });

  const items = [...nav.querySelectorAll('a')];
  const sections = items.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        items.forEach(i => i.classList.remove('is-active'));
        const active = items.find(i => i.getAttribute('href') === `#${en.target.id}`);
        if (active) active.classList.add('is-active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(sec => spy.observe(sec));

  document.querySelectorAll('.teamv3 .member').forEach(card => {
    const av = card.querySelector('.avatar');
    const img = av?.querySelector('img');
    const name = (card.querySelector('.member__name')?.textContent || '').trim();
    const initials = name.split(/\s+/).map(s => s[0]?.toUpperCase()).slice(0,2).join('');

    const makeFallback = () => {
      if (!av) return;
      if (img) img.remove();
      av.classList.add('fallback');
      av.textContent = initials || '?';
    };
    if (!img) makeFallback();
    else img.addEventListener('error', makeFallback, { once:true });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.post__toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const sel = btn.getAttribute('data-target');
      const box = sel ? document.querySelector(sel) : null;
      if (!box) return;
      box.classList.toggle('is-hidden');
      btn.textContent = box.classList.contains('is-hidden') ? 'Zobraziť changelog' : 'Skryť changelog';
    });
  });
});
