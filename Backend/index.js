const express = require("express");
const app = express();

const {open} = require("sqlite");
const sqlite3 = require("sqlite3");

const cors = require("cors");

app.use(express.json());
app.use(cors());

const path = require("path");

const dbPath = path.join(__dirname, "mock.db");

let db = null;

const initializeAndServer = async() => {
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });

        const query = `CREATE TABLE IF NOT EXISTS todo (id TEXT PRIMARY KEY, userId TEXT, taskName TEXT, isComplete INTEGER)`;
        db.run(query);

        // db.run(`
        //     INSERT INTO todo (id, userId, taskName, isComplete)
        //         VALUES 
        //         ('1', '2', 'HTML', false),
        //         ('3', '2', 'CSS', false),
        //         ('4', '2', 'JavaScript', false),
        //         ('5', '2', 'React', true)
        //     `);

        app.listen(3001, () => {
            console.log("http://localhost:3001");
        })
    } catch(e) {
        console.log(`Db error ${e.messege}`);
        process.exit(1);
    }
};

initializeAndServer();

app.get("/", async (req, res) => {
    const query = `SELECT * FROM todo`;
    result = await db.all(query);
    res.send(result);
});
