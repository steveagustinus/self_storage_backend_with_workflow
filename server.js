const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const ip = require('ip');
const mariadb = require('mariadb');
const os = require('os');

const config = require('./etc/config.js');
const upload = require('./upload.js');

const pool = mariadb.createPool(config.mariadb);
const app = express();

main();

app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.raw({ limit: "50mb" }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.listen(config.port, () => {
    console.log(`Self Storage listening at http://${ip.address()}:${config.port}`);
});

function progress_middleware(req, res, next) {
    let date = new Date(), elapsed;
    let progress = 0;
    let fileSize = req.headers['content-length'] ? parseInt(req.headers['content-length']) : 0;
    req.on('data', (chunk) => {
        elapsed = new Date() - date;
        progress += chunk.length;
        process.stdout.write(`\r\x1b[0;36m[File upload]\x1b[0;37m [${elapsed / 1000}s] \x1b[0;32m${(progress / (1024 * 1024)).toFixed(2)} / ${(fileSize  / (1024 * 1024)).toFixed(2)} MB \x1b[0;37m(${Math.floor((progress * 100) / fileSize)}%)`);
        if (progress === fileSize) {
            console.log(` \x1b[33m[${((fileSize / (1024 * 1024)) / (elapsed / 1000)).toFixed(2)} MB/s]\x1b[0;37m`);
        }
    });

    return next();
};
app.post('/api/files/new-feature', async (req, res) =>{
    console.log("not implemented yet")
    // not implemented yet
});
app.post('/api/files/download', async (req, res) => {
    try {
        if (
            req.body["file_id"] === undefined ||
            req.body["file_id"] === "" ||
            req.body["file_id"] === null
        ) {
            return res.json({ flag: -1, message: "file_id required" });
        }
        
        let conn = await pool.getConnection();
        const result = await conn.query(
            "SELECT `size`, `originalname`, `path` FROM `files` WHERE id=?",
            [req.body["file_id"]]
        );

        let file_size = (parseInt(result[0]["size"]) / (1024 * 1024)).toFixed(2);
        let path = __dirname + '/' + result[0]["path"];
        
        conn.end();

        conn = await pool.getConnection();
        await conn.query(
            "UPDATE `files` SET `last_access`=now() WHERE id=?",
            [req.body["file_id"]]
        );

        res.download(path, result[0]["originalname"], function (err) {
            if (err) {
                console.log(err);
                res.end();
            } else {
                console.log(`\x1b[0;36m[File sent] \x1b[33m[${file_size} MB] \x1b[0;37m${result[0]["originalname"]}`);
                res.end();
            }
        });
        //return res.json({ flag: 1, message: 'success' })
    } catch (err) {
        console.log(err);
        return res.json({ flag: -1, message: err });
    }
});

app.post('/api/files/downloadfile', async (req, res) => {
    try {
        res.download("source/pack.zip", function (err) {
            if (err) {
                console.log(err);
                res.end();
            } else {
                res.end();
            }
        });
        //return res.json({ flag: 1, message: 'success' })
    } catch (err) {
        console.log(err);
        return res.json({ flag: -1, message: err });
    }
});

app.post('/api/files/upload', progress_middleware, upload.single('file'), async (req, res) => {
    try {
        const file_received = req.file;
        let fieldname = file_received.fieldname;
        let originalname = file_received.originalname;
        let encoding = file_received.encoding;
        let mimetype = file_received.mimetype;
        let destination = file_received.destination;
        let filename = file_received.filename;
        let path = file_received.path;
        let size = file_received.size;

        let conn = await pool.getConnection();

        const sql_insert_query = "INSERT INTO `files` (`availability`, " + 
            "`uploaded_at`, `last_access`, `fieldname`, `originalname`, " + 
            "`encoding`, `mimetype`, `destination`, `filename`, `path`, `size`)" +
            " VALUE (?, now(), now(), ?, ?, ?, ?, ?, ?, ?, ?);";
        await conn.query(sql_insert_query,
            [
                "1", fieldname, originalname, encoding, mimetype, 
                destination, filename, path, size
            ]
        );

        conn.end();
    
        return res.json({ flag: 0, message: 'file uploaded successfully!' });
    } catch (err) {
        console.log(err);
        return res.json({ flag: -1, message: err });
    }
});

app.get('*', (req, res) => {
    //res.sendFile(__dirname + '/index.html');
});

function main() {
    fs.writeFile(os.tmpdir() + "/cur_ip.txt", ip.address() + ":" + config.port, (err) => {
        if (err) { 
            console.error(err);
        }
    });
}