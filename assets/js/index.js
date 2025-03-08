    const audio = document.getElementById('audioElement');
    const player = document.getElementById('audioPlayer');
    let currentSong = null;

    // Initialize volume
    audio.volume = 1;

    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const songData = {
                src: this.dataset.src,
                title: this.dataset.title,
                artist: this.dataset.artist,
                cover: this.dataset.cover
            };

            loadSong(songData);
            player.style.display = 'flex';
            audio.play();
        });
    });

    function loadSong({src, title, artist, cover}) {
        document.getElementById('currentTitle').textContent = title;
        document.getElementById('currentArtist').textContent = artist;
        document.getElementById('currentCover').src = cover;
        
        if(audio.src !== src) {
            audio.src = src;
            currentSong = src;
        }
    }

    function togglePlay() {
        if(audio.paused) {
            audio.play();
            document.querySelector('.play-btn').textContent = '⏸';
        } else {
            audio.pause();
            document.querySelector('.play-btn').textContent = '▶';
        }
    }

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        document.getElementById('progress').style.width = `${progress}%`;
        document.getElementById('currentTime').textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener('loadedmetadata', () => {
        document.getElementById('totalTime').textContent = formatTime(audio.duration);
    });

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function seek(e) {
        const rect = e.target.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
    }

    document.getElementById('volume').addEventListener('input', (e) => {
        audio.volume = e.target.value;
    });

    function skip(seconds) {
        audio.currentTime += seconds;
    }

    function closePlayer() {
        audio.pause();
        player.style.display = 'none';
    }