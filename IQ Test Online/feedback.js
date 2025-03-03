document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById("feedback-form");
    const feedbackListContainer = document.createElement("div");
    feedbackListContainer.classList.add("feedback-list");
    document.querySelector(".feedback").appendChild(feedbackListContainer);

    // Load feedback from localStorage
    let feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];

    function displayFeedback() {
        feedbackListContainer.innerHTML = "<h3>All Feedback</h3>";
        if (feedbackList.length === 0) {
            feedbackListContainer.innerHTML += "<p>No feedback available yet.</p>";
        } else {
            feedbackList.forEach(entry => {
                const feedbackItem = document.createElement("div");
                feedbackItem.classList.add("feedback-item");
                feedbackItem.innerHTML = `<strong>${entry.name}:</strong> <p>${entry.feedback}</p>`;
                feedbackListContainer.appendChild(feedbackItem);
            });
        }
    }

    displayFeedback();

    feedbackForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = event.target.name.value.trim();
        const feedback = event.target.feedback.value.trim();

        if (name && feedback) {
            const newFeedback = { name, feedback };
            feedbackList.push(newFeedback);
            localStorage.setItem("feedbackList", JSON.stringify(feedbackList));
            displayFeedback();
            alert("Thank you for your feedback!");
            event.target.reset();
        }
    });
});
