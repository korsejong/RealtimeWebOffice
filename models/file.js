const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema ({
    name : {
        type : String,
        required : true
    },
    type : {
        type : String,
        default : 'Document'
    },
    owner : {
        type : Schema.Types.ObjectId, 
        ref : 'User'
    },
    partners : [{
        type : Schema.Types.ObjectId, 
        ref : 'User'
    }],
    path : {
        type : Schema.Types.ObjectId,
        ref : 'Directory',
        default: null
    },
    opened : {
        type : Boolean,
        default : false
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

fileSchema.statics = {
    getPrivateFiles(user, path){
        if(!path) path = null;
        return this.find(
            {
                path: path,
                owner: user,
                opened: false,
                deleted: false,
            }
        );
    },
    getPublicFiles(user, path){
        if(!path) path = null;
        return this.find({
            $or: [
                {
                    path: path,
                    owner: user,
                    opened: true,
                    deleted: false,
                },
                {
                    path: path,
                    opened: true,
                    partners: user,
                    deleted: false,
                }
            ]
        });
    }
}

module.exports = mongoose.model('File', fileSchema);