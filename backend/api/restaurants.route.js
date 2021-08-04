import express from 'express'
import RestaurantController from './restaurants.controller.js'
import ReviewController from './review.controller.js'

const router = express.Router( )

// Create routes
// router.route( '/' ).get( ( req, res ) => {
//     res.send( 'Hello Restaurant Reviews' )
// } );
router.route( '/' ).get( RestaurantController.apiGetRestaurants )

router
    .route( '/review' )
    .post( ReviewController.apiPostReview )
    .put( ReviewController.apiUpdateReview )
    .delete( ReviewController.apiDeleteReview )

export default router