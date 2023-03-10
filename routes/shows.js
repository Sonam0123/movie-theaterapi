const express = require("express")

const router = express.Router()
const { Show } = require("../models/index")


router.get("/", async (req, res) => {
    const shows = await Show.findAll()
    res.send(shows)
})

router.get("/:id", async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    res.send(show)
})

router.get("/:genre", async (req, res) => {
    const show = await Show.findAll({
        where: {
            genre: req.params.genre
        }
    })
    res.send(show)
})

router.put("/:id", async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    show.rating = req.body.rating
    await show.save()
    res.send(show)
})

router.put("/:id/status", async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    show.status = req.body.status
    await show.save()
    res.send(show)
})

router.delete("/:id", async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    await show.destroy()
    res.send(show)
})



module.exports = router
