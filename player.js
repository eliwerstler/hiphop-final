(function () {

// ── Playlist ──────────────────────────────────────────────────────────────────
function _src(f) { return 'playlist/' + encodeURIComponent(f); }

const PLAYLIST = [
  { src: _src('RUN DMC - My Adidas (Official Audio).mp3'),
    name: 'My Adidas', artist: 'Run-DMC' },
  { src: _src("Puff Daddy - It's All About The Benjamins (Remix) (Official Music Video) [HD].mp3"),
    name: "It's All About the Benjamins", artist: 'Puff Daddy & The Family' },
  { src: _src('The Notorious B.I.G. - Mo Money Mo Problems (feat. Puff Daddy) (Official Audio).mp3'),
    name: 'Mo Money Mo Problems', artist: 'The Notorious B.I.G.' },
  { src: _src('Mann ft. 50 Cent - Buzzin (Remix).mp3'),
    name: "Buzzin' (Remix)", artist: 'Mann ft. 50 Cent' },
  { src: _src('Kanye - Jesus Walks.mp3'),
    name: 'Jesus Walks', artist: 'Kanye West' },
  { src: _src('Kanye - New Slaves.mp3'),
    name: 'New Slaves', artist: 'Kanye West' },
];

// ── SPA Navigation (keeps audio alive across page transitions) ─────────────────

const _parser = new DOMParser();

function _swapPage(doc) {
  document.title = doc.title;

  document.head.querySelectorAll('link[rel="stylesheet"]:not([href^="style.css"]), style').forEach(el => el.remove());
  doc.head.querySelectorAll('link[rel="stylesheet"]:not([href^="style.css"]), style').forEach(el => {
    document.head.appendChild(el.cloneNode(true));
  });

  const sp = document.querySelector('.sp');
  Array.from(document.body.children).forEach(el => { if (el !== sp) el.remove(); });
  Array.from(doc.body.children)
    .filter(el => el.tagName !== 'SCRIPT')
    .forEach(el => document.body.insertBefore(el.cloneNode(true), sp));

  window.scrollTo(0, 0);
}

function _navigate(href) {
  const url = new URL(href, location.href).href;
  fetch(url)
    .then(r => r.text())
    .then(html => {
      _swapPage(_parser.parseFromString(html, 'text/html'));
      history.pushState({ url }, '', href);
    })
    .catch(() => { window.location.href = href; });
}

document.addEventListener('click', e => {
  const a = e.target.closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href || !/^[^/:#][^:]*\.html$/.test(href)) return;
  e.preventDefault();
  _navigate(href);
}, true);

window.addEventListener('popstate', e => {
  const url = e.state && e.state.url;
  if (!url) return;
  fetch(url)
    .then(r => r.text())
    .then(html => { _swapPage(_parser.parseFromString(html, 'text/html')); })
    .catch(() => window.location.reload());
});

// ── Player ────────────────────────────────────────────────────────────────────

class PlaylistPlayer {
  constructor() {
    this.playlist     = this._shuffle(PLAYLIST.slice()); // random order each load
    this.idx          = 0;
    this.audio        = new Audio();
    this.audio.volume = 0;
    this.playing      = false;
    this.unlocked     = false;
    this.muted        = false;
    this._pausedByVid = false;
    this._errorCount  = 0;
    this._fadeTimer   = null;

    this._buildUI();
    this._bindAudio();
    this._setupVideoDetect();
    this._updateInfo();
    this._updatePlayUI();
    this._show();

    history.replaceState({ url: location.href }, '', location.href);

    // Attempt autoplay immediately; fall back to first user interaction if blocked
    this._tryAutoplay();
  }

  _shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  _buildUI() {
    const el = document.createElement('div');
    el.className = 'sp sp-paused';
    el.innerHTML = `
      <div class="sp-wave" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <div class="sp-info">
        <span class="sp-name"></span>
        <span class="sp-artist"></span>
      </div>
      <button class="sp-btn sp-play-btn" aria-label="Play / Pause">
        <svg class="sp-icon-play"  viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><polygon points="5 3 19 12 5 21"/></svg>
        <svg class="sp-icon-pause sp-hidden" viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><rect x="5" y="4" width="4" height="16" rx="1"/><rect x="13" y="4" width="4" height="16" rx="1"/></svg>
      </button>
      <button class="sp-btn sp-skip-btn" aria-label="Skip">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><polygon points="5 4 15 12 5 20"/><rect x="17" y="4" width="2" height="16" rx="1"/></svg>
      </button>
      <button class="sp-btn sp-mute-btn" aria-label="Toggle mute">
        <svg class="sp-icon-on"  viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        <svg class="sp-icon-off sp-hidden" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
      </button>
    `;
    document.body.appendChild(el);
    this._el = el;
    el.querySelector('.sp-play-btn').addEventListener('click', () => this._handlePlayClick());
    el.querySelector('.sp-skip-btn').addEventListener('click', () => this.skip());
    el.querySelector('.sp-mute-btn').addEventListener('click', () => this.toggleMute());
  }

  _tryAutoplay() {
    this.audio.src = this.playlist[this.idx].src;
    this.audio.play()
      .then(() => {
        // play() resolved, but some browsers silently suppress audio until a user gesture.
        // Validate by waiting for timeupdate — that only fires when currentTime actually advances.
        let confirmed = false;
        const confirm = () => {
          confirmed = true;
          this.unlocked = true;
          this.playing  = true;
          this.audio.volume = this.muted ? 0 : 0.45;
          this._updatePlayUI();
        };
        this.audio.addEventListener('timeupdate', confirm, { once: true });
        setTimeout(() => {
          if (!confirmed) {
            this.audio.removeEventListener('timeupdate', confirm);
            this.audio.pause();
            this._setupUnlockListeners();
          }
        }, 800);
      })
      .catch(() => this._setupUnlockListeners());
  }

  _setupUnlockListeners() {
    const unlock = () => {
      if (this.unlocked) return;
      this.unlocked = true;
      this._loadAndPlay(this.idx);
    };
    window.addEventListener('scroll',     unlock, { passive: true, once: true });
    window.addEventListener('touchstart', unlock, { passive: true, once: true });
  }

  _bindAudio() {
    this.audio.addEventListener('ended',   () => this.skip());
    this.audio.addEventListener('playing', () => { this._errorCount = 0; });
    this.audio.addEventListener('error',   () => {
      this._errorCount++;
      if (this._errorCount >= this.playlist.length) { this._errorCount = 0; return; }
      const wasPlaying = this.playing;
      this.idx = (this.idx + 1) % this.playlist.length;
      this._updateInfo();
      if (wasPlaying) this._loadAndPlay(this.idx);
    });
  }

  _setupVideoDetect() {
    // Pause music when user clicks into any iframe
    window.addEventListener('blur', () => {
      const a = document.activeElement;
      if (a && a.tagName === 'IFRAME' && this.playing) {
        this._pausedByVid = true;
        this._doPause();
      }
    });

    // Resume when user clicks back to the page (away from the iframe)
    window.addEventListener('focus', () => {
      if (this._pausedByVid) {
        this._pausedByVid = false;
        if (this.unlocked) this._doResume();
      }
    });

    // Resume when a YouTube video ends (state 0) or is paused by the user (state 2)
    window.addEventListener('message', e => {
      if (!e.origin.includes('youtube.com')) return;
      try {
        const data = JSON.parse(e.data);
        if (data.event === 'onStateChange' && (data.info === 0 || data.info === 2)) {
          if (this._pausedByVid) {
            this._pausedByVid = false;
            if (this.unlocked) this._doResume();
          }
        }
      } catch (_) {}
    });

    // Inject enablejsapi=1 into YouTube iframes so they send postMessage state events.
    // MutationObserver handles iframes added after SPA page swaps.
    const enableAPI = iframe => {
      if (!/youtube\.com\/embed\//.test(iframe.src) || /enablejsapi/.test(iframe.src)) return;
      iframe.src += (iframe.src.includes('?') ? '&' : '?') + 'enablejsapi=1';
    };
    document.querySelectorAll('iframe').forEach(enableAPI);
    new MutationObserver(muts => muts.forEach(m =>
      m.addedNodes.forEach(n => {
        if (n.tagName === 'IFRAME') enableAPI(n);
        if (n.querySelectorAll) n.querySelectorAll('iframe').forEach(enableAPI);
      })
    )).observe(document.body, { childList: true, subtree: true });
  }

  _loadAndPlay(idx) {
    this.audio.src = this.playlist[idx].src;
    this._updateInfo();
    this.audio.play()
      .then(() => {
        this.playing = true;
        this._fade(0, this.muted ? 0 : 0.45, 400);
        this._updatePlayUI();
      })
      .catch(() => {});
  }

  _doResume() {
    this.audio.play()
      .then(() => {
        this.playing = true;
        this._fade(this.audio.volume, this.muted ? 0 : 0.45, 600);
        this._updatePlayUI();
      })
      .catch(() => {});
  }

  _doPause() {
    this._fade(this.audio.volume, 0, 500, () => this.audio.pause());
    this.playing = false;
    this._updatePlayUI();
  }

  _handlePlayClick() {
    if (!this.unlocked) {
      this.unlocked = true;
      this._loadAndPlay(this.idx);
    } else {
      this.playing ? this._doPause() : this._doResume();
    }
  }

  skip() {
    const wasPlaying = this.playing;
    this._fade(this.audio.volume, 0, 300, () => {
      this.audio.pause();
      this.idx = (this.idx + 1) % this.playlist.length;
      this._updateInfo();
      if (wasPlaying) this._loadAndPlay(this.idx);
      else this._updatePlayUI();
    });
  }

  toggleMute() {
    this.muted = !this.muted;
    this._fade(this.audio.volume, this.muted ? 0 : 0.45, 400);
    this._el.classList.toggle('sp-muted', this.muted);
    this._el.querySelector('.sp-icon-on').classList.toggle('sp-hidden',  this.muted);
    this._el.querySelector('.sp-icon-off').classList.toggle('sp-hidden', !this.muted);
  }

  _fade(from, to, ms, done) {
    if (this._fadeTimer) clearInterval(this._fadeTimer);
    const steps = 20, dt = ms / steps, dv = (to - from) / steps;
    let i = 0;
    this._fadeTimer = setInterval(() => {
      i++;
      this.audio.volume = Math.max(0, Math.min(1, from + dv * i));
      if (i >= steps) { clearInterval(this._fadeTimer); this._fadeTimer = null; done && done(); }
    }, dt);
  }

  _updateInfo() {
    const t = this.playlist[this.idx];
    this._el.querySelector('.sp-name').textContent   = t.name;
    this._el.querySelector('.sp-artist').textContent = t.artist;
  }

  _updatePlayUI() {
    this._el.querySelector('.sp-icon-play').classList.toggle('sp-hidden',  this.playing);
    this._el.querySelector('.sp-icon-pause').classList.toggle('sp-hidden', !this.playing);
    this._el.classList.toggle('sp-paused', !this.playing);
  }

  _show() { this._el.classList.add('sp-on'); }
}

document.addEventListener('DOMContentLoaded', () => { window._sp = new PlaylistPlayer(); });

})();
