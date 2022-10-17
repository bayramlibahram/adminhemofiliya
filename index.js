const express = require("express");
const app = express();
const path = require("path");
const config = require("config");


if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.resolve(__dirname, 'build')));

    app.get('*', async (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

const start = () => {
    try {
        const PORT = config.get("PORT");
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}

start();