let audio = new Audio(); // Create a single audio instance
let isDragging = false;

function playSong(songUrl) {
    audio.src = songUrl;
    audio.play();
    updateMetadata(songUrl);
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    updatePlayPauseButton();
}

function updatePlayPauseButton() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    playPauseBtn.innerHTML = audio.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
}

function nextSong() {
    // Your logic for playing the next song goes here
}

function updateMetadata(songUrl) {
    document.getElementById('currentSong').textContent = `Now Playing: ${getSongName(songUrl)}`;
}

function getSongName(songUrl) {
    // Extract and return the song name from the URL or use any naming logic
    // For example, you can split the URL and get the last part as the song name
    const parts = songUrl.split('/');
    return parts[parts.length - 1];
}

audio.addEventListener('timeupdate', updateTimeline);

function updateTimeline() {
    const currentTime = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);

    const progress = (audio.currentTime / audio.duration) * 100;
    if (!isDragging) {
        document.getElementById('timeline').value = progress;
    }

    document.getElementById('currentSong').textContent = `Now Playing: ${currentTime} / ${duration}`;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

const timelineInput = document.getElementById('timeline');
timelineInput.addEventListener('input', handleTimelineInput);
timelineInput.addEventListener('mousedown', () => isDragging = true);
timelineInput.addEventListener('mouseup', () => isDragging = false);

function handleTimelineInput() {
    const seekTime = (timelineInput.value / 100) * audio.duration;
    audio.currentTime = seekTime;
}

// Your existing functions (e.g., prevSong) go here
