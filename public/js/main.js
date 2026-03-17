(function () {
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
      fontHeaderEl.textContent = fonts.header;
    }
    if (fonts.subheader) {
      subheaderEl.style.fontFamily = `"${fonts.subheader}", sans-serif`;
      fontSubheaderEl.textContent = fonts.subheader;
    }
    if (fonts.body) {
      bodyEl.style.fontFamily = `"${fonts.body}", sans-serif`;
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

  btnFetch.addEventListener('click', fetchCombination);

  // Load initial combination on page load
  fetchCombination();
})();
