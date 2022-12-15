// backend/routes/api/session.js
const express = require('express')
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, sequelize, ReviewImage, Booking } = require('../../db/models');
const { Op, json } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth.js');

router.get('/test', requireAuth, (req, res) => {
  res.json({message: 'success'})
})

//**//6 - Get all Spots - DONE
//**//26 - Add Query Filters to Get All Spots - DID NOT FINISH
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
        if(!size) size = 100
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
          const Spots = []
        for (let spot of allSpots) {
            let newVar = spot.toJSON()
            const avgRating = await Review.findAll({
                // attributes: [[sequelize.fn('AVG', sequelize.col('stars')),'avgRating']],
                attributes: [[sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('stars')),1),'avgRating']],
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
            } else {
                newVar.previewImage = 'https://a0.muscache.com/im/pictures/d99ba571-4ea2-453d-8eb3-11459a57a038.jpg?im_w=1200'
            }
            Spots.push(newVar)

        }
        res.json({
            Spots,
            size,
            page
        })

    } catch(error) {
        console.log(error)
        // error.errors.map(er => { //im not sure if this is needed here
        //     errObj[er.path] = errorStrings[er.path]
       // })
        res.statusCode = 400
        res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: errObj
        })

    }
})

        //EXTRA CODE for problems
            //**//6 - Get all Spots
            //**//26 - Add Query Filters to Get All Spots
        //eager loading causes issues TA said for heroku, but it worked for local
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


//**//7 - Get all Spots owned by the Current User - DONE
router.get('/current', requireAuth, async (req, res, next) => {

//EXTRA CODE this only works if there is an (err req, res, next)
//         res.statusCode = 401
//         res.json({
//             message: "Authentication required",
//             statusCode: 401
//         })
//    }
    const userId = req.user.id

    const allSpots = await Spot.findAll({
        where: {ownerId: userId}
    })

    if(!allSpots[0]) {
        res.statusCode = 403
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    const newSpots = []
    for (let spot of allSpots) {
       let newVar = spot.toJSON()
       const avgRating = await Review.findAll({
        //    attributes: [[sequelize.fn('AVG', sequelize.col('stars')),'avgRating']],
           attributes: [[sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('stars')),1),'avgRating']],
           where: {spotId : spot.id},
           raw: true
       })
       //Extra code not needed:
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
       } else {
        newVar.previewImage = 'https://a0.muscache.com/im/pictures/0b075dc9-94b0-4b2a-8400-5c27f3492ffa.jpg?im_w=1200'
    }

       newSpots.push(newVar)
    }
    res.json(newSpots)

})

//**// 8 - Get details of a Spot from an id - DONE
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

    let nextPiece = desiredSpot.toJSON()
    const finalSpot = []

    //avgStarRating
    const avgStarRating = await Review.findAll({
        attributes: [[sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('stars')),1),'avgStarRating']],
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
    let allImages = await SpotImage.findAll({
        attributes: ['id','url', 'preview'],
        where: {spotId : spotId},
        raw: true
    })
    //console.log('what is allImages.url//////////////////////////////', allImages)
    if(!allImages.length) {
       // allImages.url[0] = 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'
       //console.log('what is allImages.url//////////////////////////////', allImages)
       //allImages.push()
       allImages = [ {
        id:0,
        url:'https://www.jetsetter.com//uploads/sites/7/2018/04/ye1G3gcr-1380x1035.jpeg',
        previewImage: true
        }]
    }
    nextPiece.SpotImages = allImages

    //owner info
    const spotOwner = await User.findOne({
        attributes: ['id','firstName', 'lastName'],
        where: {id : desiredSpot.ownerId},
        raw: true
    })
    nextPiece.Owner = spotOwner


    //finalSpot.push(nextPiece)
    res.json(nextPiece)
})

