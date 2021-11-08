const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000 

app.use(cors())
app.use(express.json())

const URI = process.env.ATLAS_URI;
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {  

    const exercisesRouter = require('./routes/exercises')
    const usersRouter = require('./routes/users')

    app.use('/exercises', exercisesRouter)
    app.use('/users', usersRouter)

    console.log(`Server run on port ${port}`)
})