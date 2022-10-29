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
const spot = require('../../db/models/spot');

router.get('/test', requireAuth, (req, res) => {
  res.json({message: 'success'})
})


router.get('/testt', async (req, res, next) => {
    const message = 'hi-'
    res.json(message)
    // const reviewsOfCurrentUser = User.findAll({})
    // res.json(reviewsOfCurrentUser)
  })


//**GET ALL SPOTS **DONE
router.get('/', async (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query


    const errorStrings = {
        "page": "Page must be greater than or equal to 1",
        "size": "Size must be greater than or equal to 1",
        "maxLat": "Maximum latitude is invalid",
        "minLat": "Minimum latitude is invalid",
        "minLng": "Maximum longitude is invalid",
        "maxLng": "Minimum longitude is invalid",
        "minPrice": "Maximum price must be greater than or equal to 0",
        "maxPrice": "Minimum price must be greater than or equal to 0"
    }
     const errObj = {}
    // if(!page) {errObj['page'] = errorStrings['page']}
    // if(!size) {errObj['size'] = errorStrings['size']}
    // if(!minLat) {errObj['minLat'] = errorStrings['minLat']}
    // if(!maxLat) {errObj['maxLat'] = errorStrings['maxLat']}
    // if(!minLng) {errObj['minLng'] = errorStrings['minLng']}
    // if(!maxLng) {errObj['maxLng'] = errorStrings['maxLng']}
    // if(!minPrice) {errObj['minPrice'] = errorStrings['minPrice']}
    // if(!maxPrice) {errObj['maxPrice'] = errorStrings['maxPrice']}



    try{
       //Im not sure if any of this error handling is working
        if(page && Number.isNaN(page))  {errObj['page'] = errorStrings['page']}
        if(size && Number.isNaN(size))   {errObj['size'] = errorStrings['size']}
        if(minLat && Number.isNaN(minLat)) {errObj['minLat'] = errorStrings['minLat']}
        if(maxLat && Number.isNaN(maxLat)) {errObj['maxLat'] = errorStrings['maxLat']}
        if(minLng && !(minLng > -180)) {errObj['minLng'] = errorStrings['minLng']}
        if(maxLng && !(maxLng < 180)) {errObj['maxLng'] = errorStrings['maxLng']}
        if(minPrice && !(minPrice > 0)) {errObj['minPrice'] = errorStrings['minPrice']}
        if( maxPrice && Number.isNaN(maxPrice)) {errObj['maxPrice'] = errorStrings['maxPrice']}
        page = parseInt(page)
        size = parseInt(size)
        minLat = parseFloat(minLat)
        maxLat = parseFloat(maxLat)
        minLng = parseFloat(maxLng)
        maxLng = parseFloat(maxLng)
        minPrice = parseFloat(minPrice)
        maxPrice = parseFloat(maxPrice)

        if(size > 20) size = 20
        if(size < 1) size = 1
        if(page > 10 ) page = 10
        if(page < 1) page = 1
        if(!page) page = 1
        if(!size) size = 20
        const where = {} //im not using this
        const allSpots = await Spot.findAll({
             limit: size,
                offset: (page -1) * size,
            // where: {

            //      lat: {
            //          [Op.gte]: minLat || 35, //this OR thing doesn't work
            //          [Op.lte]: maxLat || 90
            //      },
            //      lng: {
            //          [Op.gte]: minLng || -180,
            //          [Op.lte]: maxLng || 180,
            //      },
            //      price: {
            //          [Op.gte]: minPrice || 0 ,
            //          [Op.lte]: maxPrice || 99999999999999
            //      }

            // }
          })
          const newSpots = []
        for (let spot of allSpots) {
            let newVar = spot.toJSON()
            const avgRating = await Review.findAll({
                attributes: [[sequelize.fn('AVG', sequelize.col('stars')),'avgRating']],
                where: {spotId : spot.id},
                raw: true
            })

            newVar.avgRating = avgRating[0].avgRating


            const allSpots = await SpotImage.findOne({
                where: {
                    preview: true,
                    spotId : spot.id,},
                attributes: ['url'],


                raw: true
            })
            if(allSpots) {
                newVar.previewImage = allSpots.url
            }
            newSpots.push(newVar)

        }
        res.json({
            newSpots,
            size,
            page
        })

    } catch(error) {
        console.log(error)
        // error.errors.map(er => {
        //     errObj[er.path] = errorStrings[er.path]
       // })
        res.statusCode = 400
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: errObj
        })

    }




        //eager loading causes issues
        // const allSpots = await Spot.findAll({
        //     include:[
        //         {
        //             model: SpotImage,
        //          //   as: 'previewImage',
        //             attributes: ['url']
        //         },
        //         {
        //             model: Review,
        //         //    as:'Reviews',
        //             attributes: [ ]
        //              //
        //         }
        //     ],
        //     attributes:  {
        //         include:[
        //             [sequelize.fn('AVG', sequelize.col('Reviews.stars')),'avgRating']
        //             ] }
        // })
        //  return res.json({allSpots})








        // if(minLat && !Number.isNaN(minLat)) {
        //     where.minLat = minLat
        // }


       //lazy loading is correct


        // if(!avgRating[0].toJSON().avgRating) {
        //     newVar.avgRating = null
        // } else {

        // }


})




