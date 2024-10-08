const mongoose = require('mongoose')
const scheme = mongoose.Schema
const Task = require('./taskModel')

const subtaskSchema = new scheme({
    taskid:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'Tasks'},
    title:{type:String, required:true},
    isCompleted:{type:Boolean, required:true}
})

const handleDelete = async function(next){
    try{
        if(this instanceof mongoose.Query){
            const filter = this.getQuery()
            await Task.updateOne(
                {_id: filter.taskid},
                {$pull:{subtasks:filter._id}}
            )
        }
        else{
            await Task.updateOne(
                {_id:this.taskid},
                {$pull:{subtasks:this._id}}
            )
        }
        next()
    }catch(error){
        next(error)
    }
}

subtaskSchema.pre('deleteMany', handleDelete)
subtaskSchema.pre('remove', handleDelete)


module.exports = mongoose.model('Subtasks', subtaskSchema)