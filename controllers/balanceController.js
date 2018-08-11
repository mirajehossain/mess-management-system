let response = require('../helper/response');
let BalanceModel = require('../models/balanceModel');
let BalanceCategoryModel = require('../models/balanceCategoryModel');
let BalanceLib = require('../lib/balance.lib');
// let BalanceLib = new balanceLib();
class BalanceController extends BalanceLib{
    constructor(){
        super();
    };
    addBalanceCategory(req,res){
        let categoryObject = req.body;
        categoryObject.messName = req.auth.messusername;
        console.log(categoryObject);

        BalanceCategoryModel.findOne({
            $and: [ {name: categoryObject.name},{messName: categoryObject.messName}]
        },(err,mess)=>{
            if(err){
                return res.json(response.error(false,"An error occur",err))
            } else {
                if(mess !== null){
                    return res.json(response.error(false,`Category '${mess.name}' already exist`,null))
                } else {
                    BalanceCategoryModel.create(categoryObject,(err,result)=>{
                        if(err){
                            return res.json(response.error(false,"An error occur",err))
                        } else {
                            return res.json(response.single(true, "New Balance category Created", result));
                        }
                    })
                }

            }
        });
    };

    addBalance(req,res){
        console.log(req.auth.id);
        let balanceObject = req.body;
        balanceObject.userId = req.auth.id;
        balanceObject.messName = req.auth.messusername;
        balanceObject.date = req.body.date || new Date();
        BalanceModel.create(balanceObject, (err,result)=>{
            if(err){
                return res.json(response.error(false,"An error occur",err))
            } else {
                return res.json(response.single(true, `You are add ${result.amount} amount on your balance`, result));
            }
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

    availableBalance(req,res){};
}

module.exports = BalanceController;