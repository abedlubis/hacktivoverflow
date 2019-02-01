var mongoose = require('mongoose')
const {hash} = require('../helpers/index')

var Schema = mongoose.Schema

var userSchema = new Schema({
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        validate : {
            isAsync : true,
            validator : function(email){
               return User.findOne({ email : email})
                .then(user => {
                    if(user){
                        throw false
                    }
                })
                .catch(err => {
                    throw false
                })
            },  message :'User already exist',
        }
    },
    password: {
        type : String,
        required : true
    },
    firstName : {
        type: String,
    },
    lastName : {
        type: String,
    },
    popularity : {
        type: Number,
        default: 0
    },
    watchTags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        default: []
    }]
})
userSchema.post('save', function(doc, next) {
    doc.populate('watchTags').execPopulate().then(function() {
        next();
    });
})
userSchema.post('findOneAndUpdate', function(doc, next) {
    doc.populate('watchTags').execPopulate().then(function() {
        next();
    });
})

userSchema.pre('save', function(next){
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User