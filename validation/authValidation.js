class AuthValidation {
    constructor(){};


    // 422 (Unprocessable Entity)
    signupValidation(req, res, next){

        console.log(req.body.username);
        if(req.body.username == null || 'undefined'){
            res.status(422).send({message:'User name can\'t be empty'});
        }
        if(req.body.email == null || 'undefined'){
            res.status(422).send({message:'Email can\'t be empty'});
        }
        if(req.body.password == null || 'undefined'){
            res.status(422).send({message:'Password name can\'t be empty'});
        }
        if(req.body.phone == null|| 'undefined'){
            res.status(422).send({message:'Phone no can\'t be empty'});
        }
        if(req.body.messusername == null|| 'undefined'){
            res.status(422).send({message:'Messusername name can\'t be empty'});
        }
        next();
    }
}

module.exports = AuthValidation;