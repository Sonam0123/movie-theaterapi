const express = require("express")
const { check, validationResult } = require("express-validator")
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

router.put("/rating/:id", async (req, res) => {
    const show = await Show.findByPk(req.params.id)
    show.rating = req.body.rating
    await show.save()
    res.send(show)
})

router.put("/status/:id", [check("status").not().isEmpty().withMessage("Status cannot be empty")],
[check("status").isLength({ min: 5, max: 25})], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
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
