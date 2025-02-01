import React, { Component, createRef } from 'react';
import '../styles/App.css';

class AppView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            inputText: '',
            isDarkMode: false
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
        const { messages, inputText, isDarkMode } = this.state;
        
        return (
            <div className={`chat-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                <div className="chat-header">
                    <h1>Chat Bot</h1>
                    <button 
                        className="theme-toggle"
                        onClick={this.toggleTheme}
                        aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDarkMode ? '🌞' : '🌙'}
                    </button>
                </div>
                
                <div className="messages-container">
                    {messages.map(message => (
                        <div
                            key={message.id}
                            className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
                        >
                            <div className="message-content">
                                <p>{message.text}</p>
                                <span className="timestamp">{message.timestamp}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={this.messagesEndRef} />
                </div>

                <form className="input-form" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={inputText}
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress}
                        placeholder="Type your message..."
                        className="message-input"
                    />
                    <button type="submit" className="send-button">
                        Send
                    </button>
                </form>
            </div>
        );
    }
}

export default AppView;
