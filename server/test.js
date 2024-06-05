const dotenv = require('dotenv');
dotenv.config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const getResponse = async () => {
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: "say this is a test" }
            ],
            max_tokens: 7,
            temperature: 0,
        });

        console.log(response.data);
    } catch (error) {
        console.error("Error creating completion:", error);
    }
}

getResponse();
