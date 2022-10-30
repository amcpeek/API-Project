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
const reviewImage = require('../../db/models/reviewImage');

router.get('/test', requireAuth, (req, res) => {
  res.json({message: 'success'})
})


router.delete('/:reviewImageId', requireAuth, async (req, res, next) => {
    const reviewImageId = req.params.reviewImageId
    const userId = req.user.id
    const desiredReviewImage = await ReviewImage.findByPk(reviewImageId)
    if(!desiredReviewImage) {
        res.statusCode = 404
        res.json({
            message: "Review image couldn't be found",
            statusCode: 404
        })
    }
    const desiredReview = await Review.findByPk(desiredReviewImage.reviewId)

    const checkOwner = await Review.findOne({
        where: {id: desiredReviewImage.reviewId,
        userId: userId}
    })


    if (!checkOwner) {
        res.json({
            message: "Only the owner can delete the review image",
            statusCode: 404
        })

    } else {
        await desiredReviewImage.destroy()
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })

    }


})



module.exports = router;
