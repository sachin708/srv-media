/**
 * createSlider — reusable one-by-one card slider
 *
 * @param {HTMLElement} trackEl   - the .slider-track element
 * @param {HTMLElement} dotsEl    - the .slider-dots element
 * @param {HTMLElement} prevEl    - the prev arrow button
 * @param {HTMLElement} nextEl    - the next arrow button
 * @param {Array}       data      - array of { icon, title, desc }
 * @param {Object}      opts      - { gap, autoPlay, autoDelay, visibleDesktop, visibleTablet, visibleMobile }
 *
 * @returns {{ goTo, next, prev, destroy }}
 *
 */
const createSlider = (trackEl, prevEl, nextEl, data, opts = {}) => {
  const {
    gap             = 16,
    autoPlay        = true,
    autoDelay       = 3000,
    visibleDesktop  = 4,
    visibleTablet   = 2,
    visibleMobile   = 1,
  } = opts;

  let offset = 0;
  let timer  = null;

  const getVisible = () =>
    window.innerWidth <= 480 ? visibleMobile :
    window.innerWidth <= 768 ? visibleTablet :
    visibleDesktop;

  const maxOffset = () => data.length - getVisible();

  const renderCards = () => {
    trackEl.innerHTML = data.map(({ icon, title, desc }) => `
      <div class="card">
        <div class="card-icon"><img src="${icon}" alt=""/></div>
        <h4>${title}</h4>
        <p>${desc}</p>
      </div>
    `).join('');
  };

  const setWidths = () => {
    const v     = getVisible();
    const total = trackEl.parentElement.offsetWidth;
    const w     = (total - gap * (v - 1)) / v ;
    console.log(w);
    [...trackEl.children].forEach(card => {
      card.style.width     = `${w}px`;
      card.style.minWidth  = `${w}px`;
      card.style.marginRight = `${gap}px`;
    });
  };

// const buildDots = () => {
//   if (!dotsEl) return;

//   dotsEl.innerHTML = '';
//   const count = maxOffset() + 1;

//   for (let i = 0; i < count; i++) {
//     const btn = document.createElement('button');
//     btn.className = 'slider-dot' + (i === offset ? ' active' : '');
//     dotsEl.appendChild(btn);
//   }
// };

// const updateDots = () => {
//   if (!dotsEl) return;

//   [...dotsEl.children].forEach((d, i) =>
//     d.classList.toggle('active', i === offset)
//   );
// };

  const updateArrows = () => {
    prevEl.disabled = offset === 0;
    nextEl.disabled = offset >= maxOffset();
  };

  const goTo = idx => {
    offset = Math.max(0, Math.min(idx, maxOffset()));
    const cardW = trackEl.children[0]?.offsetWidth ?? 0;
    trackEl.style.transform = `translateX(-${offset * (cardW + gap)}px)`;
    // updateDots();
    updateArrows();
  };

  const next = () => { if (offset < maxOffset()) goTo(offset + 1); };
  const prev = () => { if (offset > 0)           goTo(offset - 1); };

  const startAuto = () => {
    if (!autoPlay) return;
    timer = setInterval(() => {
      offset >= maxOffset() ? goTo(0) : next();
    }, autoDelay);
  };

  const stopAuto = () => clearInterval(timer);

  nextEl.onclick = () => { stopAuto(); next(); startAuto(); };
  prevEl.onclick = () => { stopAuto(); prev(); startAuto(); };

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      offset = 0;
      setWidths();
      // buildDots();
      goTo(0);
    }, 120);
  });

  renderCards();
  setWidths();
  // buildDots();
  goTo(0);
  startAuto();

  return { goTo, next, prev, destroy: stopAuto };
};