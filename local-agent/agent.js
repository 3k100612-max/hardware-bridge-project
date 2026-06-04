const http = require('http');
const { exec } = require('child_process');

const PORT = 5000;

const server = http.createServer((req, res) => {
    // CRITICAL: Allow your VPS website to talk to this local server
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/serial') {
        exec('wmic bios get serialnumber', (err, stdout) => {
            if (err) {
                res.writeHead(500);
                res.end("Hardware Error");
                return;
            }
            const lines = stdout.trim().split('\n');
            const serial = lines.length > 1 ? lines[1].trim() : "Unknown";
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(serial);
        });
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

server.listen(PORT, () => {
    console.log('-----------------------------------------');
    console.log(`Hardware Bridge Active on port ${PORT}`);
    console.log('Keep this window open to sync with website.');
    console.log('-----------------------------------------');
});
