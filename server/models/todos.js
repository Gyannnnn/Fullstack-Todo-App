const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    task:String,
    desc:String,
});

const TodoModel = mongoose.model("todoData",userSchema);

module.exports = TodoModel