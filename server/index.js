const { NlpManager } = require('node-nlp');
const express = require('express');
const cors = require('cors');

const domainManagers = {
  'en': new NlpManager({ languages: ['en'] }),
  // Add other locale domain managers as needed
};

const app = express();
app.use(cors()); // Allow cross-origin requests

/**
 * Function to get the domain manager for a specified locale
 * @param {string} locale - The locale identifier (e.g., 'en')
 * @returns {Object} - The domain manager for the specified locale
 * @throws {Error} - If no domain manager is found for the specified locale
 */
function getDomainManager(locale) {
  const domainManager = domainManagers[locale];
  if (!domainManager) {
    throw new Error(`Domain Manager not found for locale ${locale}`);
  }
  return domainManager;
}

try {
  const locale = 'en'; // Example locale
  const manager = getDomainManager(locale);

  // Add documents
  manager.addDocument('en', 'hello', 'greeting');
  manager.addDocument('en', 'hi', 'greeting');
  manager.addDocument('en', 'hey you', 'greeting');
  manager.addDocument('en', 'good morning', 'greeting');
  manager.addDocument('en', 'good afternoon', 'greeting');
  manager.addDocument('en', 'good day', 'greeting');

  manager.addDocument('en', 'good bye for now', 'greetings.bye');
  manager.addDocument('en', 'bye bye take care', 'greetings.bye');
  manager.addDocument('en', 'okay see you later', 'greetings.bye');
  manager.addDocument('en', 'bye for now', 'greetings.bye');
  manager.addDocument('en', 'i must go', 'greetings.bye');

  // Add answers
  manager.addAnswer('en', 'greeting', 'Hey!');
  manager.addAnswer('en', 'greeting', 'Hey there');
  manager.addAnswer('en', 'greeting', 'Hi');
  manager.addAnswer('en', 'greeting', 'yo whatsup!');

  manager.addAnswer('en', 'greetings.bye', 'till next time');
  manager.addAnswer('en', 'greetings.bye', 'see you soon!');

  // Train model
  manager.train().then(async () => {
    manager.save();
    console.log('Training completed and model saved.');

    // Route to handle incoming messages
    app.get('/bot', async (req, res) => {
        try {
          const response = await manager.process('en', req.query.message);
          console.log(`Received message: ${req.query.message}`);
          console.log(`Response from NLP manager:`, response);
          res.send(response);
        } catch (error) {
          console.error('Error processing message:', error);
          res.status(500).send('Internal Server Error');
        }
      });
      

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  });
} catch (error) {
  console.error(error.message);
}
