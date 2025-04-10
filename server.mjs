import { createServer } from "https";
import { parse } from "url";
import next from "next";
import fs from "fs";

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ turbo: true, dev });
const handle = app.getRequestHandler();
const httpOptions = {
    key: fs.readFileSync('./certs/server_key.pem'),
    cert: fs.readFileSync('./certs/server_cert.pem'),
};
app.prepare().then(() => {
    createServer(httpOptions, (req, res) => {
        handle(req, res, parse(req.url || "", true));
    }).listen(port);
    console.log(`> Server listening at https://localhost:${port}`);
});