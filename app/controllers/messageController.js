import Message from '../models/messages';
const { MongoClient } = require('mongodb');
const url = process.env.DATABASE_URL;
const dbName = 'chatwave';
let db;
async function connectToDatabase() {
  const client = new MongoClient("mongodb+srv://maneprathamesh019:maneprathamesh019@cluster0.6tn2owo.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp");
  try {
    await client.connect();
    db = client.db(dbName); // Set the db variable
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; // Propagate the error to the calling code
  }
}

function getDatabase() {
  return db;
}

const saveMessage = async (message) => {
  try {
    const newMessage = await Message.create(message);
    console.log('Message saved to the database', message);
  } catch (error) {
    console.error('Error saving message to the database:', error);
    throw error;
  }
};


async function getAllMessages() {
  const database = getDatabase();

  if (database) {
    try {
      const messagesCollection = database.collection('messages');
      const messages = await messagesCollection.find().toArray();
      return messages;
    } catch (error) {
      console.error('Error retrieving messages from the database:', error);
      throw error; // Propagate the error to the calling code
    }
  }

  return [];
}

module.exports = { connectToDatabase, saveMessage, getAllMessages };