//**// 9 - Create a Spot - DONE
router.post('/', requireAuth, async (req, res, next) => {
     const userId = req.user.id
     const {address, city, state, country, lat, lng, name, description, price} = req.body
    const errorStrings = {
        "address": "Street address must be 1 to 50 characters",
        "city": "City must be 1 to 50 characters",
        "state": "State must be 1 to 50 characters",
        "country": "Country must be 1 to 50 characters",
        "lat": "Latitude is not valid",
        "lng": "Longitude is not valid",
        "name": "Name must be must be 1 to 50 characters",
        "description": "Description must be 1 to 500 characters",
        "price": "Price per night must be $1-$5000"
    }
    const errObj = {}
    // if(!address) {errObj['address'] = errorStrings['address']}
    // if(!city) {errObj['city'] = errorStrings['city']}
    // if(!state) {errObj['state'] = errorStrings['state']}
    // if(!country) {errObj['country'] = errorStrings['country']}
    // if(!lat) {errObj['lat'] = errorStrings['lat']}
    // if(!lng) {errObj['lng'] = errorStrings['lng']}
    // if(!name) {errObj['name'] = errorStrings['name']}
    // if(!description) {errObj['description'] = errorStrings['description']}
    // if(!price) {errObj['price'] = errorStrings['price']}

    try{
        const newSpot = await Spot.create({ownerId: userId, address, city, state, country, lat, lng, name, description, price})
        res.json(newSpot)
    } catch(error) {
        console.log('the backend error', error)
        error.errors.map(er => {
            errObj[er.path] = errorStrings[er.path]
        })
        res.statusCode = 436
        res.json({
            message: 'Validation Error',
            statusCode: 436,
            errors: errObj
        })
    }
})

//**// 10 - Add an Image to a Spot based on the Spot's id - DONE
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId
    const userId = req.user.id
    const { url, preview } = req.body

    const findOwnerOfSpot = await Spot.findOne({
      where: { ownerId: userId,
               id: spotId },
       attributes: ['ownerId']
    })

    //based on the test results it seems 404 spot couldn't be found it wanted not 403 forbidden
    // if(!findOwnerOfSpot) {
    //     res.statusCode = 403
    //     res.json({
    //         message: "Forbidden",
    //         statusCode: 403
    //     })
    // }

    if( findOwnerOfSpot && userId === findOwnerOfSpot.ownerId ) {
    const makeSpotImage = await SpotImage.create({spotId, url, preview})
    const spotImageInfo = await SpotImage.findOne({
       where: { spotId: spotId},
       attributes: [ 'id', 'url', 'preview']
    })
    res.json(spotImageInfo)

    } else {
       const err = new Error("Spot couldn't be found")
       err.status = 404
       next(err)
    }
})

//**//11 - Edit a Spot - DONE
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
       return
     }

     const errObj = {}
     const errorStrings = {
        "address": "Street address is required",
        "city": "City is required",
        "state": "State is required",
        "country": "Country is required",
        // "lat": "Latitude is not valid",
        // "lng": "Longitude is not valid",
        "name": "Name must be less than 50 characters",
        "description": "Description is required",
        "price": "Price per day is required"
    }

    try{
        if(!address) {errObj['address'] = errorStrings['address']}
        if(!city) {errObj['city'] = errorStrings['city']}
        if(!state) {errObj['state'] = errorStrings['state']}
        if(!country) {errObj['country'] = errorStrings['country']}
        // if(!lat) {errObj['lat'] = errorStrings['lat']}
        // if(!lng) {errObj['lng'] = errorStrings['lng']}
        if(!name) {errObj['name'] = errorStrings['name']}
        if(!description) {errObj['description'] = errorStrings['description']}
        if(!price) {errObj['price'] = errorStrings['price']}

        if(Object.keys(errObj).length) {
            console.log('what is this',errObj)
            throw new Error ("Validation was not met")

        }
       const newSpot = await updatedSpot.update({ address, city, state, country, lat, lng, name, description, price})

        // extra code:
        // the other method for reference:  if(price) {updatedSpot.price = price}
        // res.json(updatedSpot)
        // await updatedSpot.save()
        res.json(newSpot)

    } catch(error) {
        console.log('testing for error ', error)
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
        return
    }
    // res.json(updatedSpot)
})

