# Mess-Management-System

## Prerequisites
- > Install [NodeJS](https://nodejs.org/en/download/).
- > Install and connect [mongoDB](https://www.mongodb.com/).

## After complete installation Node and mongodb.

```shell
git clone https://github.com/mirajehossain/mess-management-system.git
cd mess-management-system
npm install
npm start
```

# Features

- > Register a Mess
- >Add mess members
- >Track their balance and expense
- >User wise report 
- >Monthly report 

## APIs 

#### Auth endpoints
   - POST
      - /api/auth/signup
      - /api/auth/login
      
#### User endpoints
   - GET
        - /api/auth/v1/getUsers
        - /api/auth/v1/getProfile
   - POST
        - /api/auth/v1/addUser
   - PUT 
        - /api/auth/v1/updateProfile
        - /api/auth/v1/changePassword
  
###  Balance endpoints
   - GET
        - /api/auth/v1/balance/totalMessBalance
        - /api/auth/v1/balance/totalUserBalance
        - /api/auth/v1/balance/currentBalance
        - /api/auth/v1/balance/categoryWiseBalance/:categoryId
   - POST
        - /api/auth/v1/balance/addCategory
        - /api/auth/v1/balance/addBalance

### Expense endpoints
   - POST
        - /api/auth/v1/expense/addExpense
   - GET
        - /api/auth/v1/expense/totalMessExpense
        - /api/auth/v1/expense/categoryWiseExpense/:categoryId
   
### Meal endpoints
   - POST
        - /api/auth/v1/meal/addMeal
   - PUT
        - /api/auth/v1/meal/updateMeal/:mealId
   - GET
        - /api/auth/v1/meal/totalMealInMonth
        - /api/auth/v1/meal/mealRateInMonth
        - /api/auth/v1/meal/currentMeal
   
   
      