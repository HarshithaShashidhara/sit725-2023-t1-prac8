import { MongoClient } from "mongodb";

const uri = "mongodb+srv://harshitha28111999:StGl7GWh6aLYeB83@cluster0.myn2ntp.mongodb.net/";
const client = new MongoClient(uri);

let collection;

export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully");
        const database = client.db("cards");
        collection = database.collection("Cat");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export function getCollection() {
    return collection;
}
