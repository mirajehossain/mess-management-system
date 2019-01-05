const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require('http').createServer(app);
const config = require('./config/config');
const port = process.env.PORT || config.development.server.port ;

const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const balanceRoute = require('./routes/balance');
const expenseRoute = require('./routes/expense');
const mealRoute = require('./routes/meal');
const messRoute = require('./routes/mess');

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

app.use('/',indexRoute);
app.use('/api/auth',authRoute);
app.all('/api/v1/*',AuthController.isAuthenticate);

app.use('/api/v1/user',userRoute);
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/balance',balanceRoute);
app.use('/api/v1/expense',expenseRoute);
app.use('/api/v1/meal',mealRoute);
app.use('/api/v1/mess',messRoute);



server.listen(port,()=>{
    console.log(`Server is running on ${config.development.server.host}:${port}`);
});



