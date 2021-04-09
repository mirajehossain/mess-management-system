const express = require('express');

const app = express();
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require('http').createServer(app);

const port = process.env.PORT || 3000;

const AppModule = require('./app/modules/index');

const indexRoute = require('./routes/index');

const authRoute = AppModule.AuthModule.AuthRoute;
const userRoute = AppModule.UserModule.UserRoute;
const categoryRoute = AppModule.CategoryModule.CategoryRoute;
const balanceRoute = AppModule.BalanceModule.BalanceRoute;
const expenseRoute = AppModule.ExpenseModule.ExpenseRoute;
const mealRoute = AppModule.MealModule.MealRoute;
const messRoute = AppModule.MessModule.MessRoute;

const authController = AppModule.AuthModule.AuthController;
const AuthController = new authController();
require('./config/database')();

const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));


// Root Routing
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
app.use('/api/auth', authRoute);
app.all('/api/v1/*', AuthController.isAuthenticate);

app.use('/api/v1/user', userRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/balance', balanceRoute);
app.use('/api/v1/expense', expenseRoute);
app.use('/api/v1/meal', mealRoute);
app.use('/api/v1/mess', messRoute);


server.listen(port, () => {
    console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}`);
});
