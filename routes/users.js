const express = require("express")

const router = express.Router()
const { User } = require("../models/index")
const { Show } = require("../models/index")


router.get("/", async (req, res) => {
    const users = await User.findAll()
    res.send(users)
})

router.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id)
    res.send(user)
})

router.get("/:id/shows", async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: Show
    })
    res.send(user.shows)
})

router.put("/:id/shows", async (req, res) => {
    const user = await User.findByPk(req.params.id)
    const show = await Show.findByPk(req.body.showId)
    await user.addShow(show)
    res.send(user)
})



module.exports = router
