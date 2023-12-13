import OpenAI from "openai";
//const express = require('express');
import express from "express";
const app = express();
const port = 3000;
const messages = []
//const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "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",
});

async function main(input){
  messages.push({role: 'user', content:input})
  console.log(messages)
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: 'gpt-3.5-turbo',
  });
  return completion.choices[0]?.message?.content
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get("/", function (_, res) {
  res.sendFile(new URL("index.html", import.meta.url).pathname);
});

app.post("/api", async function (req, res,next) {
  console.log(req.body);
  const mes = await main(req.body.input);
  res.json({success: true, message:mes});
});
app.listen(port, () => {
  console.log("Express server initialized");
});
