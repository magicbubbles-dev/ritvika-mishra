// Shared music player functionality across all pages
document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isPlaying = false;

    if (!musicToggle || !backgroundMusic) return; // Exit if elements don't exist

    // Load music state from localStorage
    const musicState = localStorage.getItem('musicPlaying');
    const musicTime = localStorage.getItem('musicTime');
    
    if (musicState === 'true') {
        backgroundMusic.currentTime = parseFloat(musicTime) || 0;
        backgroundMusic.play().then(() => {
            isPlaying = true;
            musicToggle.textContent = '🎶';
            musicToggle.classList.add('playing');
        }).catch(e => {
            console.log('Audio autoplay prevented:', e);
        });
    }

    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.textContent = '🎵';
            musicToggle.classList.remove('playing');
            localStorage.setItem('musicPlaying', 'false');
            isPlaying = false;
        } else {
            backgroundMusic.play().then(() => {
                musicToggle.textContent = '🎶';
                musicToggle.classList.add('playing');
                localStorage.setItem('musicPlaying', 'true');
                isPlaying = true;
            }).catch(e => {
                console.log('Audio play failed:', e);
                alert('Unable to play music. Please check if the audio file exists.');
            });
        }
    });

    // Save music time periodically
    backgroundMusic.addEventListener('timeupdate', function() {
        if (isPlaying) {
            localStorage.setItem('musicTime', backgroundMusic.currentTime);
        }
    });

    // Handle page unload
    window.addEventListener('beforeunload', function() {
        if (isPlaying) {
            localStorage.setItem('musicTime', backgroundMusic.currentTime);
            localStorage.setItem('musicPlaying', 'true');
        }
    });
});
