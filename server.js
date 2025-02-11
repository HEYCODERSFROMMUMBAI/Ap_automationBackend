// const dotenv = require('dotenv')
// dotenv.config();
// const express = require('express')
// const app = express();
// app.use(express.json());
// const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//     res.send('ap automation')
// })

// /////api end points ]
// app.use("/api/ap/signIn", require('./api/Auth&UserManagementApi/userSignin'))


// const startServer = async () => {


//     app.listen(port, () => {
//         console.log(`server is running on http://localhost:${port}`)
//     })
// }

// startServer()


const dotenv = require('dotenv');
dotenv.config();
const cluster = require('cluster');
const os = require('os');
const express = require('express');

const numCPUs = os.cpus().length; // Get number of CPU cores
const port = process.env.PORT || 3000;

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);

    // Fork workers (create child processes)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Restart a worker if it crashes
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died, restarting...`);
        cluster.fork();
    });

} else {
    const app = express();
    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('AP Automation');
    });

    // API Routes
    app.use("/api/ap/signIn", require('./api/Auth&UserManagementApi/userSignin'));

    app.listen(port, () => {
        console.log(`Worker ${process.pid} is running on http://localhost:${port}`);
    });
}

