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
    partner : [{
        type : Schema.Types.ObjectId, 
        ref : 'User'
    }],
    path : {
        type : Schema.Types.ObjectId,
        ref : 'Directory'
    },
    opened : {
        tpye : Boolean,
        default : false
    },
    deleted : {
        type : Boolean,
        default: false
    }
});

module.exports = mongoose.model('File', fileSchema);