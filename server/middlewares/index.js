const User = require('../models/user')
const Question = require('../models/question')
const Answer = require('../models/answer')
const {verify} = require('../helpers/index')

module.exports = {
    Authentication : function(req, res, next){
        // console.log(req.headers.token)
        let {id} = verify(req.headers.token)
        User.findOne({_id : id}, function(err, data){
            if(err){
                res.status(400).json(err)
            }else{

                if(!data){
                    res.status(401).json("Error authentication")
                }else{
                    req.userId = id;
                    next()
                }
            }
        })
    }, 
    cekQuestionVote : function(req, res, next){
        Question.findById(req.params.id, function(err, question){
            if(err){
                res.status(400).json(err)
            }else{
                if(question.user.toString() == req.userId.toString()){
                    res.status(400).json({message: "Tidak bisa vote question sendiri"})
                }else{
                    if(question.upVote.indexOf(req.userId) == -1){
                        req.hasUpVote = false
                    }else{
                        req.hasUpVote = true
                    }
    
                    if(question.downVote.indexOf(req.userId) == -1){
                        req.hasDownVote = false
                    }else{
                        req.hasDownVote = true
                    }
                    next()
                }
            }
        })
    },
    cekAnswerVote : function(req, res, next){
        Answer.findById(req.params.id, function(err, answer){
            if(err){
                res.status(400).json(err)
            }else{
                if(answer.user.toString() == req.userId.toString()){
                    res.status(400).json({message: "Tidak bisa vote question sendiri"})
                    // next()
                }else{
                    if(answer.upVote.indexOf(req.userId) == -1){
                        req.hasUpVote = false
                    }else{
                        req.hasUpVote = true
                    }

                    if(answer.downVote.indexOf(req.userId) == -1){
                        req.hasDownVote = false
                    }else{
                        req.hasDownVote = true
                    }
                    next()
                }
            }
        })
    }

}