// Audio Player Utility
class AudioPlayer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentTrack = 0;
        this.isPlaying = false;
        this.tracks = [];
    }

    init(tracks) {
        this.tracks = tracks;
        this.attachEventListeners();
    }

    attachEventListeners() {
        const playBtns = this.container.querySelectorAll('.play-btn');
        const prevBtns = this.container.querySelectorAll('.control-btn:nth-child(1)');
        const nextBtns = this.container.querySelectorAll('.control-btn:nth-child(3)');
        const tracks = this.container.querySelectorAll('.track, .chapter-item');

        playBtns.forEach(btn => {
            btn.addEventListener('click', () => this.togglePlay(btn));
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => this.previousTrack());
        });

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => this.nextTrack());
        });

        tracks.forEach((track, index) => {
            track.addEventListener('click', () => this.selectTrack(index));
        });
    }

    togglePlay(btn) {
        this.isPlaying = !this.isPlaying;
        btn.textContent = this.isPlaying ? '⏸' : '▶';
    }

    previousTrack() {
        if (this.currentTrack > 0) {
            this.currentTrack--;
            this.updateNowPlaying();
        }
    }

    nextTrack() {
        if (this.currentTrack < this.tracks.length - 1) {
            this.currentTrack++;
            this.updateNowPlaying();
        }
    }

    selectTrack(index) {
        this.currentTrack = index;
        this.updateNowPlaying();
    }

    updateNowPlaying() {
        const tracks = this.container.querySelectorAll('.track, .chapter-item');
        tracks.forEach((track, index) => {
            track.classList.toggle('active', index === this.currentTrack);
        });
    }
}

// Language Selector
function setupLanguageSelector(cardIds) {
    const langButtons = document.querySelectorAll('.lang-btn');
    const audioCards = {};

    cardIds.forEach(id => {
        audioCards[id] = document.getElementById(id + '-card');
    });

    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.dataset.lang;
            
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            Object.values(audioCards).forEach(card => {
                if (card) card.classList.add('hidden');
            });
            
            if (audioCards[lang]) {
                audioCards[lang].classList.remove('hidden');
            }
        });
    });
}

// Track Selection
function setupTrackSelection(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const tracks = container.querySelectorAll('.track, .chapter-item');
    tracks.forEach(track => {
        track.addEventListener('click', function() {
            tracks.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const trackName = this.querySelector('.track-name, .chapter-title');
            const nowPlaying = container.querySelector('.now-playing-info p, .now-playing');
            if (trackName && nowPlaying) {
                nowPlaying.textContent = trackName.textContent;
            }
        });
    });
}

// View Toggle
function setupViewToggle(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const toggleBtns = container.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}
