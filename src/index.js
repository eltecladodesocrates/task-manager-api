const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// it is going to parse incoming incomming JSON
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})

// const bcrypt = require('bcryptjs')

// const myFnx = async () => { 
//     const password = 'red1234!'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('dfadfa', hashedPassword)
//     console.log(isMatch)
    
// }

// myFnx()

const jwt = require('jsonwebtoken')

const myFnx = () => {
    const token = jwt.sign({ id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}

myFnx()