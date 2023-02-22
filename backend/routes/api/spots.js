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
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice, region, searchTerm, age } = req.query
    //let { region } = req.query
    let myState = []
    let mySearchTerm = ''
    let priceRange = []
    let sortDate = new Date(new Date().setFullYear(new Date().getFullYear() - 10))
    if(region === 'west') { myState = ['California', 'Oregon','Washington', 'Idaho', 'Montana', 'Wyoming', 'Nevada', 'Arizona', 'Colorado', 'Utah', 'New Mexico'] }
    if(region === 'midwest') { myState = ['North Dakota', 'South Dakota', 'Minnesota', 'Wisconsin', 'Michigan', 'Nebraska', 'Iowa', 'Illinois', 'Indiana', 'Ohio', 'Kansas', 'Missouri']}
    if(region === 'pacific') { myState = ['Hawaii', 'Alaska']}
    if(region === 'south') { myState = ['Texas', 'Oklahoma', 'Arkansas', 'Louisiana', 'Mississippi', 'Alabama', 'Georgia', 'Florida', 'South Carolina', 'North Carolina', 'Tennessee', 'Kentucky', 'Virginia', 'West Virginia', 'Maryland']}
    if(region === 'northeast') { myState = ['New York', 'Maine', 'New Hampshire', 'Vermont', 'Massachusetts', 'Pennsylvania', 'New Jersey', 'Connecticut', 'Rhode Island', 'Delaware']}
    if(region === 'anywhere') { myState = []}
    if(searchTerm) { mySearchTerm = searchTerm, console.log('mySearchTermNow', mySearchTerm)}
    if(age === 'oneDay'){   sortDate  = new Date(Date.now() - (60 * 60 * 1000 * 24))}
    console.log('searchTerm', searchTerm, 'mySearchTerm', mySearchTerm)
    if(maxPrice) {
        priceRange = maxPrice.split(',')
    }
    maxPrice = priceRange[1]



    //set sort date to one hour
    // if(age === 'oneDay'){   sortDate  = new Date(Date.now() - (60 * 60 * 1000 * 1))}
    // set sort date to one week
    // let lastWeek = new Date()
    //lastWeek.setDate(lastWeek.getDate()-7)
    // lastWeek.setDate(lastWeek.getTime()-(60*60*1000))


    console.log('now', new Date(), 'a year ago',new Date(new Date().setFullYear(new Date().getFullYear() - 1)) )

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
    try{
        if(page && Number.isNaN(page))  {errObj['page'] = errorStrings['page']}
        if(size && Number.isNaN(size))   {errObj['size'] = errorStrings['size']}
        if(minLat && Number.isNaN(minLat)) {errObj['minLat'] = errorStrings['minLat']}
        if(maxLat && Number.isNaN(maxLat)) {errObj['maxLat'] = errorStrings['maxLat']}
        if(minLng && !(minLng > -180)) {errObj['minLng'] = errorStrings['minLng']}
        if(maxLng && !(maxLng < 180)) {errObj['maxLng'] = errorStrings['maxLng']}
        if(minPrice && !(minPrice > 0)) {errObj['minPrice'] = errorStrings['minPrice']}
        // if( maxPrice && Number.isNaN(maxPrice)) {errObj['maxPrice'] = errorStrings['maxPrice']}
        if( priceRange && Number.isNaN(priceRange[0])) {errObj['maxPrice'] = errorStrings['maxPrice']}
        page = parseInt(page)
        size = parseInt(size)
        minLat = parseFloat(minLat)
        maxLat = parseFloat(maxLat)
        minLng = parseFloat(maxLng)
        maxLng = parseFloat(maxLng)
        minPrice = parseFloat(priceRange[0])
        maxPrice = parseFloat(priceRange[1])

        if(size > 20) size = 20
        if(size < 1) size = 1
        if(page > 10 ) page = 10
        if(page < 1) page = 1
        if(!page) page = 1
        if(!size) size = 100
        console.log('&&&&&&^^^^^^^^&&&&&&^^^^^^what is max price', maxPrice, 'minPrice', minPrice)

        const allSpots = await Spot.findAll({
             limit: size,
                offset: (page -1) * size,
                where: {
                    price: {
                        [Op.lte]: maxPrice || 5000,
                        [Op.gte]: minPrice || 0,
                    },
                    state: {[Op.or]: myState},
                    [Op.or] : [
                    {name: { [Op.like]:`%${mySearchTerm}%`}},
                    {description: { [Op.like]:`%${mySearchTerm}%`}},
                    {city: { [Op.like]:`%${mySearchTerm}%`}},
                    {state: { [Op.like]:`%${mySearchTerm}%`}},
                    {country: { [Op.like]:`%${mySearchTerm}%`}},
                    ],
                    createdAt: { [Op.gte]: sortDate}
                },
                 })

        if(searchTerm) {
            const allSpotsMeetsReviews = await Spot.findAll({
                include: [{
                    model: Review,
                      where: {  review: { [Op.like]:`%${mySearchTerm}%`} }
                }]
            })
            let setSpots = new Set()
        for ( let i = 0; i < allSpots.length; i++) {
                setSpots.add(allSpots[i].dataValues.id)
        }

        for ( let i = 0; i < allSpotsMeetsReviews.length; i++) {
            if(!(setSpots.has(allSpotsMeetsReviews[i].dataValues.id))) {
                allSpots.push(allSpotsMeetsReviews[i])
            }
        }

        }

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
           //     newVar.previewImage = 'https://a0.muscache.com/im/pictures/d99ba571-4ea2-453d-8eb3-11459a57a038.jpg?im_w=1200'
            }
            Spots.push(newVar)

        }
        res.json({
            Spots,
            size,
            page
        })

    } catch(error) {
      //  console.log(error)
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

    // if(!allSpots[0]) {
    //     res.statusCode = 403
    //     res.json({
    //         message: "Forbidden",
    //         statusCode: 403
    //     })
    // }

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
      //  newVar.previewImage = 'https://a0.muscache.com/im/pictures/0b075dc9-94b0-4b2a-8400-5c27f3492ffa.jpg?im_w=1200'
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
    // if(!allImages.length) {
    //    // allImages.url[0] = 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'
    //    //console.log('what is allImages.url//////////////////////////////', allImages)
    //    //allImages.push()
    //    allImages = [ {
    //     id:0,
    //     url:'https://www.jetsetter.com//uploads/sites/7/2018/04/ye1G3gcr-1380x1035.jpeg',
    //     previewImage: true
    //     }]
    // }
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
     const {address, city, state, country, name, description, price} = req.body
     // lat, lng,
    const errorStrings = {
        "address": "Street address must be 1 to 30 characters",
        "city": "City must be 1 to 30 characters",
        "state": "State must be 1 to 30 characters",
        "country": "Country must be 1 to 30 characters",
        // "lat": "Latitude is not valid",
        // "lng": "Longitude is not valid",
        "name": "Name must be must be 1 to 30 characters",
        "description": "Description must be 1 to 255 characters",
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
        const newSpot = await Spot.create({ownerId: userId, address, city, state, country,  name, description, price})
        //lat, lng,
        res.json(newSpot)
    } catch(error) {
       // console.log('the backend error', error)
       if(error.errors) {
            error.errors.map(er => {
                errObj[er.path] = errorStrings[er.path]
            })
            res.statusCode = 400
            res.json({
                message: 'Validation Error',
                statusCode: 400,
                errors: errObj
            })

       } else {
        res.json({
            message: 'Backend Error',
            statusCode: 400,
            errors: 'There was a backend error'
        })
       }

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
        "address": "Street address must be 1 to 30 characters",
        "city": "City must be 1 to 30 characters",
        "state": "State must be 1 to 30 characters",
        "country": "Country must be 1 to 30 characters",
        // "lat": "Latitude is not valid",
        // "lng": "Longitude is not valid",
        "name": "Name must be must be 1 to 30 characters",
        "description": "Description must be 1 to 255 characters",
        "price": "Price per night must be $1-$5000"
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
          //  console.log('what is this',errObj)
            throw new Error ("Validation was not met")

        }
       const newSpot = await updatedSpot.update({ address, city, state, country, lat, lng, name, description, price})

        // extra code:
        // the other method for reference:  if(price) {updatedSpot.price = price}
        // res.json(updatedSpot)
        // await updatedSpot.save()
        res.json(newSpot)

    } catch(error) {
      //  console.log('testing for error ', error)
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

        // if(allReviews.length === 0) {
        //     res.statusCode = 404
        //     res.json({
        //         message: "Spot couldn't be found",
        //         statusCode: 404
        //     })
        //     return
        // }

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
        "review": "Review text must be 1 to 255 characters",
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
           let desiredBooking = await Booking.findAll({
            where: {spotId: spotId},
            attributes: [ 'spotId', 'startDate', 'endDate' ]
        })
        let Bookings = []
        for (let book of desiredBooking) {
            let newVar = book.toJSON()
            Bookings.push(newVar)
        }
            res.json({Bookings})
    }
    //if you are spotOwner
    if(userId === desiredSpot.ownerId) {

                let desiredBookingAll = await Booking.findAll({
                    where: { spotId: spotId}
                })
                // console.log('&&&&&&&&&&&&&&&&&&!!&&&&&&&&&&&&desiredBookingAll', desiredBookingAll)
                let desiredBooking = await Booking.findOne({
                    where: {spotId: spotId},
                  //  attributes: [ 'spotId', 'startDate', 'endDate' ]
                })

                let Bookings = []
                for (let book of desiredBookingAll) {
                    let newVar = book.toJSON()
                    Bookings.push(newVar)
                    const user = await User.findOne({
                        where: {id: desiredBooking.userId},
                        attributes: ['id', 'firstName', 'lastName']
                    })
                    newVar.User = user
                }
                res.json({Bookings})
                    }
  })


  //**// 21 - Create a Booking from a Spot based on the Spot's id - DONE
  router.post('/:spotId/bookings', requireAuth, async (req, res, next) => { //in postman its spotIdForBooking

    const spotIdForBooking =  req.params.spotId
    const userId = req.user.id
    let { startDate, endDate } = req.body
    console.log('XXXXXXXXXXXXXXXXXXXXXXX entering the start of create booking 21?', startDate, endDate)

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
            console.log('XXXX///XXXXX???XXXX???entering backend try block?', spotIdForBooking, userId, startDate, endDate)
            const newBooking = await Booking.create({
                spotId: spotIdForBooking,
                userId: userId,
                startDate: startDate,
                endDate: endDate
           })
            res.json(newBooking)
            } catch(error) {

                //old way
            res.statusCode = 400
            res.json({
                message: 'Validation Error',
                statusCode: 400,
                errors: errObj
            })

            //new way

            if(error.errors) {
                error.errors.map(er => {
                    errObj[er.path] = errorStrings2[er.path]
                })
                res.statusCode = 400
                res.json({
                    message: 'Validation Error',
                    statusCode: 400,
                    errors: errObj
                })

           } else {
            res.json({
                message: 'Backend Error',
                statusCode: 400,
                errors: 'There was a backend error'
            })
           }




            }

  })

module.exports = router;
