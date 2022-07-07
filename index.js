const express = require("express")
const mongoose = require("mongoose") 

const app = express()

app.use(express.json()) //Vamos a utilizar json 

//Endpoint
app.get("/", (request, response)=>{
    response.json({
        "message": "Endpoint de home"
    })
} )

// Schenas
const koderSchema = new mongoose.Schema({
    name: {
        type: String, 
        minlength: 3,
        maxlength: 20,
        required: true
    },
    edad:{
        type: Number, 
        min: 18, 
        max: 150,
    }, 
    gen: {
        type: String,
        required: true
    },
    modulo: {
        type: String
    }, 
    hobbies: {
        type: [String]
    },
    genero: {
        type: String, 
        enum: ["f", "m", "o"]
    }
})

//Modelos
const Koders = mongoose.model("koders", koderSchema)

//Endpoint 
app.get("/koders", async (request, response) =>{
    // Vamos a utilizar el modelo FIND para accder a la bd
    // const koders = await Koders.find({}) //promesa
    // console.log(koders)

    //Vamos a utilizar el modelo .findById para acceder a un koder
    const koderID = await Koders.findById("62c63374102f8c84ab5ac5dc")
    console.log(koderID)

    response.json({
        "message" : " El endpoint koders funciona"
    })
})




//conectando con la base de datos de mongo
mongoose.connect("mongodb+srv://bere:kodemia123@kodemia.b6ynr.mongodb.net/kodemia")
.then(()=>{
    console.log("BD conected ...")

    //arrancar el servidor 
    app.listen(8080, (request, response)=>{
    console.log("nuestro servidor esta prendido")

})
}) .catch(()=>{
    console.log("No se pudo conectar a la base de datos")
})

