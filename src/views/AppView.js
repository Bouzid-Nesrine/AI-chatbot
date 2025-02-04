import React, { Component, createRef } from 'react';
import '../styles/App.css';

class AppView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            inputText: '',
            isDarkMode: false,
            isTyping: false
        };
        this.messagesEndRef = createRef();
    }

    setPresenter(presenter) {
        this.presenter = presenter;
    }

    updateState(newState) {
        this.setState(newState, this.scrollToBottom);
        // Update body class when theme changes
        document.body.className = newState.isDarkMode ? 'dark-mode' : 'light-mode';
    }

    scrollToBottom = () => {
        this.messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    handleInputChange = (e) => {
        this.presenter.handleAction('UPDATE_INPUT', e.target.value);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const message = this.state.inputText.trim();
        if (message) {
            this.presenter.handleAction('SEND_MESSAGE', message);
        }
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.handleSubmit(e);
        }
    }

    toggleTheme = () => {
        this.presenter.handleAction('TOGGLE_THEME');
    }

    render() {
        const { messages, inputText, isDarkMode, isTyping } = this.state;

        return (
            <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="chat-header">
                    <h1>AI Chatbot</h1>
                    <button onClick={this.toggleTheme} className="theme-toggle">
                        {isDarkMode ? '☀️' : '🌙'}
                    </button>
                </div>
                
                <div className="chat-messages">
                    {messages.map(msg => (
                        <div key={msg.id} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
                            <div className="message-content">
                                <p>{msg.text}</p>
                                <span className="timestamp">{msg.timestamp}</span>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="message bot">
                            <div className="message-content">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={this.messagesEndRef} />
                </div>

                <form onSubmit={this.handleSubmit} className="chat-input">
                    <textarea
                        value={inputText}
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress}
                        placeholder="Type your message..."
                        rows="1"
                    />
                    <button type="submit" disabled={!inputText.trim()}>
                        Send
                    </button>
                </form>
            </div>
        );
    }
}

export default AppView;
