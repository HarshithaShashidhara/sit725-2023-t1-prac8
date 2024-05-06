// cardController.js

import { getCollection } from "../database.js";

const collection = getCollection("Cat");

export const insertCard = async (card) => {
    try {
        await collection.insertOne(card);
    } catch (error) {
        console.error("Error inserting card:", error);
        throw error;
    }
};

export const getCards = async () => {
    try {
        return await collection.find({}).toArray();
    } catch (error) {
        console.error("Error fetching cards:", error);
        throw error;
    }
};
