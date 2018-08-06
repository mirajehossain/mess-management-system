let response = require('../helper/response');
let BalanceModel = require('../models/balanceModel');
let BalanceCategoryModel = require('../models/balanceCategoryModel');

class BalanceController {
    constructor(){};
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
            balanceObject.date = req.body.date || new Date();
        BalanceModel.create(balanceObject, (err,result)=>{
            if(err){
                return res.json(response.error(false,"An error occur",err))
            } else {
                return res.json(response.single(true, `You are add ${result.amount} amount on your balance`, result));
            }
        })


    };


}

module.exports = new BalanceController();