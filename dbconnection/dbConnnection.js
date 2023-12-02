const mongoose= require('mongoose');

const dbConn = async() => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('conexion exitosa con mongoose');

    } catch (error) {
        console.log(error);
    }
};
dbConn();