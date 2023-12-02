
const { Timestamp } = require('mongodb');
const{ Schema, model }=require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        require:[true,'el campo es requerido'],

    },
    lastname:{
        type: String,
        require:[true,'el campo es requerido'],
    },
    age:{
        type: Number,
        min:[1, ' la eda mini es 18 año'],
        nax:[99, ' la eda max es 99 año'],
    },
    email: {
        type: String,
        require:[true,'el campo es requerido'],
        unique:true// para que el email no se repita
        

    },
    role: {
        type: String,
        require:[true,'el campo es requerido'],
        enum:['admin', 'client'],
        default: 'client'

    },
    password: {
        type: String,
        require:[true,'el campo es requerido'],
    
    
    },
    passwordCheck: {
        type: String,
        require:[true,'el campo es requerido'],
    
    
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