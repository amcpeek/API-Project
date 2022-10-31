// backend/routes/api/session.js
const express = require('express')
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, sequelize, ReviewImage } = require('../../db/models');
const { Op, json } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth.js');

router.get('/test', requireAuth, (req, res) => {
  res.json({message: 'success'})
})

//**// 13 - Get all Reviews of the Current User  - DONE
router.get('/current',requireAuth, async (req, res, next) => {
  const userId = req.user.id
  const allReviews = await Review.findAll({
      where: {userId: userId}
  })

  if(!allReviews[0]) {
    res.statusCode = 403
    res.json({
        message: "Forbidden",
        statusCode: 403
    })
  }

  const Reviews = []
  for (let rev of allReviews) {
     let newVar = rev.toJSON()

    const user = await User.findOne({
      where: {id: userId},
      attributes: ['id', 'firstName', 'lastName']
    })
    newVar.User = user

    //extra code: code have done this with default scope
    // modelName: 'Spot',
    // defaultScope: {
    //   attributes: {
    //     exclude: ['createdAt', 'updatedAt']
    //   }
    // }

     let spot = await Spot.findOne({
      where: {id: rev.spotId},
      attributes: {exclude: ['createdAt', 'updatedAt'] }
     })
     spot = spot.toJSON()

     const previewImage = await SpotImage.findOne({
      where: { spotId: spot.id},
      attributes: ['url']
     })

     if(previewImage) { // this code is set up so if there isn't a previewImage it is excluded completely rather than null
      spot.previewImage = previewImage.url
     }

     newVar.Spot = spot
     const ReviewImages = await ReviewImage.findAll({
      where: {reviewId: rev.id},
      attributes: ['id','url']
     })

     newVar.ReviewImages = ReviewImages
     Reviews.push(newVar)
  }
  res.json({Reviews})
})

//**// 16 - Add an Image to a Review based on the Review's id - DONE
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  const userId = req.user.id
  const { url } = req.body
  const reviewId = req.params.reviewId


  const theReview = await Review.findOne({
    where: {
      id: reviewId,
      userId: userId
    }
  })
 
  if(!theReview ) {
    res.statusCode = 404
    res.json({
    message: "Review couldn't be found",
    statusCode: 404,
    })
 }

  const allImagesOfThisReview = await ReviewImage.findAll({
    where: { reviewId:reviewId }
  })

  if(allImagesOfThisReview.length > 10) {
    res.statusCode = 403
    res.json({
    message: "Maximum number of images for this resource was reached",
    statusCode: 403,
    })
  }

  const newReviewImage = await ReviewImage.create({reviewId, url})

  const findNewestReviewImage = await ReviewImage.findOne({
    where: {id: newReviewImage.id},
    attributes: ['id','url']
  })
  res.json(findNewestReviewImage)
})

//**// 17 - Edit a Review - DONE
router.put('/:reviewId', requireAuth, async (req, res, next) => {
  const userId = req.user.id
  const reviewId = req.params.reviewId
  const { review, stars } = req.body
  const updatedReview = await Review.findOne({
    where: {id: reviewId, userId: userId}
  })
  if(!updatedReview) {
    const error = new Error("Review couldn't be found")
    res.statusCode = 404
    res.json({
      message:error.message,
      statusCode: 404
    })
  }
  const errObj = {}
  const errorStrings = {
      "review": "Review text is required",
      "stars": "Stars must be an integer from 1 to 5",
  }
  try{
    if(!review) {errObj['review'] = errorStrings['review']}
    if(!stars) {errObj['stars'] = errorStrings['stars']}
    if(Object.keys(errObj).length) {
        throw new Error ("Validation was not met")
    }
       const newReview = await updatedReview.update({ review, stars })
       res.json(newReview)
} catch(error) {
    console.log(error)
    if(error.errors) {
        error.errors.map(er => {
            errObj[er.path] = errorStrings[er.path]
        })

    }
    res.statusCode = 400
    res.json({
        message: 'Validation Error',
        statusCode: 400,
        errors: errObj
    })
  }

})

//**// 18 - Delete a Review - DONE
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
  const reviewId = req.params.reviewId
  const userId = req.user.id
  const reviewToDelete = await Review.findOne({
    where: { id: reviewId, userId: userId}
  })

  if(reviewToDelete) {
    await reviewToDelete.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    })
  } else {
    res.statusCode = 404
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
  }

})









module.exports = router;
