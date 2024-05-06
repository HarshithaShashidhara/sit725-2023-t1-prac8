// card.js

const { getCollection } = require("../database");

const collection = getCollection("Cat"); // Assuming "Cat" is the collection name

module.exports = {
    insertCard: async (card) => {
        try {
            await collection.insertOne(card);
        } catch (error) {
            console.error("Error inserting card:", error);
            throw error;
        }
    },
    getCards: async () => {
        try {
            return await collection.find({}).toArray();
        } catch (error) {
            console.error("Error fetching cards:", error);
            throw error;
        }
    }
};
