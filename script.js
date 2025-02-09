document.getElementById("send-btn").addEventListener("click", function() {
    const userInput = document.getElementById("user-input").value;
    if (userInput) {
        sendMessage(userInput);
        document.getElementById("user-input").value = '';
    }
});

document.getElementById("upload-btn").addEventListener("click", function() {
    const fileInput = document.getElementById("upload-photo");
    const file = fileInput.files[0];
    if (file) {
        uploadPhoto(file);
    }
});

function sendMessage(message) {
    const messagesDiv = document.getElementById("messages");
    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.innerText = message;
    messagesDiv.appendChild(userMessage);

    // Call AI backend to get response (text-based question)
    fetch('YOUR_BACKEND_URL/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: message })
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = document.createElement("div");
        botMessage.className = "bot-message";
        botMessage.innerText = data.answer;
        messagesDiv.appendChild(botMessage);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
}

function uploadPhoto(file) {
    const formData = new FormData();
    formData.append("photo", file);

    // Call backend to process image (OCR)
    fetch('YOUR_BACKEND_URL/solve', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const messagesDiv = document.getElementById("messages");
        const botMessage = document.createElement("div");
        botMessage.className = "bot-message";
        botMessage.innerText = data.solution;
        messagesDiv.appendChild(botMessage);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
}
