const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type : String
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    salt : {
        type : String,
        default : null
    },
    deleted : {
        type : Boolean,
        default: false
    }
},
{ 
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    } 
});


userSchema.pre('save', function(next){
    if(this.password && this.salt == null) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

userSchema.methods = {
    hashPassword(password){
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
    },
    validPassword( password ) {
        return (this.password === this.hashPassword(password));
    },
    isExistPassword() {
        return (this.password !== undefined);
    },
}

userSchema.statics = {
    list(){
        return this.find({deleted:{$ne:true}});
    }
}

module.exports = mongoose.model('User', userSchema);