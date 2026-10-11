/* Renders content from data.js and wires up page interactions. */
(function () {
  const S = window.SITE;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const TYPE = { work: 'Work', lead: 'Leadership', vol: 'Volunteering' };

  /* ---------- Hero ---------- */
  document.querySelectorAll('[data-rosette]').forEach((el) => {
    el.innerHTML = window.rosetteSVG(JSON.parse(el.dataset.rosette));
  });
  const strap = $('.charm-strap .chain');
  if (strap) {
    strap.innerHTML =
      window.ballChain('M47 0V62') +
      window.ballChain('M51 60C70 80 88 110 94 150') +
      window.ballChain('M43 60C30 90 22 140 22 178');
  }
  const idChain = $('.idcard__chain');
  if (idChain) idChain.innerHTML = window.ballChain('M30 0C30 40 30 70 30 110');

  const bubbles = $('.bubbles');
  if (bubbles) {
    for (let i = 0; i < 16; i++) {
      const b = document.createElement('i');
      const size = 10 + Math.random() * 46;
      b.style.cssText = `--s:${size}px;left:${Math.random() * 100}%;--d:${14 + Math.random() * 16}s;--delay:${-Math.random() * 30}s;--x:${(Math.random() - 0.5) * 80}px`;
      bubbles.appendChild(b);
    }
  }

  /* ---------- Experience ---------- */
  const timeline = $('#timeline');
  timeline.innerHTML = S.experience
    .map(
      (e) => `<li class="tl tl--${e.type}" data-type="${e.type}">
        <svg class="tl__bow" aria-hidden="true"><use href="#bow"/></svg>
        <div class="tl__card">
          <div class="tl__meta"><span class="chip chip--${e.type}">${TYPE[e.type]}</span><span class="tl__when">${esc(e.when)}</span></div>
          <h3 class="tl__role">${esc(e.role)}</h3>
          <p class="tl__org">${esc(e.org)}</p>
          <p class="tl__text">${esc(e.text)}</p>
        </div>
      </li>`
    )
    .join('');
  document.querySelectorAll('.tabs [role=tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tabs [role=tab]').forEach((b) => b.setAttribute('aria-selected', b === btn));
      const f = btn.dataset.filter;
      timeline.querySelectorAll('.tl').forEach((li) => (li.hidden = f !== 'all' && li.dataset.type !== f));
    });
  });

  /* ---------- Projects ---------- */
  // Small charm printed on the disc, below the hub.
  const motif = (m) =>
    m === 'heartkey'
      ? '<use href="#heartkey" x="70" y="132" width="60" height="22"/>'
      : m === 'lotus'
      ? '<use href="#lotus" x="78" y="128" width="44" height="30"/>'
      : `<use href="#${m}" x="88" y="128" width="24" height="26" fill="url(#g-${m === 'tooth' ? 'iris' : 'silver'})" stroke="#aab3c2" stroke-width="${m === 'tooth' ? 3 : 1.5}"/>`;

  $('#discs').innerHTML = S.projects
    .map((p, i) => {
      const ring = `${p.title} · ${p.tags.slice(0, 3).join(' · ')} · ${p.year} · `.toUpperCase();
      return `<article class="disc-card reveal" style="--a:${p.disc.a};--b:${p.disc.b}">
        <div class="case" aria-hidden="true">
          <div class="case__spine"></div>
          <div class="disc">
            <svg class="disc__label" viewBox="0 0 200 200">
              <defs><path id="ring-${p.id}" d="M100 100m-80 0a80 80 0 1 1 160 0a80 80 0 1 1 -160 0"/></defs>
              <text><textPath href="#ring-${p.id}" textLength="490">${esc(ring)}</textPath></text>
              ${motif(p.disc.motif)}
            </svg>
          </div>
          <div class="case__shine"></div>
        </div>
        <div class="disc-card__body">
          <p class="track">Track ${String(i + 1).padStart(2, '0')} · ${esc(p.year)}</p>
          <h3 class="disc-card__title">${esc(p.title)}</h3>
          <p class="disc-card__meta">${esc(p.role)} · ${esc(p.context)}</p>
          <p class="disc-card__sum">${esc(p.summary)}</p>
          <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          <details class="notes">
            <summary>Liner notes</summary>
            <ul>${p.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
          </details>
          ${p.links.length ? `<div class="links">${p.links.map(([l, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(l)} <span aria-hidden="true">↗</span></a>`).join('')}</div>` : ''}
        </div>
      </article>`;
    })
    .join('');

  /* ---------- Skills ---------- */
  $('#skills-grid').innerHTML = S.skills
    .map(
      (g) => `<div class="skill-group reveal">
        <div class="skill-group__icon skill-group__icon--${g.tone}" aria-hidden="true"><svg><use href="#${g.icon}"/></svg></div>
        <div>
          <h3 class="skill-group__name">${esc(g.name)}</h3>
          <ul class="gels">${g.items.map((s) => `<li class="gel-chip gel-chip--${g.tone}">${esc(s)}</li>`).join('')}</ul>
        </div>
      </div>`
    )
    .join('');

  /* ---------- Awards ---------- */
  $('#rosettes').innerHTML = S.awards
    .map((a) => `<figure class="rosette reveal">${window.rosetteSVG(a)}<figcaption>${esc(a.caption)}</figcaption></figure>`)
    .join('');
  $('#passes').innerHTML = S.competitions
    .map(
      (c) => `<article class="pass pass--${c.tone} reveal">
        <div class="pass__strap" aria-hidden="true"></div>
        <div class="pass__clip" aria-hidden="true"></div>
        <div class="pass__card">
          <span class="pass__hole" aria-hidden="true"></span>
          <p class="pass__label">Competitor · ${esc(c.year)}</p>
          <h3 class="pass__name">${esc(c.name)}</h3>
          <p class="pass__text">${esc(c.text)}</p>
          ${c.link ? `<a class="pass__link" href="${c.link[1]}" target="_blank" rel="noopener">${esc(c.link[0])} ↗</a>` : ''}
          <div class="pass__gems" aria-hidden="true"><svg><use href="#gem"/></svg><svg><use href="#gem"/></svg><svg><use href="#gem"/></svg></div>
        </div>
      </article>`
    )
    .join('');

  /* ---------- Taskbar ---------- */
  const navLinks = [...document.querySelectorAll('[data-nav]')];
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle('is-active', a.dataset.nav === en.target.id));
        const active = navLinks.find((a) => a.dataset.nav === en.target.id);
        if (active && active.parentElement.scrollWidth > active.parentElement.clientWidth) {
          active.parentElement.scrollTo({ left: active.offsetLeft - 60, behavior: 'smooth' });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  document.querySelectorAll('main .section').forEach((s) => spy.observe(s));

  const clock = $('#clock');
  const tick = () => {
    const d = new Date();
    clock.textContent = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    clock.dateTime = d.toISOString();
  };
  tick();
  setInterval(tick, 15000);

  /* ---------- Reveal on scroll ---------- */
  const reveal = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.isIntersecting && (en.target.classList.add('in'), reveal.unobserve(en.target))),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal, .section__head, .paper, .idcard, .tl').forEach((el) => {
    el.classList.add('reveal');
    reveal.observe(el);
  });
})();
