// backend/routes/api/session.js
const express = require('express')
const router = express.Router();

// backend/routes/api/session.js
//const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, sequelize, ReviewImage, Booking } = require('../../db/models');
const { Op, json } = require('sequelize');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth.js');
const spotImage = require('../../db/models/spotImage');

router.get('/test', requireAuth, (req, res) => {
  res.json({message: 'success'})
})

router.delete('/:spotImageId', requireAuth, async (req, res, next) => {
    const spotImageId = req.params.spotImageId
    const userId = req.user.id
    const desiredSpotImage = await SpotImage.findByPk(spotImageId)
    if(!desiredSpotImage) {
        res.statusCode = 404
        res.json({
            message: "Spot image couldn't be found",
            statusCode: 404
        })
    }
    const desiredSpot = await Spot.findByPk(desiredSpotImage.spotId)

    const checkOwner = await Spot.findOne({
        where: {id: desiredSpotImage.spotId,
        ownerId: userId}
    })


    if (!checkOwner) {
        res.json({
            message: "Only the owner can delete the spot image",
            statusCode: 404
        })

    } else {
        await desiredSpotImage.destroy()
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })

    }


})

module.exports = router;
