// backend/routes/api/session.js
const express = require('express')
const router = express.Router();

// backend/routes/api/session.js
//const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, sequelize } = require('../../db/models');
const { Op, json } = require('sequelize');


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth.js');
const spot = require('../../db/models/spot');

router.get('/test', requireAuth, (req, res) => {
  res.json({message: 'success'})
})





//**GET ALL SPOTS **DONE
router.get('/', async (req, res, next) => {
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

    //lazy loading is correct
     const allSpotz = await Spot.findAll({})
     const newSpotz = []
     for (let spot of allSpotz) {
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


        const imagez = await SpotImage.findOne({
            attributes: ['url'],
            where: {preview: true, spotId : spot.id},
            raw: true
        })
        if(imagez) {
            newVar.previewImage = imagez.url
        }
        newSpotz.push(newVar)

     }
     res.json(newSpotz)

})




// **GET ALL SPOTS BY CURRENT OWNER **DONE
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const allSpotz = await Spot.findAll({
        where: {ownerId: userId}
    })

    const newSpotz = []
    for (let spot of allSpotz) {
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
       const imagez = await SpotImage.findOne({
           attributes: ['url'],
           where: {preview: true, spotId : spot.id},
           raw: true
       })
       if(imagez) {
        newVar.previewImage = imagez.url

       }

       newSpotz.push(newVar)
    }
    res.json(newSpotz)

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

        // if(address) {updatedSpot.address = address}
        // if(city) {updatedSpot.city = city}
        // if(state) {updatedSpot.state = state}
        // if(country) {updatedSpot.country = country}
        // if(lat) {updatedSpot.lat = lat}
        // if(lng) {updatedSpot.lng = lng}
        // if(name) {updatedSpot.name = name}
        // if(description) {updatedSpot.description = description}
        // if(price) {updatedSpot.price = price}
        // res.json(updatedSpot)
        // await updatedSpot.save()
        res.json(newSpot)
    } catch(error) {
       // console.log('H-H-H-H-H-H-H-H-H-H-H', error)
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

//NOT A REAL ROUTE JUST FOR TESTING
// router.get('/spotImages', async (req, res, next) => {
//     const allImages = await SpotImage.findAll({})
//     res.json(allImages)
// })



module.exports = router;
