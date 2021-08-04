// Import DAO
import ReviewDAO from "../dao/reviewDAO"

export default class ReviewController {
    static async apiPostReview( req, res, next ) {
        try {
            const restaurantId = req.body.restaurant_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id,
            }

            const date = new Date( )

            const ReviewResponse = await ReviewDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date,
            )

            res.json( { status: 'success' } )
        }
        catch( error ) {
            res.status( 500 ).json( { error: error.message } )
        }
    }

    static async apiUpdateReview( req, res, next ) {
        try {
            const reviewId = req.body.review_id
            const text = req.body.text
            const date = new Date()

            const reviewResponse = await ReviewDAO.updateReview(
                reviewId,
                req.body.user_id,
                text,
                date,
            )

            var { error } = reviewResponse

            if ( error ) {
                res.status( 400 ).json( { error } )
            }

            if ( reviewResponse.modifiedCount === 0 ) {
                throw new Error(
                    "Unable to update review - user may not be original poster"
                )
            }
        }
        catch( error ) {
            res.status( 500 ).json( { error: error.message } )
        }
    }

    static async apiDeleteReview( req, res, next ) {
        try {
            const reviewId = req.query.id
            const userId = req.body.user_id
            
            const reviewResponse = await ReviewDAO.deleteReview(
                reviewId,
                userId,
            )

            res.json( { status: 'Review is deleted successfully' } )
        }
        catch( error ) {
            res.status( 500 ).json( { error: error.message } )
        }
    }
}