// Spotify Clone - JavaScript Application

document.addEventListener('DOMContentLoaded', function() {
    // ===== GLOBAL VARIABLES =====
    const audio = document.getElementById('audio-player-element');
    const musicPlayer = document.getElementById('music-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const progressBar = document.getElementById('song-progress');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const nowPlayingTitle = document.getElementById('now-playing-title');
    const nowPlayingArtist = document.getElementById('now-playing-artist');
    const nowPlayingCover = document.getElementById('now-playing-cover');
    const songsContainer = document.getElementById('songs-container');
    const sortSelect = document.getElementById('sort-songs');
    const shuffleAllBtn = document.getElementById('shuffle-all');
    const playlistContainer = document.getElementById('playlist-container');
    const recentlyPlayedContainer = document.getElementById('recently-played');

    let currentPlaylist = [];
    let currentSongIndex = -1;
    let isShuffled = false;
    let isRepeating = false;
    let originalPlaylist = [];
    let recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || [];

    // ===== SONG DATA =====
    const songs = [
        // First 20 songs with unique metadata
        { id: 1, title: "Summer Vibes", artist: "Pritam", cover: "assets/images/artists/Pritam.jpg", file: "songs/song1.m4a", duration: "3:45" },
        { id: 2, title: "Midnight Dreams", artist: "Arijit Singh", cover: "assets/images/artists/Arijit Singh.jpg", file: "songs/song2.mp3", duration: "4:20" },
        { id: 3, title: "Rainy Days", artist: "Sachin-Jigar", cover: "assets/images/artists/Sachin-Jigar.jpg", file: "songs/song3.mp3", duration: "3:30" },
        { id: 4, title: "Desert Rose", artist: "A.R. Rahman", cover: "assets/images/artists/A.R. Rahman.jpg", file: "songs/song4.mp3", duration: "5:10" },
        { id: 5, title: "Mountain High", artist: "Vishal-Shekhar", cover: "assets/images/artists/Vishal-Shekhar.jpg", file: "songs/song5.m4a", duration: "4:05" },
        { id: 6, title: "Ocean Blue", artist: "Atif Aslam", cover: "assets/images/artists/atif aslam.jpg", file: "songs/song6.mp3", duration: "3:55" },
        { id: 7, title: "City Lights", artist: "Pritam", cover: "assets/images/albums/yeh-jawani-hai-deewani.jpg", file: "songs/song7.mp3", duration: "3:40" },
        { id: 8, title: "Golden Hour", artist: "Arijit Singh", cover: "assets/images/albums/Aashiqui 2.jpg", file: "songs/song8.m4a", duration: "4:15" },
        { id: 9, title: "Starry Night", artist: "Sachin-Jigar", cover: "assets/images/Radio/Arijit Radio.jpg", file: "songs/song9.mp3", duration: "3:50" },
        { id: 10, title: "Morning Dew", artist: "A.R. Rahman", cover: "assets/images/Chart/Top Songs Global.jpg", file: "songs/song10.mp3", duration: "4:30" },
        { id: 11, title: "Evening Sky", artist: "Vishal-Shekhar", cover: "assets/images/indias best/Bollywood Central.jpg", file: "songs/song11.mp3", duration: "3:35" },
        { id: 12, title: "Winter Chill", artist: "Atif Aslam", cover: "assets/images/albums/Glory.jpg", file: "songs/song12.mp3", duration: "4:00" },
        { id: 13, title: "Spring Bloom", artist: "Pritam", cover: "assets/images/albums/making-memories.jpg", file: "songs/song13.mp3", duration: "3:45" },
        { id: 14, title: "Autumn Leaves", artist: "Arijit Singh", cover: "assets/images/albums/who.jpg", file: "songs/song14.mp3", duration: "4:10" },
        { id: 15, title: "Desert Wind", artist: "Sachin-Jigar", cover: "assets/images/Radio/Shreya Ghoshal.jpg", file: "songs/song15.m4a", duration: "3:55" },
        { id: 16, title: "Mountain Echo", artist: "A.R. Rahman", cover: "assets/images/Radio/KK.jpg", file: "songs/song16.mp3", duration: "5:00" },
        { id: 17, title: "River Flow", artist: "Vishal-Shekhar", cover: "assets/images/Radio/A.R. Rahman.jpg", file: "songs/song17.m4a", duration: "4:20" },
        { id: 18, title: "Forest Whisper", artist: "Atif Aslam", cover: "assets/images/Radio/Diljit Sosanjh.jpg", file: "songs/song18.m4a", duration: "3:45" },
        { id: 19, title: "Sunset Glow", artist: "Pritam", cover: "assets/images/Chart/Top-Songs-India.jpg", file: "songs/song19.m4a", duration: "4:05" },
        { id: 20, title: "Moonlight Sonata", artist: "Arijit Singh", cover: "assets/images/Chart/Top-50-Global.jpg", file: "songs/song20.m4a", duration: "3:50" },
        // Additional songs 21-40 (reusing images)
        { id: 21, title: "Urban Jungle", artist: "Sachin-Jigar", cover: "assets/images/Chart/Top-50-India.jpg", file: "songs/song21.mp3", duration: "3:40" },
        { id: 22, title: "Digital Dreams", artist: "A.R. Rahman", cover: "assets/images/Chart/Viral-50-Global.jpg", file: "songs/song22.mp3", duration: "4:15" },
        { id: 23, title: "Neon Nights", artist: "Vishal-Shekhar", cover: "assets/images/indias best/I-Pop-Icons.jpg", file: "songs/song23.m4a", duration: "3:55" },
        { id: 24, title: "Cyber Love", artist: "Atif Aslam", cover: "assets/images/indias best/Punjabi-101.jpg", file: "songs/song24.m4a", duration: "4:10" },
        { id: 25, title: "Pixel Rain", artist: "Pritam", cover: "assets/images/indias best/Kollywood-Cream.jpg", file: "songs/song25.mp3", duration: "3:45" },
        { id: 26, title: "Virtual Reality", artist: "Arijit Singh", cover: "assets/images/indias best/Tollywood-pearls.jpg", file: "songs/song26.m4a", duration: "4:20" },
        { id: 27, title: "Code Symphony", artist: "Sachin-Jigar", cover: "assets/images/artists/Pritam.jpg", file: "songs/song27.mp3", duration: "3:30" },
        { id: 28, title: "Data Stream", artist: "A.R. Rahman", cover: "assets/images/artists/Arijit Singh.jpg", file: "songs/song28.mp3", duration: "5:10" },
        { id: 29, title: "AI Melody", artist: "Vishal-Shekhar", cover: "assets/images/artists/Sachin-Jigar.jpg", file: "songs/song29.m4a", duration: "4:05" },
        { id: 30, title: "Quantum Beat", artist: "Atif Aslam", cover: "assets/images/artists/A.R. Rahman.jpg", file: "songs/song30.mp3", duration: "3:55" },
        { id: 31, title: "Neural Network", artist: "Pritam", cover: "assets/images/artists/Vishal-Shekhar.jpg", file: "songs/song31.m4a", duration: "3:40" },
        { id: 32, title: "Cloud Harmony", artist: "Arijit Singh", cover: "assets/images/artists/atif aslam.jpg", file: "songs/song32.m4a", duration: "4:15" },
        { id: 33, title: "Binary Love", artist: "Sachin-Jigar", cover: "assets/images/albums/yeh-jawani-hai-deewani.jpg", file: "songs/song33.mp3", duration: "3:50" },
        { id: 34, title: "Algorithm Dance", artist: "A.R. Rahman", cover: "assets/images/albums/Aashiqui 2.jpg", file: "songs/song34.mp3", duration: "4:30" },
        { id: 35, title: "Database Soul", artist: "Vishal-Shekhar", cover: "assets/images/Radio/Arijit Radio.jpg", file: "songs/song35.m4a", duration: "3:35" },
        { id: 36, title: "Firewall Heart", artist: "Atif Aslam", cover: "assets/images/Chart/Top Songs Global.jpg", file: "songs/song36.mp3", duration: "4:00" },
        { id: 37, title: "Encrypted Emotions", artist: "Pritam", cover: "assets/images/indias best/Bollywood Central.jpg", file: "songs/song37.mp3", duration: "3:45" },
        { id: 38, title: "Server Serenade", artist: "Arijit Singh", cover: "assets/images/albums/Glory.jpg", file: "songs/song38.mp3", duration: "4:10" },
        { id: 39, title: "Protocol Passion", artist: "Sachin-Jigar", cover: "assets/images/albums/making-memories.jpg", file: "songs/song39.mp3", duration: "3:55" },
        { id: 40, title: "Final Fantasy", artist: "A.R. Rahman", cover: "assets/images/albums/who.jpg", file: "songs/song40.m4a", duration: "5:00" }
    ];

    // Default playlists
    const defaultPlaylists = [
        { name: "Your Top Songs 2024", description: "Your personal soundtrack of the year", count: 40 },
        { name: "Discover Weekly", description: "Fresh music picks just for you", count: 30 },
        { name: "Daily Mix 1", description: "Mix of Pritam and Arijit Singh", count: 25 },
        { name: "Daily Mix 2", description: "Bollywood hits and more", count: 28 },
        { name: "Chill Vibes", description: "Relax and unwind", count: 20 },
        { name: "Workout Energy", description: "High energy tracks for your workout", count: 35 }
    ];

    // ===== INITIALIZATION =====
    function init() {
        // Set initial playlist
        currentPlaylist = [...songs];
        originalPlaylist = [...songs];
        
        // Generate song cards
        renderSongCards();
        
        // Generate playlists
        renderPlaylists();
        
        // Load recently played
        renderRecentlyPlayed();
        
        // Set initial volume
        audio.volume = volumeSlider.value / 100;
        
        // Setup event listeners
        setupEventListeners();
        
        console.log('Spotify Clone initialized with', songs.length, 'songs');
    }

    // ===== RENDER FUNCTIONS =====
    function renderSongCards() {
        songsContainer.innerHTML = '';
        
        currentPlaylist.forEach((song, index) => {
            const col = document.createElement('div');
            col.className = 'col';
            
            col.innerHTML = `
                <div class="card song-card h-100" data-index="${index}">
                    <div class="position-relative overflow-hidden">
                        <img src="${song.cover}" class="card-img-top" alt="${song.title}" 
                             onerror="this.src='assets/images/default-cover.jpg'">
                        <button class="btn btn-success play-song-btn rounded-circle position-absolute" 
                                style="bottom: 10px; right: 10px; width: 45px; height: 45px; opacity: 0;">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                    <div class="card-body p-3">
                        <h6 class="card-title mb-1 text-truncate">${song.title}</h6>
                        <small class="text-secondary">${song.artist}</small>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <small class="text-tertiary">${song.duration}</small>
                            <button class="btn btn-sm btn-outline-secondary add-to-playlist-btn" 
                                    data-id="${song.id}" title="Add to playlist">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            songsContainer.appendChild(col);
        });
    }

    function renderPlaylists() {
        playlistContainer.innerHTML = '';
        
        defaultPlaylists.forEach((playlist, index) => {
            const playlistItem = document.createElement('div');
            playlistItem.className = 'playlist-item d-flex align-items-center p-2 rounded mb-1 hover-bg';
            playlistItem.style.cursor = 'pointer';
            
            playlistItem.innerHTML = `
                <div class="me-3">
                    <i class="fas fa-music text-secondary"></i>
                </div>
                <div class="flex-grow-1">
                    <div class="fw-bold">${playlist.name}</div>
                    <small class="text-secondary">${playlist.count} songs</small>
                </div>
            `;
            
            playlistItem.addEventListener('click', () => {
                // In a real app, this would load the playlist
                alert(`Loading playlist: ${playlist.name}`);
            });
            
            playlistContainer.appendChild(playlistItem);
        });
    }

    function renderRecentlyPlayed() {
        recentlyPlayedContainer.innerHTML = '';
        
        if (recentlyPlayed.length === 0) {
            recentlyPlayedContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-music fa-3x text-secondary mb-3"></i>
                    <p class="text-secondary">No recently played songs</p>
                </div>
            `;
            return;
        }
        
        // Show last 6 recently played songs
        const recentSongs = recentlyPlayed.slice(-6).reverse();
        
        recentSongs.forEach(song => {
            const col = document.createElement('div');
            col.className = 'col-6 col-md-4 col-lg-2 mb-3';
            
            col.innerHTML = `
                <div class="card bg-dark border-0">
                    <img src="${song.cover}" class="card-img-top rounded" alt="${song.title}">
                    <div class="card-body p-2">
                        <h6 class="card-title mb-0 text-truncate">${song.title}</h6>
                        <small class="text-secondary">${song.artist}</small>
                    </div>
                </div>
            `;
            
            col.addEventListener('click', () => playSong(song));
            recentlyPlayedContainer.appendChild(col);
        });
    }

    // ===== PLAYBACK FUNCTIONS =====
    function playSong(song, index = null) {
        if (index !== null) {
            currentSongIndex = index;
        } else {
            currentSongIndex = currentPlaylist.findIndex(s => s.id === song.id);
        }
        
        if (currentSongIndex === -1) {
            currentPlaylist = [song];
            currentSongIndex = 0;
        }
        
        const currentSong = currentPlaylist[currentSongIndex];
        
        // Update UI
        nowPlayingTitle.textContent = currentSong.title;
        nowPlayingArtist.textContent = currentSong.artist;
        nowPlayingCover.src = currentSong.cover;
        
        // Set audio source and play
        audio.src = currentSong.file;
        audio.play();
        
        // Show music player
        musicPlayer.style.display = 'block';
        
        // Update play button
        playIcon.className = 'fas fa-pause';
        
        // Add to recently played
        addToRecentlyPlayed(currentSong);
        
        // Update active state on cards
        updateActiveCard();
    }

    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playIcon.className = 'fas fa-pause';
        } else {
            audio.pause();
            playIcon.className = 'fas fa-play';
        }
    }

    function playNext() {
        if (currentPlaylist.length === 0) return;
        
        if (isRepeating) {
            audio.currentTime = 0;
            audio.play();
            return;
        }
        
        if (currentSongIndex < currentPlaylist.length - 1) {
            playSong(currentPlaylist[currentSongIndex + 1], currentSongIndex + 1);
        } else {
            // End of playlist
            playSong(currentPlaylist[0], 0);
        }
    }

    function playPrevious() {
        if (currentPlaylist.length === 0) return;
        
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
            return;
        }
        
        if (currentSongIndex > 0) {
            playSong(currentPlaylist[currentSongIndex - 1], currentSongIndex - 1);
        } else {
            playSong(currentPlaylist[currentPlaylist.length - 1], currentPlaylist.length - 1);
        }
    }

    function shufflePlaylist() {
        isShuffled = !isShuffled;
        
        if (isShuffled) {
            // Shuffle the playlist
            const shuffled = [...originalPlaylist];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            currentPlaylist = shuffled;
            shuffleBtn.style.color = 'var(--spotify-green)';
        } else {
            // Restore original order
            currentPlaylist = [...originalPlaylist];
            shuffleBtn.style.color = '';
        }
        
        renderSongCards();
        setupSongCardListeners();
    }

    function toggleRepeat() {
        isRepeating = !isRepeating;
        repeatBtn.style.color = isRepeating ? 'var(--spotify-green)' : '';
    }

    // ===== HELPER FUNCTIONS =====
    function addToRecentlyPlayed(song) {
        // Remove if already exists
        const existingIndex = recentlyPlayed.findIndex(s => s.id === song.id);
        if (existingIndex !== -1) {
            recentlyPlayed.splice(existingIndex, 1);
        }
        
        // Add to beginning
        recentlyPlayed.push(song);
        
        // Keep only last 20 songs
        if (recentlyPlayed.length > 20) {
            recentlyPlayed = recentlyPlayed.slice(-20);
        }
        
        // Save to localStorage
        localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
        
        // Update UI
        renderRecentlyPlayed();
    }

    function updateActiveCard() {
        // Remove active class from all cards
        document.querySelectorAll('.song-card').forEach(card => {
            card.classList.remove('active');
        });
        
        // Add active class to current song card
        const currentCard = document.querySelector(`.song-card[data-index="${currentSongIndex}"]`);
        if (currentCard) {
            currentCard.classList.add('active');
        }
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // ===== EVENT LISTENERS SETUP =====
    function setupEventListeners() {
        // Play/Pause button
        playPauseBtn.addEventListener('click', togglePlayPause);
        
        // Next/Previous buttons
        nextBtn.addEventListener('click', playNext);
        prevBtn.addEventListener('click', playPrevious);
        
        // Shuffle button
        shuffleBtn.addEventListener('click', shufflePlaylist);
        
        // Repeat button
        repeatBtn.addEventListener('click', toggleRepeat);
        
        // Volume slider
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value / 100;
        });
        
        // Progress bar click
        document.querySelector('.progress').addEventListener('click', (e) => {
            const progressBar = e.currentTarget;
            const clickPosition = e.offsetX;
            const totalWidth = progressBar.clientWidth;
            const percentage = clickPosition / totalWidth;
            
            audio.currentTime = audio.duration * percentage;
        });
        
        // Audio events
        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;
            currentTimeEl.textContent = formatTime(audio.currentTime);
        });
        
        audio.addEventListener('loadedmetadata', () => {
            totalTimeEl.textContent = formatTime(audio.duration);
        });
        
        audio.addEventListener('ended', playNext);
        
        // Sort songs
        sortSelect.addEventListener('change', (e) => {
            const sortBy = e.target.value;
            let sortedSongs = [...songs];
            
            switch (sortBy) {
                case 'name':
                    sortedSongs.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'artist':
                    sortedSongs.sort((a, b) => a.artist.localeCompare(b.artist));
                    break;
                case 'date':
                    // For demo, sort by ID (assuming newer songs have higher IDs)
                    sortedSongs.sort((a, b) => b.id - a.id);
                    break;
            }
            
            currentPlaylist = sortedSongs;
            renderSongCards();
            setupSongCardListeners();
        });
        
        // Shuffle all button
        shuffleAllBtn.addEventListener('click', () => {
            shufflePlaylist();
            if (currentPlaylist.length > 0) {
                const randomIndex = Math.floor(Math.random() * currentPlaylist.length);
                playSong(currentPlaylist[randomIndex], randomIndex);
            }
        });
        
        // Setup song card listeners
        setupSongCardListeners();
    }

    function setupSongCardListeners() {
        // Play buttons on song cards
        document.querySelectorAll('.play-song-btn').forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                playSong(currentPlaylist[index], index);
            });
        });
        
        // Whole card click
        document.querySelectorAll('.song-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                playSong(currentPlaylist[index], index);
            });
        });
        
        // Add to playlist buttons
        document.querySelectorAll('.add-to-playlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const songId = parseInt(btn.dataset.id);
                const song = songs.find(s => s.id === songId);
                
                // In a real app, this would open a modal to select playlist
                alert(`Added "${song.title}" to your Liked Songs`);
            });
        });
    }

    // ===== INITIALIZE APP =====
    init();
});

// Handle image loading errors
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'assets/images/default-cover.jpg';
    }
}, true);
