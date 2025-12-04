// --- sounds (point to your local files inside sounds/ folder) ---
const sounds = {
    dog: new Audio("sounds/dog.mp3"),
    clap: new Audio("sounds/clap.mp3"),
    pop: new Audio("sounds/pop.mp3"),
    laugh: new Audio("sounds/laugh.mp3"),
    blast: new Audio("sounds/blast.mp3"),
    drum: new Audio("sounds/drum.mp3"),
    camera: new Audio("sounds/camera.mp3"),
    horn: new Audio("sounds/horn.mp3"),
    bell: new Audio("sounds/bell.mp3"),
    thud: new Audio("sounds/thud.mp3"),
    thunder: new Audio("sounds/thunder.mp3"),
    rain: new Audio("sounds/rain.mp3"),
    thunderstorm: new Audio("sounds/thunderstorm.mp3"),
    wind: new Audio("sounds/wind.mp3"),
    ocean: new Audio("sounds/ocean.mp3"),
    birds: new Audio("sounds/birds.mp3"),
    rooster: new Audio("sounds/rooster.mp3"),
    cat: new Audio("sounds/cat.mp3"),
    horse: new Audio("sounds/horse.mp3"),
    wolf: new Audio("sounds/wolf.mp3")
};

let currentVolume = 1;
let currentPlaying = null; // the key of the currently playing sound (e.g. 'dog')

// set volume on all audio elements initially
Object.values(sounds).forEach(s => s.volume = currentVolume);

// ---- UI helpers ----
function stopAllSounds() {
    Object.entries(sounds).forEach(([key, sound]) => {
        sound.pause();
        sound.currentTime = 0;
        const btn = document.querySelector(`button[data-sound="${key}"]`);
        if (btn) btn.classList.remove("playing");
    });
    currentPlaying = null;
}

function setPlayingButton(key) {
    document.querySelectorAll(".tile.playing").forEach(el => el.classList.remove("playing"));
    const btn = document.querySelector(`button[data-sound="${key}"]`);
    if (btn) btn.classList.add("playing");
    currentPlaying = key;
}

function updateVolumeIcon(vol) {
    const icon = document.getElementById("volumeIcon");
    if (!icon) return;

    // Use simple path groups for mute / low / medium / high
    if (vol === 0) {
        icon.innerHTML = `
            <path d="M5 9v6h4l5 5V4l-5 5H5z"></path>
            <path d="M18 9l-6 6" stroke="currentColor" stroke-width="2" fill="none"></path>
            <path d="M12 9l6 6" stroke="currentColor" stroke-width="2" fill="none"></path>
        `;
        return;
    }

    if (vol > 0 && vol <= 0.33) {
        icon.innerHTML = `
            <path d="M5 9v6h4l5 5V4l-5 5H5z"></path>
            <path d="M16 12a2 2 0 010 4" stroke="currentColor" stroke-width="2" fill="none"></path>
        `;
        return;
    }

    if (vol > 0.33 && vol <= 0.66) {
        icon.innerHTML = `
            <path d="M5 9v6h4l5 5V4l-5 5H5z"></path>
            <path d="M16 10a4 4 0 010 8" stroke="currentColor" stroke-width="2" fill="none"></path>
        `;
        return;
    }

    // high
    icon.innerHTML = `
        <path d="M5 9v6h4l5 5V4l-5 5H5z"></path>
        <path d="M16 7a6 6 0 010 12" stroke="currentColor" stroke-width="2" fill="none"></path>
    `;
}

// ---- tile (sound) handling ----
document.querySelectorAll("button[data-sound]").forEach(btn => {
    btn.addEventListener("click", () => {
        const key = btn.dataset.sound;
        if (!sounds[key]) return;

        // If same sound is already playing, restart it
        if (currentPlaying === key) {
            sounds[key].currentTime = 0;
            sounds[key].play();
            return;
        }

        // stop others and play new
        stopAllSounds();

        sounds[key].volume = currentVolume;
        sounds[key].currentTime = 0;
        sounds[key].play();

        setPlayingButton(key);

        // Clear playing UI when this sound ends (one-time)
        sounds[key].addEventListener("ended", () => {
            const b = document.querySelector(`button[data-sound="${key}"]`);
            if (b) b.classList.remove("playing");
            if (currentPlaying === key) currentPlaying = null;
        }, { once: true });
    });
});

// ---- volume control UI ----
const volumeEl = document.getElementById("volume");
const volumeBtn = document.getElementById("volumeBtn");

// Ensure elements exist
if (volumeEl) {
    // initialize slider value (in case HTML sets something else)
    volumeEl.value = String(currentVolume);

    volumeEl.addEventListener("input", (e) => {
        currentVolume = parseFloat(e.target.value);
        if (Number.isNaN(currentVolume)) currentVolume = 0;
        Object.values(sounds).forEach(s => s.volume = currentVolume);
        updateVolumeIcon(currentVolume);

        // update aria-pressed for volume button (muted state)
        if (volumeBtn) volumeBtn.setAttribute("aria-pressed", currentVolume === 0 ? "true" : "false");
    });
}

// volume button (acts as mute / unmute toggle)
if (volumeBtn) {
    // reflect initial icon
    updateVolumeIcon(currentVolume);
    volumeBtn.setAttribute("aria-pressed", currentVolume === 0 ? "true" : "false");

    volumeBtn.addEventListener("click", () => {
        if (currentVolume === 0) {
            // unmute — restore to 1 (you could store previous volume if desired)
            currentVolume = 1;
            if (volumeEl) volumeEl.value = String(currentVolume);
            volumeBtn.setAttribute("aria-pressed", "false");
        } else {
            // mute
            currentVolume = 0;
            if (volumeEl) volumeEl.value = "0";
            volumeBtn.setAttribute("aria-pressed", "true");
        }
        Object.values(sounds).forEach(s => s.volume = currentVolume);
        updateVolumeIcon(currentVolume);
    });
}

// Auto-change Thunderstorm label on small screens
function updateThunderstormLabel() {
    const thunderBtn = document.querySelector('.tile[data-sound="thunderstorm"]');
    if (!thunderBtn) return;

    const label = thunderBtn.querySelector('.tile-label');
    if (!label) return;

    if (window.innerWidth < 480) {
        label.textContent = "Thunder Storm";
    } else {
        label.textContent = "Thunderstorm";
    }
}

// Run on page load
updateThunderstormLabel();

// Run on window resize
window.addEventListener("resize", updateThunderstormLabel);
