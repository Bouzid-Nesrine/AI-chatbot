class AppModel {
    constructor() {
        this.data = {
            messages: [],
            inputText: '',
            isDarkMode: false
        };
    }

    getData() {
        return this.data;
    }

    addMessage(message, isUser = false) {
        const newMessage = {
            id: Date.now(),
            text: message,
            isUser,
            timestamp: new Date().toLocaleTimeString()
        };
        this.data.messages = [...this.data.messages, newMessage];
        return this.data;
    }

    getBotResponse(userMessage) {
        // Simple bot responses - you can expand this with more sophisticated logic
        const responses = [
            "That's interesting! Tell me more.",
            "I understand what you mean.",
            "How does that make you feel?",
            "Could you elaborate on that?",
            "I'm here to listen and help.",
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    updateInputText(text) {
        this.data.inputText = text;
        return this.data;
    }

    toggleTheme() {
        this.data.isDarkMode = !this.data.isDarkMode;
        return this.data;
    }
}

export default AppModel;