// **GET ALL SPOTS BY CURRENT OWNER **DONE
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const allSpots = await Spot.findAll({
        where: {ownerId: userId}
    })

    const newSpots = []
    for (let spot of allSpots) {
       let newVar = spot.toJSON()
       const avgRating = await Review.findAll({
           attributes: [[sequelize.fn('AVG', sequelize.col('stars')),'avgRating']],
           where: {spotId : spot.id},
           raw: true
       })
       // if(!avgRating[0].toJSON().avgRating) {
       //     newVar.avgRating = null
       // } else {

       // }
       newVar.avgRating = avgRating[0].avgRating
       const allSpots = await SpotImage.findOne({
           attributes: ['url'],
           where: {preview: true, spotId : spot.id},
           raw: true
       })
       if(allSpots) {
        newVar.previewImage = allSpots.url

       }

       newSpots.push(newVar)
    }
    res.json(newSpots)

})

//GET DETAILS OF A SPOT BY ID
router.get('/:spotId', async (req, res, next) => {
    const spotId = req.params.spotId
    const desiredSpot = await Spot.findByPk(spotId)

    if(!desiredSpot) {
        const error = new Error("Spot couldn't be found")
        res.statusCode = 404
        res.json({
          message:error.message,
          statusCode: 404
        })
      }

  //  res.json(desiredSpot)
    let nextPiece = desiredSpot.toJSON()
    const finalSpot = []
    //avgStarRating
    const avgStarRating = await Review.findAll({
        attributes: [[sequelize.fn('AVG', sequelize.col('stars')),'avgStarRating']],
        where: {spotId : spotId},
        raw: true
    })
    nextPiece.avgStarRating = avgStarRating[0].avgStarRating

    //numReviews
    const numReviews = await Review.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('review')),'numReviews']],
        where: {spotId : spotId},
        raw: true
    })
    nextPiece.numReviews = numReviews[0].numReviews

    //SpotImages
    const allImages = await SpotImage.findAll({
        attributes: ['id','url', 'preview'],
        where: {preview: true, spotId : spotId},
        raw: true
    })
    nextPiece.SpotImages = allImages

    //owner info
    const spotOwner = await User.findOne({
        attributes: ['id','firstName', 'lastName'],
        where: {id : desiredSpot.ownerId},
        raw: true
    })
    nextPiece.Owner = spotOwner


    finalSpot.push(nextPiece)
    res.json(finalSpot)
})

//CREATE A SPOT - DONE
router.post('/', requireAuth, async (req, res, next) => {
     const userId = req.user.id
     const {address, city, state, country, lat, lng, name, description, price} = req.body
    const errorStrings = {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "price": "Price per day is required"
    }
    const errObj = {}
    if(!address) {errObj['address'] = errorStrings['address']}
    if(!city) {errObj['city'] = errorStrings['city']}
    if(!state) {errObj['state'] = errorStrings['state']}
    if(!country) {errObj['country'] = errorStrings['country']}
    if(!lat) {errObj['lat'] = errorStrings['lat']}
    if(!lng) {errObj['lng'] = errorStrings['lng']}
    if(!name) {errObj['name'] = errorStrings['name']}
    if(!description) {errObj['description'] = errorStrings['description']}
    if(!price) {errObj['price'] = errorStrings['price']}

    try{
        const newSpot = await Spot.create({ownerId: userId, address, city, state, country, lat, lng, name, description, price})
        res.json(newSpot)
    } catch(error) {
        error.errors.map(er => {
            errObj[er.path] = errorStrings[er.path]
        })
        res.statusCode = 400
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: errObj
        })
    }
})

//EDIT A SPOT

