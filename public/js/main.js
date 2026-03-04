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
    const families = [fonts.header, fonts.subheader, fonts.body].filter(Boolean);
    if (families.length) {
      const encoded = families.map(function (f) {
        return 'family=' + encodeURIComponent(f.replace(/ /g, '+'));
      }).join('&');
      googleFontsLink.href = 'https://fonts.googleapis.com/css2?' + encoded + '&display=swap';
    }
  }

  function mergeNewCombination(newCombo) {
    if (!locks.header) fonts.header = newCombo.header;
    if (!locks.subheader) fonts.subheader = newCombo.subheader;
    if (!locks.body) fonts.body = newCombo.body;
  }

  function fetchCombination() {
    fetch('/api/random-combination')
      .then(function (res) {
        if (!res.ok) throw new Error('Request failed: ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (!data.header || !data.subheader || !data.body) throw new Error('Invalid response');
        mergeNewCombination(data);
        applyFonts();
      })
      .catch(function (err) {
        console.error('Failed to fetch fonts', err);
        alert('Could not fetch fonts. Make sure the server is running (npm start from font-pairing-app) and you opened http://localhost:3000');
      });
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
