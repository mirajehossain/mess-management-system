const CategoryModel = require('../models/categoryModel');
const BalanceModel = require('../models/balanceModel');
const expenseLib= require('../lib/exepnse.lib');
const ExpenseLib= new expenseLib();
class BalanceLib {
    constructor(){};

    addCategory(categoryObject){
        return new Promise((resolve,reject)=>{
            CategoryModel.findOne({
                $and: [ {name: categoryObject.name},{messName: categoryObject.messName}]
            },(err,mess)=>{
                if(err){
                    resolve(err);
                } else {
                    if(mess !== null){
                        reject(`Category '${mess.name}' already exist`);
                    } else {
                        CategoryModel.create(categoryObject,(err,result)=>{
                            if(err){
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        })
                    }
                }
            });
        });
    };
    addBalance(balanceObject){
        return new Promise((resolve,reject)=>{
            BalanceModel.create(balanceObject, (err,result)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
    };
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
                   if(balanceArr.length){
                       let result =  balanceArr.reduce((sum, balance)=>{
                           return sum + balance;
                       });
                       resolve(result);
                   } else {
                       resolve('No Balance.')
                   }
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

                      if(balanceArr.length){
                          let result =  balanceArr.reduce((sum, balance)=>{
                              return sum + balance;
                          });
                          console.log('-------',result);
                          resolve(result);
                      } else {
                          resolve('No balance available in the mess.')
                      }
                  }

              });
          })

    };


    categoryWiseBalance(balanceCatId){
        return new Promise((resolve,reject)=>{
            BalanceModel.find({balanceCategoryId: balanceCatId}, (err, data)=>{
                if(err){
                    reject(err);
                } else {
                    let BalanceArr = data.map((item)=>{
                        return item.amount;
                    });
                    console.log(BalanceArr);
                    if(BalanceArr.length){
                        let result =  BalanceArr.reduce((sum, balance)=>{
                            return sum + balance;
                        });
                        resolve(result);
                    } else {
                        resolve('No Balance in this category');
                    }
                }
            })
        })
    }

    currentBalance(messName){
        let b = new BalanceLib();
        return  Promise.all(
            [
                b.totalMessBalance(messName),
                ExpenseLib.totalMessExpense(messName)
            ]).then(result=>{
                return result[0]- result[1];
        });
    };
    // userBalance(){};

}


module.exports = BalanceLib;