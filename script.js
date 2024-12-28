let scrollAmount = 0;
const scrollStep = 300;

// Function to scroll left
function scrollLeft() {
    const container = document.querySelector('.infome-list');
    scrollAmount -= scrollStep;
    if (scrollAmount < 0) {
        scrollAmount = 0;
    }
    container.scrollLeft = scrollAmount; // Directly adjusting scrollLeft
}

// Function to scroll right
function scrollRight() {
    const container = document.querySelector('.infome-list');
    const maxScroll = container.scrollWidth - container.clientWidth;
    scrollAmount += scrollStep;
    if (scrollAmount > maxScroll) {
        scrollAmount = maxScroll;
    }
    container.scrollLeft = scrollAmount; // Directly adjusting scrollLeft
}

// Stop all currently playing sounds
function stopAllSounds() {
    correctSound.pause();
    correctSound.currentTime = 0;
    wrongSound.pause();
    wrongSound.currentTime = 0;
    finishSound.pause();
    finishSound.currentTime = 0;
}

// Reset sound and play it
function resetAndPlaySound(sound) {
    sound.play();
}

// Handle drop event for answers
dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropZone.style.borderColor = "#6a11cb";

    const selectedValue = event.dataTransfer.getData("text/plain");

    if (selectedValue === currentQuestion.correct.toString()) {
        resetAndPlaySound(correctSound); // Play correct sound
        dropZone.classList.add("correct");
        score += 10;
        questionIndex++;
        setTimeout(() => dropZone.classList.remove("correct"), 500);
    } else {
        stopAllSounds();  // Stop any previous sounds

        resetAndPlaySound(wrongSound); // Play wrong sound immediately
        dropZone.classList.add("wrong");
        lives -= 1;
        setTimeout(() => dropZone.classList.remove("wrong"), 500);
    }

    updateScore();
    updateLives();

    if (lives > 0) {
        setTimeout(getRandomQuestion, 1000);
    } else {
        showGameOver(); // Trigger game over when lives are exhausted
    }
});

function showGameOver() {
    finishSound.play();
    gameOverMessage.style.display = "block";
    retryButton.style.display = "block";
    optionsContainer.style.display = "none";
    dropZone.style.display = "none";

    // Hide question and value elements
    document.getElementById("conversionQuestion").style.display = "none";
    document.getElementById("conversionValue").style.display = "none";
}

function showCongrats() {
    finishSound.play();
    congratsMessage.style.display = "block";
    retryButton.style.display = "block";
    optionsContainer.style.display = "none";
    dropZone.style.display = "none";

    // Hide question and value elements
    document.getElementById("conversionQuestion").style.display = "none";
    document.getElementById("conversionValue").style.display = "none";
}




// Retry the game
retryButton.addEventListener("click", () => {
    score = 0;
    lives = 3;
    questionIndex = 0;
    updateScore();
    updateLives();
    
    // Reset visibility
    gameOverMessage.style.display = "none";
    congratsMessage.style.display = "none";
    retryButton.style.display = "none";
    optionsContainer.style.display = "flex";
    dropZone.style.display = "block";

    document.getElementById("conversionQuestion").style.display = "block";
    document.getElementById("conversionValue").style.display = "block";

    getRandomQuestion();
});




// Scroll functions for infome-list container
function scrollLeft() {
    const container = document.querySelector('.infome-list');
    scrollAmount -= scrollStep;
    if (scrollAmount < 0) {
        scrollAmount = 0;
    }
    container.scrollLeft = scrollAmount; // Directly adjusting scrollLeft
}

function scrollRight() {
    const container = document.querySelector('.infome-list');
    const maxScroll = container.scrollWidth - container.clientWidth;
    scrollAmount += scrollStep;
    if (scrollAmount > maxScroll) {
        scrollAmount = maxScroll;
    }
    container.scrollLeft = scrollAmount; // Directly adjusting scrollLeft
}
