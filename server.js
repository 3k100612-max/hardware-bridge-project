const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve all files in the "public" folder (index.html, agent.exe, etc.)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Web Dashboard live at http://localhost:${PORT}`);
});
