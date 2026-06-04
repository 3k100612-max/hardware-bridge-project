const express = require('express');
const cors = require('cors');
const si = require('systeminformation');
const app = express();

app.use(cors()); // Critical: Allows the website to talk to your PC

app.get('/serial', async (req, res) => {
    const data = await si.baseboard();
    res.send(data.serial || "Not Found");
});

app.listen(5000, () => {
    console.log("Agent running on port 5000...");
});
