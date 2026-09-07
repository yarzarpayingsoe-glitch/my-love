document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Music Player Logic ---
  const bgMusic = document.getElementById("bg-music");
  const startBtn = document.getElementById("startBtn");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const playIcon = playPauseBtn.querySelector("i");
  let isPlaying = false;

  // Start Our Story Button handles smooth scroll AND playing music
  startBtn.addEventListener("click", () => {
    // Play music
    bgMusic
      .play()
      .then(() => {
        isPlaying = true;
        playIcon.classList.remove("fa-play");
        playIcon.classList.add("fa-pause");
      })
      .catch((err) => console.log("Audio play failed:", err));

    // Smooth scroll to memories
    document.getElementById("memories").scrollIntoView({ behavior: "smooth" });
  });

  // Toggle Music from Player
  playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
      bgMusic.pause();
      playIcon.classList.remove("fa-pause");
      playIcon.classList.add("fa-play");
    } else {
      bgMusic.play();
      playIcon.classList.remove("fa-play");
      playIcon.classList.add("fa-pause");
    }
    isPlaying = !isPlaying;
  });

  // --- 2. Love Counter Logic ---
  // CHANGE THIS DATE to your actual anniversary date (Format: YYYY-MM-DDTHH:MM:SS)
  const startDate = new Date("2026-04-21T11:21:50").getTime();

  function updateCounter() {
    const now = new Date().getTime();
    const difference = now - startDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }

  setInterval(updateCounter, 1000);
  updateCounter(); // initial call

  // --- 3. Scroll Reveal Animation ---
  const fadeElements = document.querySelectorAll(".fade-in-element");
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => observer.observe(el));

  // --- 4. Floating Hearts Generator (Background) ---
  function createHeart() {
    const heart = document.createElement("i");
    heart.classList.add("fas", "fa-heart", "floating-heart");

    // Randomize size, position, and duration
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 5 + 5 + "s";
    heart.style.fontSize = Math.random() * 20 + 10 + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 10000);
  }

  setInterval(createHeart, 500);

  // --- 5. Surprise Modal Confetti ---
  const surpriseModal = document.getElementById("surpriseModal");
  surpriseModal.addEventListener("shown.bs.modal", () => {
    const modalContainer = document.getElementById("modal-confetti-container");
    for (let i = 0; i < 30; i++) {
      let confetti = document.createElement("i");
      confetti.classList.add("fas", "fa-heart", "text-danger");
      confetti.style.position = "absolute";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.top = "-20px";
      confetti.style.fontSize = Math.random() * 15 + 10 + "px";
      confetti.style.opacity = Math.random();
      confetti.style.transition = "all 2s ease-in";

      modalContainer.appendChild(confetti);

      setTimeout(() => {
        confetti.style.top = "100%";
        confetti.style.opacity = "0";
      }, 50);

      setTimeout(() => {
        confetti.remove();
      }, 2000);
    }
  });
});
