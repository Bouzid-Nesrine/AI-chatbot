import OllamaService from './OllamaService';

class AppModel {
    constructor() {
        this.data = {
            messages: [],
            inputText: '',
            isTyping: false,
            themeColor: '#f8b6d2'  // Default pink color
        };
        this.ollamaService = new OllamaService();
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

    updateThemeColor(color) {
        this.data.themeColor = color;
        return this.data;
    }

    async getBotResponse(userMessage) {
        try {
            this.data.isTyping = true;
            const response = await this.ollamaService.generateResponse(userMessage);
            this.data.isTyping = false;
            return response;
        } catch (error) {
            console.error('Error getting bot response:', error);
            this.data.isTyping = false;
            return "I apologize, but I'm having trouble generating a response right now. Please try again.";
        }
    }

    updateInputText(text) {
        this.data.inputText = text;
        return this.data;
    }
}

export default AppModel;