//**// 12 - Delete a Spot - DONE
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId
    const userId = req.user.id
     // extra code for testing
     // res.json(spotId) //7
     // res.json(userId) //6 (spot of 7 is owned by user 6)

    const spotToDelete = await Spot.findOne({
        where: { id: spotId, ownerId: userId}
    })

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

//**//14 - Get all Reviews by a Spot's id - DONE
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
            return
        }

        const Reviews = []
        for (let rev of allReviews) {
            let newVar = rev.toJSON()

        const user = await User.findOne({
            where: {id: rev.userId},
            attributes: ['id', 'firstName', 'lastName']
        })
        newVar.User = user

        const ReviewImages = await ReviewImage.findAll({
            where: {reviewId: rev.id},
            attributes: ['id','url']
        })

        newVar.ReviewImages = ReviewImages
            Reviews.push(newVar)
        }

        res.json({Reviews})
    })


//**// 15 - Create a Review for a Spot based on the Spot's id  -  DONE
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
     const userId = req.user.id
   const { review, stars } = req.body

   //this functionality made it so only the owner of a spot could review it, so I took that out
   //could add owner can't review their own spot
//    const findOwnerOfSpot = await Spot.findOne({
//     where: { ownerId: userId,
//              id: spotId },
//      attributes: ['ownerId']
//   })
//          if( !findOwnerOfSpot || !(userId === findOwnerOfSpot.ownerId) ) {
//             res.statusCode = 404
//             res.json({
//             message: "Spot couldn't be found",
//             statusCode: 404,
//             })
//         }

        const allReviewsOfThisSpot = await Review.findAll({
             where: { userId: userId,
                spotId: spotId },
        })

        if(allReviewsOfThisSpot.length) {
            res.statusCode = 403
            res.json({
            message: "User already has a review for this spot",
            statusCode: 403,
            })
            return
        }

    const errObj = {}
    const errorStrings = {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
    }

        try{
            //I think commenting out the next 4 lines will mean the model validation is used
            // if(!review) {errObj['review'] = errorStrings['review']}
            // if(!stars) {errObj['stars'] = errorStrings['stars']}
            // if(Object.keys(errObj).length) {
            //     throw new Error ("Validation was not met")
            // }
               const newReview = await Review.create({ userId, spotId, review, stars })
               res.json(newReview)
        } catch(error) {

            if(error.errors) {
              //  console.log('LINE 565 ARE WE GETTING STARS', er)
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
    res.json(spotId)
})

  //**//  20 - Get all Bookings for a Spot based on the Spot's id - DONE
  router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const userId =  req.user.id //20 use number to check not spot owner
    const spotId = req.params.spotId

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
           let desiredBooking = await Booking.findOne({
            where: {spotId: spotId},
            attributes: [ 'spotId', 'startDate', 'endDate' ]
        })
            let Bookings = []
            let newVar = desiredBooking.toJSON()
            Bookings.push(newVar)
            res.json({Bookings})
    }
    //if you are spotOwner
    if(userId === desiredSpot.ownerId) {

                let desiredBookingAll = await Booking.findOne({
                    where: { spotId: spotId}
                })
                let desiredBooking = await Booking.findOne({
                    where: {spotId: spotId},
                  //  attributes: [ 'spotId', 'startDate', 'endDate' ]
                })

                let Bookings = []
                let newVar = desiredBooking.toJSON()

                    const user = await User.findOne({
                        where: {id: desiredBookingAll.userId},
                        attributes: ['id', 'firstName', 'lastName']
                    })
                    newVar.User = user

                Bookings.push(newVar)
                res.json({Bookings})
                    }
  })


  //**// 21 - Create a Booking from a Spot based on the Spot's id - DONE
  router.post('/:spotId/bookings', requireAuth, async (req, res, next) => { //in postman its spotIdForBooking
    const spotIdForBooking =  req.params.spotId
    const userId = req.user.id
    let { startDate, endDate } = req.body

    const ownerOfSpotCheck = await Spot.findOne({
        where: {
            id: spotIdForBooking,
            ownerId: userId
        }
    })
    if(ownerOfSpotCheck) {
        res.statusCode = 403
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    const doesThisSpotExist = await Spot.findByPk(spotIdForBooking)
    if (!doesThisSpotExist) {
        res.statusCode = 404
        res.json({
        message: "Couldn't find a Spot with the specified id",
        statusCode: 404,
        })
    }
     //not required but adding can't make bookings in the past
       //make currentDateTotal
       let currentDate = new Date()
       let currentYear = currentDate.getFullYear()
       let currentMonth = currentDate.getMonth() + 1
       if (currentMonth < 10) {   currentMonth = '0' + currentMonth.toString() }
       let currentDay = currentDate.getDate()
       if( currentDay < 10) {  currentDay = '0' + currentDay.toString() }
       let currentDateTotal = (currentYear + '-' + currentMonth + '-' + currentDay)

    if ( startDate < currentDateTotal ) {
        res.statusCode = 403
        res.json({
        message: "Bookings cannot be created in the past",
        statusCode: 403,
        })
    }

    const errorStrings1 = {
        "endDate": "endDate cannot be on or before startDate"
    }
    const errorStrings2 = { //I don't have this set up for them to work independently
        "startDate": "Start date conflicts with an existing booking",
        "endDate": "End date conflicts with an existing booking"
    }
     const errObj = {}

     startDate = startDate //+ 'T00:00:00.000Z' //I changed all my date management but could change back if needed
     endDate = endDate //+ 'T00:00:00.000Z'

        const allBookingsOfThisSpot = await Booking.findAll({
            where: { spotId: spotIdForBooking}
        })

        //NOTE: the for loop cannot have the catch block in it, so the try block will run if errors are not caught before the for loop
        for (let alreadyBookedSpot of allBookingsOfThisSpot) {

        if (startDate > endDate) {  //before & after or equal a booking
            errObj['endDate'] = errorStrings1['endDate']
            res.statusCode = 400
            res.json({
            message: "Validation error",
            statusCode: 400,
            errors: errObj
            })
        } else  if (startDate <= alreadyBookedSpot.startDate && endDate >= alreadyBookedSpot.endDate) {  //before & after or equal a booking
            errObj['startDate'] = errorStrings2['startDate']
            errObj['endDate'] = errorStrings2['endDate']
              res.statusCode = 403
              res.json({
              message: "Sorry, this spot is already booked for the specified dates",
              statusCode: 403,
              errors: errObj
              })
          } else if ( startDate > alreadyBookedSpot.startDate && endDate < alreadyBookedSpot.endDate) { //after & before a booking
            errObj['startDate'] = errorStrings2['startDate']
            errObj['endDate'] = errorStrings2['endDate']
              res.statusCode = 403
              res.json({
              message: "Sorry, this spot is already booked for the specified dates",
              statusCode: 403,
              errors: errObj
              })
          } else if(startDate <= alreadyBookedSpot.startDate && endDate > alreadyBookedSpot.startDate ) { //overlapping with start
            errObj['startDate'] = errorStrings2['startDate']
              res.statusCode = 403
              res.json({
              message: "Sorry, this spot is already booked for the specified dates",
              statusCode: 403,
              errors: errObj
              })
        } else if(endDate >= alreadyBookedSpot.endDate && startDate < alreadyBookedSpot.endDate ) { //overlapping with end
            errObj['endDate'] = errorStrings2['endDate']
              res.statusCode = 403
              res.json({
              message: "Sorry, this spot is already booked for the specified dates",
              statusCode: 403,
              errors: errObj
              })
            }
        }

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

  })

module.exports = router;
