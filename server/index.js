const express = require("express");
const axios = require("axios");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

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

getMessage();

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

async function sendMessage() {
  await getRoomUuid();

  await axios.post(
    `https://platform-api.bocco.me/v1/rooms/${roomUuid}/messages/text`,
    {
      text: "おめでとう",
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
}

app.post("/api/hook", (req, res) => {
  if (req.body.data.message) {
    const message = req.body.data.message.message.ja;
    const type = req.body.data.message.media;
    if (
      type === "audio" &&
      message.includes("宿題") &&
      message.includes("終わった")
    ) {
      sendMessage();
    }
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
