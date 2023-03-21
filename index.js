import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from "express";
import { MongoClient } from "mongodb";
import uniqid from 'uniqid';
const app = express();

const MONGO_URL = "mongodb://127.0.0.1";
const PORT = process.env.PORT;
const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");
const booking = [
  {
    customer_name: "bharath",
    room_name: "101",
    date: "2023-03-15",
    start_time: "09:25:16",
    end_time: "10:25:19",
    booking_id: "123",
    booking_date: "2023-03-15",
    booking_status: true,
    id: "1",
  },
  {
    customer_name: "charan",
    room_name: "102",
    date: "2023-03-16",
    start_time: "11:25:19",
    end_time: "12:25:19",
    booking_id: "124",
    booking_date: "2023-03-16",
    booking_status: true,
    id: "2",
  },

  {
    customer_name: "arun",
    room_name: "103",
    date: "2023-03-17",
    start_time: "13:25:19",
    end_time: "14:25:19",
    booking_id: "125",
    booking_date: "2023-03-17",
    booking_status: true,
    id: "3",
  },

  {
    customer_name: "rajesh",
    room_name: "104",
    date: "2023-03-18",
    start_time: "13:25:19",
    end_time: "14:25:19",
    booking_id: "126",
    booking_date: "2023-03-18",
    booking_status: false,
    id: "4",
  },

  {
    customer_name: "bharath",
    room_name: "105",
    date: "2023-03-19",
    start_time: "13:25:19",
    end_time: "14:25:19",
    booking_id: "127",
    booking_date: "2023-03-19",
    booking_status: false,
    id: "1",
  },
];

app.get("/", async function (request, response) {
  response.send(booking);
});

// list all rooms with booked data
app.get("/booked", async function (request, response) {
  const result = booking.map((e) => ({
    room_name: `${e.room_name}`,
    booking_status: `${e.booking_status}`,
    customer_name: `${e.customer_name}`,
    date: `${e.date}`,
    start_time: `${e.start_time}`,
    end_time: `${e.end_time}`,
  }));
  response.send(result);
});

// list all customers with booked data
app.get("/customers", async function (request, response) {
  const result = booking.map((e) => ({
    room_name: `${e.room_name}`,
    customer_name: `${e.customer_name}`,
    date: `${e.date}`,
    start_time: `${e.start_time}`,
    end_time: `${e.end_time}`,
  }));
  response.send(result);
});

// list a customer with booked data
app.get("/:id", async function (request, response) {
  const { id } = request.params;
  let result = booking
    .filter((e) => e.id == id)
    .map((e) => ({
      customer_name: `${e.customer_name}`,
      room_name: `${e.room_name}`,
      date: `${e.date}`,
      start_time: `${e.start_time}`,
      end_time: `${e.end_time}`,
      booking_id: `${e.booking_id}`,
      booking_date: `${e.booking_date}`,
      booking_status: `${e.booking_status}`,
    }));
  response.send(result);
});

// book a room
app.post("/add", async function (request, response) {
  // const {id}=request.params;
  const add={
    customer_name: "bharath",
    room_name: "101",
    date: `${new Date().toISOString().slice(0, 10)}`,
    start_time: "09:25:16",
    end_time: "10:25:19",
    booking_id:`${uniqid().slice(5, 9)}`,
    booking_date:`${new Date().toISOString().slice(0, 10)}`,
    booking_status: true,
    id: "5",
  }
  booking.push(add)
  response.send(booking);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
