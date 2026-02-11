const express = require("express");
const multer = require("multer");
const cors = require("cors");
const parseChat = require("./parser");

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/analyze", upload.single("file"), (req, res) => {
  try {
    const fileContent = req.file.buffer.toString("utf-8");
    const result = parseChat(fileContent);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to analyze file" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));