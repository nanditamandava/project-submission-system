import express from "express";

const app = express();

app.get("/", (req, res) => {
    console.log("Request received");
    res.send("Hello!");
});

app.listen(5000, () => {
    console.log("Listening...");
});