router.put('/:spotId', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const spotId = req.params.spotId

    const {address, city, state, country, lat, lng, name, description, price} = req.body
    const updatedSpot = await Spot.findOne({
       where: {id: spotId, ownerId: userId}
    })

    if(!updatedSpot) {
       const error = new Error("Spot couldn't be found")
       res.statusCode = 404
       res.json({
         message:error.message,
         statusCode: 404
       })
     }

     const errObj = {}
     const errorStrings = {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "price": "Price per day is required"
    }
    try{

        if(!address) {errObj['address'] = errorStrings['address']}
        if(!city) {errObj['city'] = errorStrings['city']}
        if(!state) {errObj['state'] = errorStrings['state']}
        if(!country) {errObj['country'] = errorStrings['country']}
        if(!lat) {errObj['lat'] = errorStrings['lat']}
        if(!lng) {errObj['lng'] = errorStrings['lng']}
        if(!name) {errObj['name'] = errorStrings['name']}
        if(!description) {errObj['description'] = errorStrings['description']}
        if(!price) {errObj['price'] = errorStrings['price']}

        if(Object.keys(errObj).length) {
            throw new Error ("Validation was not met")

        }
       const newSpot = await updatedSpot.update({ address, city, state, country, lat, lng, name, description, price})

        // the other method for reference:  if(price) {updatedSpot.price = price}
        // res.json(updatedSpot)
        // await updatedSpot.save()
        res.json(newSpot)
    } catch(error) {
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
    res.json(updatedSpot)
})
/////////////////////////////////////////
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
     const userId = req.user.id
   const { review, stars } = req.body
   console.log('A A A A A A A A A A A A', spotId, userId)


   const findOwnerOfSpot = await Spot.findOne({
    where: { ownerId: userId,
             id: spotId },
     attributes: ['ownerId']
  })
  //console.log('QQQQQQQQQQQQQQQQ',findOwnerOfSpot)
         if( !findOwnerOfSpot || !(userId === findOwnerOfSpot.ownerId) ) {
            res.statusCode = 400
            res.json({
            message: "Spot couldn't be found",
            statusCode: 400,
            })
        }

        const allReviewsOfThisSpot = await Review.findAll({
             where: { userId: userId,
                spotId: spotId },
        })
   //    console.log('ALL JOWSIEFNESIODFN',allReviewsOfThisSpot)

        if(allReviewsOfThisSpot.length) {
            res.statusCode = 400
            res.json({
            message: "User already has a review for this spot",
            statusCode: 400,
            })

        }
     //   res.json(findOwnerOfSpot)
        // if( !findOwnerOfSpot || !(userId === findOwnerOfSpot.ownerId) ) {
        //     res.statusCode = 400
        //     res.json({
        //     message: "User already has a review for this spot",
        //     statusCode: 400,
        //     })
        // }
  //res.json(findOwnerOfSpot)

  //console.log('A A A A A A A A A A A A', spotId, userId)  //, findOwnerOfSpot)

  //CLOSE THIS
    const errObj = {}
    const errorStrings = {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
    }
    ////
        try{
            if(!review) {errObj['review'] = errorStrings['review']}
            if(!stars) {errObj['stars'] = errorStrings['stars']}
            if(Object.keys(errObj).length) {
                throw new Error ("Validation was not met")
            }
               const newReview = await Review.create({ userId, spotId, review, stars })
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
        // res.statusCode = 400
        // res.json({
        //   message: 'Validation Error',
        //   statusCode: 400,
        // })
    }

    res.json(spotId)
})




/********************************** */
/********************************** */
/********************************** */
/********************************** */
/********************************** */

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
     const spotId = req.params.spotId
     const userId = req.user.id
    // res.json(userId)
      const { url, preview } = req.body
    //  const test = await Spot.findOne({})
   //   res.json(test)
     //its not working because the userID given isnt an option
     //on the user table, so its freaking out
     const findOwnerOfSpot = await Spot.findOne({
       where: { ownerId: userId,
                id: spotId },
        attributes: ['ownerId']
     })

     if( findOwnerOfSpot && userId === findOwnerOfSpot.ownerId ) {
     const makeSpotImage = await SpotImage.create({spotId, url, preview})
     //return spot info
     const spotImageInfo = await SpotImage.findOne({
        where: { spotId: spotId},
        attributes: [ 'id', 'url', 'preview']
     })
      //include only id, url, preview
     res.json(spotImageInfo)


     } else {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
     }
    //wrong
    //  const withScope = await SpotImage.scope(['defaultScope'])
    //  res.json(withScope)
})



/********************************** */
/********************************** */
/********************************** */



router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId
    const userId = req.user.id
  //  res.json(spotId) //7
   // res.json(userId) //6 (spot of 7 is owned by user 6)
    const spotToDelete = await Spot.findOne({
        where: { id: spotId, ownerId: userId}
    })
   // res.json(spotToDelete)


    if(spotToDelete) {
        await spotToDelete.destroy()
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    } else {
        res.statusCode = 404
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404

        })
    }
})

/********************************** */
/********************************** */

