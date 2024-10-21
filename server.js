const express = require('express');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const fs = require('fs');
let size = 0;
const zlib = require('zlib');

app.prepare().then(() => {

    const server = express();

    server.use(express.raw({ type: '*/*', limit: '10mb' }));

    server.get('/api/state', (req, res) => {
        res.status(200).json(size);
    });

    server.use((req, res, next) => {

        const getFileSize = async (filePath) => {
            try {
                if (req.url.startsWith('/images')) {
                    filePath = req.url.replace('/images', 'public/images')
                } else if (req.url.startsWith('/_next')) {
                    filePath = req.url.replace('/_next', '.next')
                }
                const fileContents = fs.readFileSync(filePath);
                const gzipContents = zlib.gzipSync(fileContents);
                return gzipContents.length;
            } catch (error) {
                return -1; // Return -1 to indicate an error
            }
        };

        getFileSize(req.url)
            .then((fileSize) => {
                size += fileSize;
                console.log(req.url + `: file size: ${fileSize} bytes.` + ` Total size: ${size} bytes`);
            })
            .catch((error) => { });
        next();
    });

    server.all('*', (req, res) => {
        const parsedUrl = parse(req.url, true);
        res.headersSent = true;
        handle(req, res, parsedUrl);
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });
});