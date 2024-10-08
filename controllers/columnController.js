const Column = require('../model/columnModel')
const Board = require('../model/boardModel')

const addColumn = async(req,res) =>{
    const {boardId, name} = req.body

    try{
    const col = new Column({boardId, name})
    await col.save()

    const board = Board.findById(boardId)
    board.columns.push(...col._id)
    res.status(200).json(col)
    }catch(error){
        res.status(400).json(error)
    }

}

// delete soon!
const changeColumn = async(req, res) =>{
    const {id} = req.params
    const {newCol}= req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).jsoN({mssg: 'Id is not valid'})
    }

    try{
    const col = await Column.findByIdAndUpdate(id,{
        ...newCol
    })
    res.status(200).json(col)
    }catch(error){
        res.status(400).json(error)
    }   
}


const deleteColumn = async(req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).jsoN({mssg: 'Id is not valid'})
    }

    try{
        const col = await Column.findByIdAndDelete(id)
        res.status(200).json(col)
    }catch(error){
        res.status(400).json(error)
    }
}

module.exports = {addColumn, deleteColumn}