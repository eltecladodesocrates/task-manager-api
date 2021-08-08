const express = require('express')
const router = new express.Router()

const Task = require('../models/task')

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every( update => allowedUpdates.includes(update))

    if(!isValidOperation)
        return res.send({ Error: 'Invalid updates' })
    try {

        const task = await Task.findById(id)
        updates.forEach( update => task[update] = req.body[update])
        await task.save()
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router