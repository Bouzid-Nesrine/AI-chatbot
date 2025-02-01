class AppPresenter {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        this.view.setPresenter(this);
        this.updateView();
    }

    updateView() {
        const data = this.model.getData();
        this.view.updateState(data);
    }

    handleAction(action, payload) {
        switch (action) {
            case 'SEND_MESSAGE':
                if (payload.trim()) {
                    // Add user message
                    this.model.addMessage(payload, true);
                    this.updateView();
                    
                    // Clear input
                    this.model.updateInputText('');
                    this.updateView();

                    // Get and add bot response after a short delay
                    setTimeout(() => {
                        const botResponse = this.model.getBotResponse(payload);
                        this.model.addMessage(botResponse, false);
                        this.updateView();
                    }, 1000);
                }
                break;

            case 'UPDATE_INPUT':
                this.model.updateInputText(payload);
                this.updateView();
                break;

            case 'TOGGLE_THEME':
                this.model.toggleTheme();
                this.updateView();
                break;

            default:
                console.warn('Unknown action:', action);
        }
    }
}

export default AppPresenter;
