document.addEventListener("DOMContentLoaded", function () {
    const timerElement = document.getElementById("timer");
    const formElement = document.getElementById("test-form");
    let timeLeft = 180; // 3 minutes in seconds
    let timerInterval; // To store the interval reference
    let isTimeUp = false; // To prevent repeated actions

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft > 0) {
            timeLeft--;
        } else if (!isTimeUp) {
            isTimeUp = true; // Ensure this block runs only once
            clearInterval(timerInterval); // Stop the timer

            alert("Time's up! You will now be redirected to the leaderboard.");
            
            // Disable all inputs in the form
            const inputs = formElement.querySelectorAll("input");
            inputs.forEach(input => input.disabled = true);

            // Automatically submit the form to calculate results
            formElement.dispatchEvent(new Event("submit"));

            // Redirect to the leaderboard
            setTimeout(() => {
                window.location.href = "leaderboard.html";
            }, 2000); // Delay for 2 seconds to let the alert and submission finish
        }
    }

    timerInterval = setInterval(updateTimer, 1000); // Start the timer
    updateTimer(); // Initial call to display the timer immediately
});
