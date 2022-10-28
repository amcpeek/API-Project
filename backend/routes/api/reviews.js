// backend/routes/api/session.js
const express = require('express')
const router = express.Router();

// backend/routes/api/session.js
//const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, sequelize, ReviewImage } = require('../../db/models');
const { Op, json } = require('sequelize');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth.js');
const review = require('../../db/models/review');

// router.get('/test', requireAuth, (req, res) => {
//   res.json({message: 'success'})
// })

// router.get('/', async (req, res, next) => {
//   // const message = 'hi-'
//   // res.json(message)
//   const reviewsOfCurrentUser = await Review.findAll({})
//   res.json(reviewsOfCurrentUser)
// })

router.get('/current',requireAuth, async (req, res, next) => {
  const userId = 1//req.user.id
  const allReviews = await Review.findAll({
      where: {userId: userId}
  })

  const Reviews = []
  for (let rev of allReviews) {
     let newVar = rev.toJSON()
    //  const avgRating = await Review.findAll({
    //      attributes: [[sequelize.fn('AVG', sequelize.col('stars')),'avgRating']],
    //      where: {spotId : spot.id},
    //      raw: true
    //  })
     // if(!avgRating[0].toJSON().avgRating) {
     //     newVar.avgRating = null
     // } else {

     // }
    // newVar.avgRating = avgRating[0].avgRating

    //  const imagez = await SpotImage.findOne({
    //      attributes: ['url'],
    //      where: {preview: true, spotId : spot.id},
    //      raw: true
    //  })
    //  if(imagez) {
    //   newVar.previewImage = imagez.url

    //  }
    const user = await User.findOne({
      where: {id: userId},
      attributes: ['id', 'firstName', 'lastName']
    })
    newVar.User = user

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

    //  res.json(spot)
     const previewImage = await SpotImage.findOne({
      where: { spotId: spot.id},
      attributes: ['url']
     })
     //res.json(previewImage)
     if(previewImage) {
      spot.previewImage = previewImage.url
     }

    // const neareowijg = previewImage
   //  console.log('OOOOOOOOOOOOOOOOOOOOOOOOOO', spot)
     //res.json()

    //  spot.previewImage = previewImage
     newVar.Spot = spot
      //**couldnt get the previewImage: image url to attach to the spot object,  */

    //  newVar.Spot.previewImage = previewImage.url
   // newVar.previewImage =  previewImage.url

     const ReviewImages = await ReviewImage.findAll({
      where: {reviewId: rev.id},
      attributes: ['id','url']
     })
      // console.log('OOOOOOOOOOOOOOOOOOOOOOOOOO', rev.id)

     newVar.ReviewImages = ReviewImages

     Reviews.push(newVar)
  }
  res.json({Reviews})

  //////////////////////////////////////
  //res.json(userId)
//   const reviewsOfCurrentUser = await Review.findAll({
//     where: {userId: userId}
//   })
//   const final = []
//   for (let review of reviewsOfCurrentUser) {
//     let newVar = review.toJSON()

//     const spots = await Spot.findOne({
//       where: {userId: userId}
//     })
//     if(spots) {
//       newVar.Spot = spots
//     }
//     final.push(spots)
//   }
// res.json(final)
})

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
  const userId = req.user.id
  const { url } = req.body
  const reviewId = req.params.reviewId
  //res.json(reviewId)

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
