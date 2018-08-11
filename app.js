const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require('http').createServer(app);
const config = require('./config/config');
const port = config.development.server.port || 3000;
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const authController = require('./controllers/authController');
const AuthController = new authController();
require('./config/database')();

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
app.use('/api/auth',authRoute);
app.all('/api/v1/*',AuthController.isAuthenticate);

app.use('/api/v1/user',userRoute);


server.listen(port,()=>{
    console.log(`Server is running on ${config.development.server.host}:${port}`);
});