router.get('/:spotId/reviews', async (req, res, next) => {
    const spotId = req.params.spotId
    const allReviews = await Review.findAll({
        where: { spotId: spotId  }
    })

    if(allReviews.length === 0) {
        res.statusCode = 404
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404

        })

    }
    // console.log(spotId)
     const Reviews = []
     for (let rev of allReviews) {
        let newVar = rev.toJSON()

       const user = await User.findOne({
        where: {id: rev.userId},
        attributes: ['id', 'firstName', 'lastName']
      })
      newVar.User = user

    //   const spot = await Spot.findOne({
    //     where: {id: rev.spotId},
    //     attributes: {exclude: ['createdAt', 'updatedAt'] }
    //    })

       const ReviewImages = await ReviewImage.findAll({
        where: {reviewId: rev.id},
        attributes: ['id','url']
       })

       newVar.ReviewImages = ReviewImages
        Reviews.push(newVar)
     }

    res.json({Reviews})
  })


  router.post('/:spotId/bookings', requireAuth, async (req, res, next) => { //in postman its spotIdForBooking
    const spotIdForBooking =  req.params.spotId
    const userId = req.user.id
    let { startDate, endDate } = req.body

    const doesThisSpotExist = await Spot.findByPk(spotIdForBooking)
    if (!doesThisSpotExist) {

        res.statusCode = 404
        res.json({
        message: "Couldn't find a Spot with the specified id", ////DONE
        statusCode: 404,
        })
    }

    const errorStrings1 = {
        "endDate": "endDate cannot be on or before startDate"
    }
    const errorStrings2 = {
    "startDate": "Start date conflicts with an existing booking",
    "endDate": "End date conflicts with an existing booking"
    }

     const errObj = {}

     startDate = startDate + 'T00:00:00.000Z' //REMEMBER TO CHANGE THIS
     endDate = endDate + 'T00:00:00.000Z'

     const alreadyBookedSpot = await Booking.findOne({
        where: {
            startDate: startDate,
            endDate: endDate,
            spotId: spotIdForBooking
        } })

        //res.json(alreadyBookedSpot)

     if (alreadyBookedSpot) {
        //  throw new Error("Sorry, this spot is already booked for the specified dates")
        errObj['startDate'] = errorStrings2['startDate']
        errObj['endDate'] = errorStrings2['endDate']
          res.statusCode = 403
          res.json({
          message: "Sorry, this spot is already booked for the specified dates",
          statusCode: 403,
          errors: errObj
          })

      }




    if( endDate <= startDate ) { //needs errors ////THIS CODE IS NOT DONE
       // res.statusCode = 400
        // res.json({
        // message: "endDate cannot be on or before startDate",
        // statusCode: 400
        // })
     //   const err = new Error("Spot couldn't be found")
        //err.status = 404
      //  next(err)
        errObj['endDate'] = errorStrings1['endDate']
        res.statusCode = 400
        res.json({
       // message: "Sorry, this spot is already booked for the specified dates",
        statusCode: 400,
        errors: errObj
        })
  } else {
    try{
        const newBooking = await Booking.create({

            spotId: spotIdForBooking,
            userId: userId,
            startDate: startDate,
            endDate: endDate

    })
    res.json(newBooking)

} catch(error) {

res.statusCode = 400
res.json({
    message: 'Validation Error',
    statusCode: 400,
    errors: errObj
})
}
  }
    })


//NOT STARTED
  router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const userId =  42 //req.user.id
    const spotId = req.params.spotId
    console.log('OOOOOOOOOOOOOOOOOOOOOOOOOO',userId, spotId)

    const desiredSpot = await Spot.findByPk(spotId)
    if(!desiredSpot) {
        res.statusCode = 404
                res.json({
                    message: "Spot couldn't be found",
                    statusCode: 404
                })

    }

     //if you are NOT spotOwner
    if(userId !== desiredSpot.ownerId) {

        //////LOOK HERE


        //res.json(desiredSpot.ownerId)
            let desiredBookingAll = await Booking.findOne({
                where: { spotId: spotId}
            })
           let desiredBooking = await Booking.findOne({
            where: {spotId: spotId},
            attributes: [ 'spotId', 'startDate', 'endDate' ]
        })

        let Bookings = []

            let newVar = desiredBooking.toJSON()
          //  res.json(newVar)

            const user = await User.findOne({
                where: {id: desiredBookingAll.userId},
                attributes: ['id', 'firstName', 'lastName']
              })
              newVar.User = user

        Bookings.push(newVar)
      //  Bookings = Bookings.toJSON()
       // Bookings.desiredBooking
        res.json({Bookings})



//////LOOK HERE

    }



    //if you are spotOwner
    if(userId === desiredSpot.ownerId) {
       // res.json(desiredSpot.ownerId)
       const desiredBooking2 = await Booking.findOne({
        where: {spotId: spotId}

    })
    res.json(desiredBooking2)
    }


  })







module.exports = router;
