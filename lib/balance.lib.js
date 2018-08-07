const BalanceModel = require('../models/balanceModel');
class BalanceLib {
    constructor(){};

    static totalBalance(mess){
        BalanceModel.find({messName: mess}, (err, data)=>{
           let balanceArr = data.map((item)=>{
                return item.amount;
            });
           let result =  balanceArr.reduce((sum, balance)=>{
                return sum + balance;
            });
            return result;
        })
    };

    // currentBalance(){};
    // userBalance(){};

}


module.exports = BalanceLib;