const BalanceModel = require('../models/balanceModel');
class BalanceLib {
    constructor(){};

    totalUserBalance(id){
        return new Promise((resolve,reject)=>{
            BalanceModel.find({userId: id}, (err, data)=>{
               if(err){
                   reject(err);
               } else {
                   let balanceArr = data.map((item)=>{
                       return item.amount;
                   });
                   console.log(balanceArr);
                   let result =  balanceArr.reduce((sum, balance)=>{
                       return sum + balance;
                   });
                   resolve(result);
               }
            })
        })

    };
    totalMessBalance(mess){
          return new Promise((resolve,reject)=>{
              BalanceModel.find({messName: mess}, (err, data)=>{
                  if(err){
                      reject(err);
                  } else {
                      let balanceArr = data.map((item)=>{
                          return item.amount;
                      });
                      let result =  balanceArr.reduce((sum, balance)=>{
                          return sum + balance;
                      });
                      console.log(result);
                      resolve(result);
                  }

              });
          })

    };

    // currentBalance(){};
    // userBalance(){};

}


module.exports = BalanceLib;