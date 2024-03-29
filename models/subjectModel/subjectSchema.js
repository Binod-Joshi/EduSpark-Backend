const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    institute:{type:mongoose.Schema.Types.ObjectId, ref: "Institute",required:true},
    subjectType:{type:String,enums:['School','Jr College','College'],required:true},
})

module.exports = mongoose.model('Subject', SubjectSchema);
