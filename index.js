const express = require('express')
const server = express()
server.use(express.json())

const tasks = []

//Retrieve all tasks
server.get('/tasks', (req, res) => {
    if(tasks === []) return res.json({message: 'No task were found.'});
    return res.json(tasks);
})

//Retrieve a task
server.get('/tasks/:index', (req, res) => {
    const { index } = req.params
    return res.json(tasks[index])
})

//Create a task
server.post('/tasks', (req, res) => {
    const { name } = req.body
    let newTask = {
        "name": name,
        "created_at": new Date(),
        "updated_at": new Date(),
        "completed": false
    }
    tasks.push(newTask)
    return res.json({
        message: 'New task created!',
        task: newTask
    })
})

//Update a task
server.put('/tasks/:index', (req, res) => {
    const { index } = req.params
    const { name } = req.body
    let task = {
        ...tasks[index],
        "name":  name,
        "updated_at": new Date()
    }
    tasks[index] = task
    return res.json({
        "message": "Task has been updated!",
        "task": task
    })
})

//Delete a task
server.delete('/tasks/:index', (req, res) => {
    const { index } = req.params
    tasks.splice(index, 1)

    return res.json({
        "message": "Task has been deleted!"
    })
})

//Complete a task
server.put('/tasks/:index/complete', (req, res) => {
    const { index } = req.params
    tasks[index] = {
        ...tasks[index],
        "completed": true,
        "updated_at": new Date()
    }

    return res.json({
        "message": `Task ${tasks[index].name} has been completed!`
    })
})



server.listen(3001)