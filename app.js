const express = require('express');

const app = express();
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const server = require('http').createServer(app);

const port = process.env.PORT || 3000;

const AppModule = require('./app/modules/index');

const indexRoute = require('./routes/index');

const {
    AuthModule, CategoryModule, BalanceModule, ExpenseModule, MealModule, MessModule, UserModule,
} = AppModule;
const { UserRoute } = UserModule;
const { CategoryRoute } = CategoryModule;
const { BalanceRoute } = BalanceModule;
const { ExpenseRoute } = ExpenseModule;
const { MealRoute } = MealModule;
const { MessRoute } = MessModule;

const { AuthController, AuthRoute } = AuthModule;
const authController = new AuthController();
require('./config/database')();

const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));


// Root Routing
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
app.use('/api/auth', AuthRoute);
app.all('/api/v1/*', authController.isAuthenticate);

app.use('/api/v1/user', UserRoute);
app.use('/api/v1/category', CategoryRoute);
app.use('/api/v1/balance', BalanceRoute);
app.use('/api/v1/expense', ExpenseRoute);
app.use('/api/v1/meal', MealRoute);
app.use('/api/v1/mess', MessRoute);


server.listen(port, () => {
    console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}`);
});
