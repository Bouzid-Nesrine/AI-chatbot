class OllamaService {
    constructor() {
        this.API_URL = 'http://localhost:11434/api/generate';
    }

    async generateResponse(prompt, maxTokens = 100) {
        try {
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: "llama3.2",
                    prompt: prompt,
                    stream: false,
                    options: {
                        num_predict: maxTokens,
                        temperature: 0.7,
                        top_k: 40,
                        top_p: 0.9
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Error calling Ollama API:', error);
            return "I apologize, but I'm having trouble connecting to my language model right now. Please try again in a moment.";
        }
    }
}

export default OllamaService;
