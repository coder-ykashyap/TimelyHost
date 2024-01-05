const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClassSchema = new Schema({
class : String,
monday : Array,
tuesday : Array,
wednesday : Array,
thursday : Array,
friday : Array,
saturday : Array,
});



module.exports = mongoose.model('ClassTable',ClassSchema)