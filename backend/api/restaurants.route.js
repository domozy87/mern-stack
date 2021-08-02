import express from 'express'
import RestaurantController from './restaurants.controller.js'

const router = express.Router( )

// Create routes
// router.route( '/' ).get( ( req, res ) => {
//     res.send( 'Hello Restaurant Reviews' )
// } );
router.route( '/' ).get( RestaurantController.apiGetRestaurants )

export default router