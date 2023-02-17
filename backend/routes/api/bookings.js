 // backend/routes/api/session.js
const express = require('express')
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, sequelize, ReviewImage, Booking } = require('../../db/models');
const { Op, json } = require('sequelize');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth.js');
const spot = require('../../db/models/spot');
const booking = require('../../db/models/booking');

router.get('/test', requireAuth, (req, res) => {
  res.json({message: 'success'})
})

 //**// 19 - Get all of the Current User's Bookings - DONE
  router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id

    const allBookingsOfUser = await Booking.findAll({
        where: {userId: userId}
    })

    if(!allBookingsOfUser[0]) {
        res.statusCode = 403
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    const final = []
    for (let booking of allBookingsOfUser) {
        let newVar = booking.toJSON()
        let Spot2 = await Spot.findOne({
            where: { id: booking.spotId},
            attributes:  {exclude: ['description','createdAt', 'updatedAt'] },
            raw: true
        })

        let owner = await User.findOne({
            where: { id: Spot2.ownerId}
        })

        if(owner) {
            Spot2.owner = owner
        }

        const spotImage = await SpotImage.findOne({
            where: {spotId: Spot2.id}
        })

        if(spotImage) {
            Spot2.previewImage = spotImage.url
        }

        if(Spot2) {
            newVar.Spot = Spot2
        }

        final.push(newVar)
    }
    res.json(final)
  })

