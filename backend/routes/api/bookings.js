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
const booking = require('../../db/models/booking');

router.get('/test', requireAuth, (req, res) => {
  res.json({message: 'success'})
})


router.get('/testt', async (req, res, next) => {
    const message = 'heyo'
    res.json(message)
    // const reviewsOfCurrentUser = User.findAll({})
    // res.json(reviewsOfCurrentUser)
  })



  router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id

    const allBookingsOfUser = await Booking.findAll({
        where: {userId: userId}
    })

    const final = []
    for (let booking of allBookingsOfUser) {
        let newVar = booking.toJSON()
       // let Spot = Spot.toJSON()
        let Spot2 = await Spot.findOne({
            where: { id: booking.spotId},
            attributes:  {exclude: ['description','createdAt', 'updatedAt'] },
            // ['id', 'ownerId', 'address' ]
            raw: true
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




        final.push(newVar)
    }
    res.json(final)


  })



  module.exports = router;

  router.post('/', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const {address} = req.body
  const errorStrings = { "address": "Street address is required",}
    const errObj = {}
    if(!address) {errObj['address'] = errorStrings['address']}
    try{
        const newSpot = await Spot.create({ownerId: userId, address})
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
