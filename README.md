# 🎧 Simple Soundboard  

A fun, interactive soundboard built using **HTML**, **CSS**, and the **JavaScript Audio API** (`new Audio()`).  
Users can tap emoji-based tiles to play sounds, adjust volume, or mute audio. Only one sound plays at a time.

---

## 🚀 Features

### 🔊 Sound Tiles
- 🐶 Dog  
- 👏🏻 Clap  
- ✨ Pop  
- 😂 Laugh  
- 💥 Blast  
- 🥁 Drum  
- 📸 Camera  
- 📣 Horn  
- 🔔 Bell  
- 🌀 Thud  
- 🌩️ Thunder  
- 🌧️ Rain  
- ⛈️ Thunderstorm  
- 🌬️ Wind  
- 🌊 Ocean  
- 🕊️ Birds  
- 🐓 Rooster  
- 🐱 Cat  
- 🐴 Horse  
- 🐺 Wolf  

Each tile:
- Plays instantly  
- Stops previous sound  
- Highlights while playing  
- Animates on hover  

### 🎚️ Volume Controls
- Adjustable slider  
- Mute / Unmute button  
- Dynamic volume icons (mute → low → medium → high)  

### 🎨 Modern UI
- Clean glassmorphism-inspired design  
- Fully responsive  
- Emoji-based icons  
- Smooth hover & active animations  

---

## 🧩 Folder Structure

```pgsql
Soundboard_Project/
│
├── index.html
├── script.js
├── style.css
│
└── sounds/
    ├── bell.mp3
    ├── birds.mp3
    ├── blast.mp3
    ├── camera.mp3
    ├── cat.mp3
    ├── clap.mp3
    ├── dog.mp3
    ├── drum.mp3
    ├── horn.mp3
    ├── horse.mp3
    ├── laugh.mp3
    ├── ocean.mp3
    ├── pop.mp3
    ├── rain.mp3
    ├── rooster.mp3
    ├── thud.mp3
    ├── thunder.mp3
    ├── thunderstorm.mp3
    ├── wind.mp3
    └── wolf.mp3
```

---

## 🛠️ Technologies Used
- **HTML5**
- **CSS3**
- **JavaScript (Audio API)**

---

## ⚡ How It Works

### ▶️ Playing Sounds
The script uses:

```js
const sound = new Audio("sounds/dog.mp3");
sound.play();
```

Before playing a new sound, the app calls:

```js
sound.pause();
sound.currentTime = 0;

```

This ensures only one sound plays at a time.

---

### 🎚️ Volume
Volume value (0.0 → 1.0):
```js
sound.volume = currentVolume;
```
A function updates the volume icon depending on the slider value.

---

## 🔧 Setup & Usage

1. Clone the repository:
```sh
git clone https://github.com/PLayerNightQueen16/Soundboard_Project.git
```

2. Open the folder:
```bash
cd Soundboard_Project
```

3. Open index.html in a browser
(Just double-click it!)

---

## 📦 Future Improvements
- Add more sounds
- Add keyboard shortcuts
- Add sound categories (Animals, Effects, Funny)
- Add a download button
- Add light/dark theme toggle 🌗

---

## 📜 License

This project is open for personal or educational use.
Attribution is appreciated but not required.

---

## 👩‍💻 Author

Shreya Pal
Built as a fun interactive front-end project using the Web Audio API.
Open to futhur contributions!!