//**// 22 - Edit a Booking - DONE
  router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const desiredBookingId =  req.params.bookingId
    const userId = req.user.id
    let { startDate, endDate } = req.body

    //make currentDateTotal
    //note Alec did it a different way and his notes I stored in the AirBnb Clone
    let currentDate = new Date()
    let currentYear = currentDate.getFullYear()
    let currentMonth = currentDate.getMonth() + 1
    if (currentMonth < 10) {   currentMonth = '0' + currentMonth.toString() }
    let currentDay = currentDate.getDate()
    if( currentDay < 10) {  currentDay = '0' + currentDay.toString() }
    let currentDateTotal = (currentYear + '-' + currentMonth + '-' + currentDay)

     const currentBooking = await Booking.findByPk(desiredBookingId)
     if(!currentBooking) {
        res.statusCode = 404
        res.json({
        message: " Couldn't find a Booking with the specified id",
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
     startDate = startDate //+ 'T00:00:00.000Z' //I changed all my date management but could change back if needed
     endDate = endDate //+ 'T00:00:00.000Z'

        const allBookingsOfThisSpot = await Booking.findAll({
            where: { id: desiredBookingId }
        })

        for (let alreadyBookedSpot of allBookingsOfThisSpot) { //the try catch block cannot be in the for loop
            console.log('abs', alreadyBookedSpot.id, 'desbi', desiredBookingId, 'sd',startDate, 'absSD', alreadyBookedSpot.startDate, 'ed', endDate, 'absED', alreadyBookedSpot.endDate)
            if(alreadyBookedSpot.id != desiredBookingId) {
                if (startDate > endDate) {  //before & after or equal a booking
                    errObj['endDate'] = errorStrings1['endDate']
                    res.statusCode = 400
                    res.json({
                    message: "Validation error",
                    statusCode: 400,
                    errors: errObj
                    })
                } else if (startDate <= alreadyBookedSpot.startDate && endDate >= alreadyBookedSpot.endDate) {  //before & after or equal a booking
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
                } else if ( startDate < currentDateTotal ) {
                    res.statusCode = 403
                    res.json({
                    message: "Past bookings can't be modified",
                    statusCode: 403,
                    })
                    }
                }

            }



                    try{
                    const newBooking = await currentBooking.update({
                        startDate,
                                endDate
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

  //**// 23 - Delete a Booking
  //Current
  router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const desiredBookingId =  req.params.bookingId

    //make currentDateTotal
    let currentDate = new Date()
    let currentYear = currentDate.getFullYear()
    let currentMonth = currentDate.getMonth() + 1
    if (currentMonth < 10) {
        currentMonth = '0' + currentMonth.toString()
    }
    let currentDay = currentDate.getDate()
    if( currentDay < 10) {
        currentDay = '0' + currentDay.toString()
    }
    let currentDateTotal = (currentYear + '-' + currentMonth + '-' + currentDay)

    const currentBooking = await Booking.findOne({
        where: {
            id: desiredBookingId,
            userId: userId
        }
    })
    if(!currentBooking) {
       res.statusCode = 404
       res.json({
       message: "Couldn't find a Booking with the specified id",
       statusCode: 404,
       })
    } else if ( currentBooking.startDate < currentDateTotal && currentBooking.endDate > currentDateTotal ) {
           res.statusCode = 403
           res.json({
           message: "Bookings that have been started can't be deleted",
           statusCode: 403
           })
        } else {
            await currentBooking.destroy()
            res.json({
                message: "Successfully deleted",
                statusCode: 200
            })
        }
  })


/** */
/** */
/** */
/** */
/** */
/** */
/** */
/** */

  //New Route #24 //get bookings by owner


  router.get('/owner', requireAuth, async (req, res, next) => {
    const ownerId = req.user.id

    const allBookingsOfOwner = await Booking.findAll({
        include: [{
            model: Spot,
            where: {ownerId: ownerId}
        }
    ]
    })

    if(!allBookingsOfOwner[0]) {
        res.statusCode = 403
        res.json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    const final = []
    for (let booking of allBookingsOfOwner) {
        let newVar = booking.toJSON()
        let Spot2 = await Spot.findOne({
            where: { id: booking.spotId},
            attributes:  {exclude: ['description','createdAt', 'updatedAt'] },
            raw: true
        })

        let Guest = await User.findOne({
            where: {id: booking.userId} //probably should exclude some stuff
        })

        const spotImage = await SpotImage.findOne({
            where: {spotId: Spot2.id}
        })

        if(spotImage) {
            Spot2.previewImage = spotImage.url
        }

        if(Spot2) {
            newVar.Spot = Spot2
        }

        if(Guest) {
            newVar.Guest = Guest
        }

        final.push(newVar)
    }
    res.json(final)
  })



























  module.exports = router;


  //CODE JUST TO REFERENCE BELOW

//   router.post('/', requireAuth, async (req, res, next) => {
//     const userId = req.user.id
//     const {address} = req.body
//   const errorStrings = { "address": "Street address is required",}
//     const errObj = {}
//     if(!address) {errObj['address'] = errorStrings['address']}
//     try{
//         const newSpot = await Spot.create({ownerId: userId, address})
//         res.json(newSpot)
//     } catch(error) {
//         error.errors.map(er => {
//             errObj[er.path] = errorStrings[er.path]
//         })
//         res.statusCode = 400
//         res.json({
//             message: 'Validation Error',
//             statusCode: 400,
//             errors: errObj
//         })
//     }
// })

// } catch(error) {
//     console.log(error)
//     // error.errors.map(er => {
//     //     errObj[er.path] = errorStrings[er.path]
//    // })
//     res.statusCode = 400
//     res.json({
//         message: 'Validation Error',
//         statusCode: 400,
//         errors: errObj
//     })

// }

// router.get('/:spotId/reviews', async (req, res, next) => {
//     const spotId = req.params.spotId
//     const allReviews = await Review.findAll({
//         where: { spotId: spotId  }
//     })

//     if(allReviews.length === 0) {
//         res.statusCode = 404
//         res.json({
//             message: "Spot couldn't be found",
//             statusCode: 404

//         })

//     }
//     // console.log(spotId)
//      const Reviews = []
//      for (let rev of allReviews) {
//         let newVar = rev.toJSON()

//        const user = await User.findOne({
//         where: {id: rev.userId},
//         attributes: ['id', 'firstName', 'lastName']
//       })
//       newVar.User = user

//     //   const spot = await Spot.findOne({
//     //     where: {id: rev.spotId},
//     //     attributes: {exclude: ['createdAt', 'updatedAt'] }
//     //    })

//        const ReviewImages = await ReviewImage.findAll({
//         where: {reviewId: rev.id},
//         attributes: ['id','url']
//        })

//        newVar.ReviewImages = ReviewImages
//         Reviews.push(newVar)
//      }

//     res.json({Reviews})
//   })
