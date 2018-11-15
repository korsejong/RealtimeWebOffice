const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorySchema = new Schema ({
    name: {
        type : String,
        required : true
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
        ref : 'Directory'
    },
    opened : {
        type : Boolean,
        default : false
    },
    deleted : {
        type : Boolean,
        default: false
    },
},
{ 
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at'
    } 
});

module.exports = mongoose.model('Directory', directorySchema);