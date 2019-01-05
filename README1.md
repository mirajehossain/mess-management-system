# Mess Management System API

The project provides free API for manage mess.

The API is [REST API](http://en.wikipedia.org/wiki/Representational_State_Transfer "RESTful")
and uses [JWT token](https://jwt.io/) for user authentication purposes.
Currently, return format for all endpoints is [JSON](http://json.org/ "JSON").

You can try our API in [Swagger](https://swagger.io/) ([https://mess-api.herokuapp.com/swagger](https://mess-api.herokuapp.com/))


***
### Features

- > Registration for new mess
- > Add/ delete mess members
- > Update and record mess/users balance and expense
- > Monthly report Mess/User 


## Endpoints

#### Auth Resources

- **[<code>POST</code> SignUp]: /api/auth/signup**
- **[<code>POST</code> Login]: /api/auth/login**

#### User Resources
- **[<code>POST</code> AddUser]: /api/v1/user/addUser**
- **[<code>GET</code> GetUsers]: /api/v1/user/getUsers**
- **[<code>GET</code> GetProfile]: /api/v1/user/getProfile**
- **[<code>PUT</code> UpdateProfile]: /api/v1/user/updateProfile**
- **[<code>PUT</code> ChangePassword]: /api/v1/user/changePassword**
- **[<code>DELETE</code> RemoveUser]: /api/v1/user/removeUser/:userId**

#### Category Resources
- **[<code>POST</code> AddCategory]: /api/v1/category/addCategory**
- **[<code>GET</code> GetCategory]: /api/v1/category/getCategory**
- **[<code>PUT</code> UpdateCategory]: /api/v1/category/updateCategory/:categoryId**
- **[<code>DELETE</code> DeleteCategory]: /api/v1/category/deleteCategory/:categoryId**

#### Balance Resources
- **[<code>POST</code> AddBalance]: /api/v1/balance/addBalance**
- **[<code>GET</code> MessTotalBalance]: /api/v1/balance/messTotalBalance**
- **[<code>GET</code> UserTotalBalance]: /api/v1/balance/userTotalBalance**
- **[<code>GET</code> UserMealBalance]: /api/v1/balance/userMealBalance**
- **[<code>GET</code> CategoryWiseBalance]: /api/v1/balance/categoryWiseBalance/:categoryId**
- **[<code>GET</code> CurrentBalance]: /api/v1/balance/currentBalance**
- **[<code>PUT</code> UpdateBalance]: /api/v1/balance/updateBalance/:balanceId**
- **[<code>DELETE</code> DeleteBalance]: /api/v1/balance/deleteBalance/:balanceId**

#### Expense resources

- **[<code>POST</code> AddExpense]: /api/v1/expense/addExpense**
- **[<code>PUT</code> updateExpense]: /api/v1/expense/updateExpense/:expenseId**
- **[<code>GET</code> MessTotalExpense]: /api/v1/expense/messTotalExpense**
- **[<code>GET</code> MealTotalExpense]: /api/v1/expense/mealTotalExpense**
- **[<code>GET</code> CategoryWiseExpense]: /api/v1/expense/categoryWiseExpense/:categoryId**
- **[<code>DELETE</code> DeleteExpense]: /api/v1/expense/deleteExpense/:expenseId**

#### Meal resources

- **[<code>POST</code> AddMeal]: /api/v1/meal/addMeal**
- **[<code>PUT</code> UpdateMeal]: /api/v1/meal/updateMeal/:mealId**
- **[<code>DELETE</code> DeleteMeal]: /api/v1/meal/deleteMeal/:mealId**
- **[<code>GET</code> TotalMealInMonthMeal]: /api/v1/meal/totalMealInMonth**
- **[<code>GET</code> CurrentMeal]: /api/v1/meal/currentMeal**
- **[<code>GET</code> MealRateInMonth]: /api/v1/meal/mealRateInMonth**
- **[<code>GET</code> UserWiseMeal]: /api/v1/meal/userWiseMeal/:userId**


#### Mess Resources
- **[<code>GET</code> MessSummary]: /api/v1/mess/messSummary**
- **[<code>GET</code> UserSummary]: /api/v1/mess/userSummary/:userId**

