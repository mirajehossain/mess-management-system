let response = require('../helper/response');
let BalanceLib = require('../lib/balance.lib');

class BalanceController extends BalanceLib{
    constructor(){
        super();
    };
    addBalanceCategory(req,res){
        let categoryObject = req.body;
        categoryObject.messName = req.auth.messusername;
        console.log(categoryObject);

        super.addBalanceCategory(categoryObject).then(balance=>{
            res.json(response.single(true,'New Balance category added ', balance));
        }).catch(error=>{
            res.json(response.error(false,'An error occur', error))
        });
    };

    addBalance(req,res){
        console.log(req.auth.id);
        let balanceObject = req.body;
        balanceObject.userId = req.auth.id;
        balanceObject.messName = req.auth.messusername;
        balanceObject.date = req.body.date || new Date();

        super.addBalance(balanceObject).then(balance=>{
            res.json(response.single(true,`You are add ${balance.amount} amount on your balance`, balance));
        }).catch(error=>{
            res.json(response.error(false,'An error occur', error))
        });
    };

    totalUserBalance(req,res) {
        super.totalUserBalance(req.auth.id).then(balance=>{
            res.json(response.single(true,'Total Balance is '+ balance, balance));
        }).catch(error=>{
            res.json(response.error(false,'An error occur', error))
        });

    }

    totalMessBalance(req,res){
        super.totalMessBalance(req.auth.messusername).then(balance=>{
            res.json(response.single(true,'Total Mess Balance is '+ balance, balance));
        }).catch(error=>{
            res.json(response.error(false,'An error occur', error))
        });
    };

    categoryWiseBalance(req,res){
        let balanceCatId = req.params.balanceCatId;
        super.categoryWiseBalance(balanceCatId).then(expense=>{
            return res.json(response.single(true, `Balance amount of the categories is: ${expense} `, expense));
        }).catch(err=>{
            return res.json(response.error(false,"An error occur",err));
        })
    };
    currentBalance(req,res){
        const messName = req.auth.messusername;
        super.currentBalance(messName).then(balance=>{
            return res.json(response.single(true, `Current Balance amount of the Mess is: ${balance} `, balance));
        }).catch(err=>{
            return res.json(response.error(false,"An error occur",err));
        });


    };
}

module.exports = BalanceController;