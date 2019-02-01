const User = require('../models/user')
const {hashPass} = require('../helpers')

module.exports = {
    update : function(req, res, next){
        const id = req.userId;
        let {email, password, name} = req.body
        let input = {email, password, name}
        for(let key in input) {
            if(input[key] == undefined) delete input[key]
            if(input[key] == 'password') input[key] = hashPass(input[key])
        }
        User.findOneAndUpdate({_id: id}, {$set: input}, function(err, result){
            res.status(201).json({
                msg : "updated data",
                data: result
            })
        })
    },
    delete : function(req, res, next){
        User.findOneAndDelete({_id: req.params.id}, function(err, result){
            if(err){
                res.status(400).json({error : err})
            }else{
                res.status(204).json("removed user")
            }
        })  
    },
    findOne : function(req,res,next){
        const id = req.userId;
        User.findOne({_id : id}).
        populate('article').
        exec(function(err, user){
            if(err) {
                res.status(400).json(err)
            }else{
                console.log(user)
                res.status(200).json(user)
            }
        });
    },
    addWatchTag : function(req, res){
        User.findOne({_id: req.userId})
        .then(user =>{
            console.log(user.watchTags)
            console.log(req.body.watchTags)
            console.log(user.watchTags.indexOf(req.body.watchTags.toString()))
            if(user.watchTags.indexOf(req.body.watchTags.toString()) > -1){
                res.status(400).json('you are already watch this tag')
            }else{
                return User.findOneAndUpdate({_id : req.userId}, {$push : req.body}, {new: true})
            }
        })
        .then((user) => {
            // console.log(user,"====")
            res.status(200).json(user)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    },
    deleteWatch : function(req, res){
        User.findOne({_id: req.userId})
        .then(user =>{
            return User.findOneAndUpdate({_id : req.userId}, {$pull : { 'watchTags' : req.params.id}}, {new: true})
        })
        .then((user) => {
            console.log(user,"====")
            res.status(200).json(user)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    },
    getMyWatch : function(req, res){
        User.findOne({_id : req.userId})
        .populate('watchTags')
        .exec()
        .then((dataUser) => {
            console.log(dataUser)
            res.status(200).json(dataUser.watchTags)
        })
        .catch((err) => {
            res.status(500).json({
                message : "Internal server error",
                error : err
            })
        })
    }
}