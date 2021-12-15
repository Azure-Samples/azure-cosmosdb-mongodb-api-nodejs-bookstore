import express from 'express';
import db from './src/db/db.js';
import routes from './src/routes/index.js';
import path from 'path'

import dotenv from "dotenv";

dotenv.config();

/* Create an Express application.*/
const app = express();
const __dirname = path.resolve();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

routes.forEach(route => {
    app[route.method](route.path, route.handler);
});
if (['production'].includes(process.env.NODE_ENV)) {
    const root = path.join(__dirname,'..', 'client', 'build')
    app.use(express.static(root));
    console.log(root);
    app.get("*", (req, res) => {
        res.sendFile('index.html', { root });
    })
}
const dBConnectionString = process.env.COSMOS_BOOKSTORE_DB_CONNECTION_STRING || "";
const PORT = process.env.PORT || 8080;

db.connect(dBConnectionString)
    .catch(err => {
        console.error(err.stack);
        process.exit(1)
    })
    .then(app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }));
