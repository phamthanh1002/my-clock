const hourHand = document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");
const secondHand = document.getElementById("second-hand");

const audioList = [
  "./sounds/Lukrembo - Marshmallow (freetouse.com).mp3",
  "./sounds/Lukrembo - Biscuit (freetouse.com).mp3",
  "./sounds/Lukrembo - This Is For You (freetouse.com).mp3",
  "./sounds/Lukrembo - Travel (freetouse.com).mp3",
  "./sounds/Lukrembo - Bread (freetouse.com).mp3",
  "./sounds/Lukrembo - Donut (freetouse.com).mp3",
  "./sounds/Lukrembo - Rose (freetouse.com).mp3",
  "./sounds/Lukrembo - Sunflower (freetouse.com).mp3",
  "./sounds/Lukrembo - Sunset (freetouse.com).mp3",
  "./sounds/Pufino - Vibing (freetouse.com).mp3",
];

let currentAudioIndex = 0;
let audio = new Audio(audioList[currentAudioIndex]);
let clickAudioButton = document.querySelector(".btn.play");
let isPlaying = false;

function clockTick() {
  const date = new Date();
  const seconds = date.getSeconds() / 60;
  const minutes = (seconds + date.getMinutes()) / 60;
  const hours = (minutes + date.getHours()) / 12;

  rotateClockHand(secondHand, seconds);
  rotateClockHand(minuteHand, minutes);
  rotateClockHand(hourHand, hours);
}

function rotateClockHand(element, rotation) {
  element.style.setProperty("--rotate", rotation * 360);
}

function playNextAudio() {
  currentAudioIndex = (currentAudioIndex + 1) % audioList.length;
  audio.src = audioList[currentAudioIndex];
  audio.play();
  isPlaying = true;
}

function toggleAudioPlayback() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play();
    isPlaying = true;
  }
  updatePlayPauseIcon();
}

function updatePlayPauseIcon() {
  clickAudioButton.innerHTML = isPlaying
    ? '<i class="bi bi-pause-circle-fill"></i>'
    : '<i class="bi bi-play-circle-fill"></i>';
}

function playAudio() {
  audio.loop = false;
  audio.play();
  isPlaying = true;
  updatePlayPauseIcon();

  audio.addEventListener("ended", playNextAudio);
}

window.onload = function () {
  playAudio();
  setInterval(clockTick, 1000);
  clickAudioButton.addEventListener("click", toggleAudioPlayback);
};
