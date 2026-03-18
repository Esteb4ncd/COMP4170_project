(function () {
  const landingEl = document.getElementById('landing');
  const startBtn = document.getElementById('start-generating');
  const appEl = document.getElementById('generator-app');

  const fonts = { header: '', subheader: '', body: '' };
  const locks = { header: false, subheader: false, body: false };

  const headerEl = document.getElementById('preview-header');
  const subheaderEl = document.getElementById('preview-subheader');
  const bodyEl = document.getElementById('preview-body');
  const fontHeaderEl = document.getElementById('font-header');
  const fontSubheaderEl = document.getElementById('font-subheader');
  const fontBodyEl = document.getElementById('font-body');
  const btnFetch = document.getElementById('btn-fetch');
  const googleFontsLink = document.getElementById('google-fonts-link');
  const statusMessageEl = document.getElementById('status-message');
  const sampleHeaderEl = document.getElementById('sample-header');
  const sampleSubheaderEl = document.getElementById('sample-subheader');
  const sampleBodyEl = document.getElementById('sample-body');
  const inputHeaderEl = document.getElementById('input-header');
  const inputSubheaderEl = document.getElementById('input-subheader');
  const inputBodyEl = document.getElementById('input-body');

  const defaultText = {
    header: headerEl.textContent,
    subheader: subheaderEl.textContent,
    body: bodyEl.textContent,
  };
  let hasInitialized = false;

  function setStatus(message, isError) {
    if (!statusMessageEl) return;
    statusMessageEl.textContent = message || '';
    statusMessageEl.classList.toggle('is-error', Boolean(isError));
  }

  function toGoogleFontFamily(fontName) {
    return encodeURIComponent(fontName).replace(/%20/g, '+');
  }

  function applyFonts() {
    if (fonts.header) {
      headerEl.style.fontFamily = `"${fonts.header}", serif`;
      sampleHeaderEl.style.fontFamily = `"${fonts.header}", serif`;
      fontHeaderEl.textContent = fonts.header;
    }
    if (fonts.subheader) {
      subheaderEl.style.fontFamily = `"${fonts.subheader}", sans-serif`;
      sampleSubheaderEl.style.fontFamily = `"${fonts.subheader}", sans-serif`;
      fontSubheaderEl.textContent = fonts.subheader;
    }
    if (fonts.body) {
      bodyEl.style.fontFamily = `"${fonts.body}", sans-serif`;
      sampleBodyEl.style.fontFamily = `"${fonts.body}", sans-serif`;
      fontBodyEl.textContent = fonts.body;
    }
    const families = Array.from(new Set([fonts.header, fonts.subheader, fonts.body].filter(Boolean)));
    if (families.length) {
      const encoded = families.map(function (f) {
        return 'family=' + toGoogleFontFamily(f);
      }).join('&');
      googleFontsLink.href = 'https://fonts.googleapis.com/css2?' + encoded + '&display=swap';
    }
  }

  function mergeNewCombination(newCombo) {
    if (!locks.header) fonts.header = newCombo.header;
    if (!locks.subheader) fonts.subheader = newCombo.subheader;
    if (!locks.body) fonts.body = newCombo.body;
  }

  function updatePreviewText() {
    headerEl.textContent = inputHeaderEl.value.trim() || defaultText.header;
    subheaderEl.textContent = inputSubheaderEl.value.trim() || defaultText.subheader;
    bodyEl.textContent = inputBodyEl.value.trim() || defaultText.body;
  }

  async function fetchCombination() {
    setStatus('Generating font combination...', false);
    btnFetch.disabled = true;
    btnFetch.textContent = 'Generating...';

    try {
      const res = await fetch('/api/random-combination');
      if (!res.ok) {
        let serverMessage = '';
        try {
          const errData = await res.json();
          serverMessage = errData.error || errData.message || '';
        } catch (parseErr) {
          serverMessage = '';
        }
        throw new Error(serverMessage || ('Request failed: ' + res.status));
      }

      const data = await res.json();
      if (!data.header || !data.subheader || !data.body) throw new Error('Invalid response');

      mergeNewCombination(data);
      applyFonts();
      setStatus('New combination loaded from database.', false);
    } catch (err) {
      console.error('Failed to fetch fonts', err);
      setStatus('Could not load fonts: ' + err.message, true);
    } finally {
      btnFetch.disabled = false;
      btnFetch.textContent = 'Generate';
    }
  }

  document.getElementById('lock-header').addEventListener('change', function () {
    locks.header = this.checked;
  });
  document.getElementById('lock-subheader').addEventListener('change', function () {
    locks.subheader = this.checked;
  });
  document.getElementById('lock-body').addEventListener('change', function () {
    locks.body = this.checked;
  });
  inputHeaderEl.addEventListener('input', updatePreviewText);
  inputSubheaderEl.addEventListener('input', updatePreviewText);
  inputBodyEl.addEventListener('input', updatePreviewText);

  btnFetch.addEventListener('click', fetchCombination);

  function initGenerator() {
    if (hasInitialized) return;
    hasInitialized = true;
    updatePreviewText();
    fetchCombination();
  }

  function showGenerator() {
    if (landingEl) {
      landingEl.style.display = 'none';
    }
    appEl.classList.remove('app-hidden');
    appEl.setAttribute('aria-hidden', 'false');
    initGenerator();
  }

  if (startBtn && landingEl && appEl) {
    startBtn.addEventListener('click', function () {
      if (window.gsap) {
        const tl = window.gsap.timeline({
          onComplete: showGenerator,
        });
        tl.to('.landing-content', { y: -16, opacity: 0, duration: 0.45, ease: 'power2.inOut' })
          .to('.landing-glow', { opacity: 0, duration: 0.25 }, '<')
          .to('#landing', { opacity: 0, duration: 0.3 }, '-=0.1');
      } else {
        showGenerator();
      }
    });

    if (window.gsap) {
      const tl = window.gsap.timeline();
      tl.from('.landing-kicker', { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' })
        .from('.landing-title', { y: 28, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.25')
        .from('.landing-subtitle', { y: 22, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .from('.landing-cta', { y: 16, opacity: 0, scale: 0.96, duration: 0.45, ease: 'back.out(1.3)' }, '-=0.2');
      window.gsap.to('.landing-glow-one', { x: 25, y: 16, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      window.gsap.to('.landing-glow-two', { x: -18, y: -18, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }
  } else {
    appEl.classList.remove('app-hidden');
    appEl.setAttribute('aria-hidden', 'false');
    initGenerator();
  }
})();
