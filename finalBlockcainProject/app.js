import express from 'express';
import path from 'path';
const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join("C:/Workspace/blockchainLabs/finalBlockcainProject" + "/index.html"));
})

const server = app.listen(5000);
const portNumber = server.address().port;
console.log(`port is open on ${portNumber}`);