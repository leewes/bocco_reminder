const express = require("express");
const axios = require("axios");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const translate = require('translate-google');

let accessToken;
let roomUuid;

async function getAccessToken() {
  const res = await axios.post(
    "https://platform-api.bocco.me/oauth/token/refresh",
    {
      refresh_token: `${process.env.REFRESH_TOKEN}`,
    }
  );

  accessToken = res.data.access_token;
}

async function getRoomUuid() {
  await getAccessToken();

  const res = await axios.get("https://platform-api.bocco.me/v1/rooms", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  roomUuid = await res.data.rooms[0].uuid;
}

async function getMessage() {
  await getRoomUuid();

  try {
    const res = await axios.get(
      `https://platform-api.bocco.me/v1/rooms/${roomUuid}/messages`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("👍res.data: ", res.data.messages[0].message.ja);
  } catch (err) {
    console.log(err);
  }
}

async function setupWebhookUrl() {
  await getAccessToken();

  const res = await axios.post(
    "https://platform-api.bocco.me/v1/webhook",
    {
      description: "test webhook",
      url: `${process.env.URL}`,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("🌸setupWebhookUrl res :", res.data);
}

setupWebhookUrl();

async function setupWebhookEvent() {
  await getAccessToken();

  const res = await axios.put(
    "https://platform-api.bocco.me/v1/webhook/events",
    {
      events: ["message.received"],
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log("🤖setupWebhookEvent res :", res.data);
}

setupWebhookEvent();

app.use(express.json());

async function sendMessage(message) {
  await getRoomUuid();

  await axios.post(
    `https://platform-api.bocco.me/v1/rooms/${roomUuid}/messages/text`,
    {
      text: message,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
}

app.post("/api/hook", (req, res, next) => {
  if (req.body.data.message) {
    const message = req.body.data.message.message.ja;
    const type = req.body.data.message.media;
    let timestamp = req.body.timestamp;
    timestamp = new Date(timestamp * 1000 + (9 * 60 * 60 * 1000));
    timestamp = timestamp.getHours();
    if (
      type === "audio" &&
      message.includes("宿題") &&
      message.includes("終わった")
    ) {

      if(timestamp <= 11) {
        sendMessage("すごい！早いね！お疲れ様");
      } else {
        sendMessage("ゆっくり休んでね");
      }
    }
  }
  next()
  res.status(200).send("Webhook Received");
});

app.post("/api/hook", async (req, res) => {
  if (req.body.data.message) {
    const message = req.body.data.message.message.ja;
    const type = req.body.data.message.media;

    if (
      type === "audio" && (
      message.includes("つまらない") || 
      message.includes("つまんない") ||
      message.includes("暇") || 
      message.includes("退屈")
      )
    ) {
      const boredContent = await axios.get("http://www.boredapi.com/api/activity?price=0.0&type=relaxation&type=recreational");
      const activity = boredContent.data.activity
      console.log(boredContent.data.type
        )

      // Let's transrate!!
      
      const activityOfJa = await translate(`Let's ${activity}`, {to: 'ja'})
      console.log(activity)
      sendMessage(`${activityOfJa}`)
    }
  }
  res.status(200).send("Webhook Received");
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
