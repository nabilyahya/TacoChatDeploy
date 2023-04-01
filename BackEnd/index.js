const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 512,
      temperature: 0,
      prompt: prompt,
    });

    const response = completion.data.choices[0].text;
    res.status(200).json({ response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
