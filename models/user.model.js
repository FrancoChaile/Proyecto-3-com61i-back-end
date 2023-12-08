
const { Timestamp } = require('mongodb');
const{ Schema, model }=require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        require:true

    },
    lastname:{
        type: String,
        require:true
    },
    age:{
        type: Number,
        min:1, 
        nax:99 
    },
    email: {
        type: String,
        require:true,
        unique:true// para que el email no se repita
        

    },
    role: {
        type: String,
        require: false,
        default: 'client'

    },
    password: {
        type: String,
        require:true,
    
    
    },
    fav: {
        type: Array,
        require:false,    
    
    },
    pending: {
        type: Array,
        require:false,
    
    
    },
    finalized: {
        type: Array,
        require:false,
    
    
    },
    disabled: {
        type: Boolean,
        default:false,
    
    
    },



},
{ timestamps: true} // crea los datos de dia hora que se ha creado

); 

module.exports=model('user', userSchema);