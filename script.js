function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    // Add user message
    addMessage(userInput, "user");

    // Get AI response
    let botResponse = getBotResponse(userInput);

    // Add bot response after a short delay
    setTimeout(() => {
        addMessage(botResponse, "bot");
    }, 500);

    // Clear input field
    document.getElementById("user-input").value = "";
}

function addMessage(text, sender) {
    let chatBox = document.getElementById("chat-box");
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);

    // Scroll chat to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(input) {
    input = input.toLowerCase();

    // Simple responses
    let responses = {
        "hi": "Hello! How can I help with your homework?",
        "hello": "Hi there! What do you need help with?",
        "what is 2 + 2": "2 + 2 is 4.",
        "who discovered gravity": "Gravity was discovered by Isaac Newton.",
        "thank you": "You're welcome! 😊",
        "bye": "Goodbye! Have a great day!"
    };

    // Default response if no match
    return responses[input] || "I'm not sure. Try rephrasing your question.";
}

// Allow pressing Enter to send message
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
