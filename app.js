const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require('http').createServer(app);
const config = require('./config/config');
const port = config.development.server.port || 3000;
const database = require('./config/database')();
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));


//Root Routing
app.use(express.static(path.join(__dirname,'public')));

app.use('/api',indexRoute);
app.use('/api/user',authRoute);
// app.use('/api/auth',router);
// app.all('/api/v1/*',auth.isAuthenticated);

// app.use('/api/v1/user',require('./router/user'));


server.listen(port,()=>{
    console.log(`Server is running on ${config.development.server.host}:${port}`);
});



