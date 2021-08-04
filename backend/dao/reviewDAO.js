import mongodb from 'Mongodb'

const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewDAO {
    // static async injectDB( conn ) {
    //     if ( reviews) {
    //         return
    //     }

    //     try {
    //         reviews = await conn.db( process.env.RESTREVIEWS_NS ).collection( 'reviews' )
    //     }
    //     catch( error ) {
    //         console.error( `Unable to establish collection handles in userDAO: ${error}` )
    //     }
    // }

    /**
     * 
     * @param {String} conn 
     * @returns 
     */

    static injectDB = async ( conn ) => {
        if ( reviews) {
            return
        }

        try {
            reviews = await conn.db( process.env.RESTREVIEWS_NS ).collection( 'reviews' )
        }
        catch( error ) {
            console.error( `Unable to establish collection handles in userDAO: ${error}` )
        }
    }

    /**
     * 
     * @param {String} restaurantId 
     * @param {Object} user 
     * @param {String} review 
     * @param {Date} date 
     * @returns 
     */

    static addReview = async ( restaurantId, user, review, date ) => {
        try {
            const reviewDoc = {
                name: user.name,
                date: date,
                text: review,
                restaurant_id: ObjectId( restaurantId )
            }

            return await reviews.insertOne( reviewDoc )
        }
        catch( error ) {
            console.error( `Unable to post review: ${error}` )

            return { error: error }
        }
    }

    /**
     * Update review
     * @param {String} reviewId 
     * @param {String} userId 
     * @param {String} text 
     * @param {Date} date 
     */

    static updateReview = async ( reviewId, userId, text, date ) => {
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectId( reviewId ) },
                { $set: { text: text, date: date } }
            )

            return updateResponse
        }
        catch( error ) {
            console.error( `Unable to update review: ${error}` )

            return { error: error }
        }
    }

    /**
     * 
     * @param {String} reviewId 
     * @param {String} userId 
     */

    static deleteReview = async ( reviewId, userId ) => {
        try {
            const deleteResponse = await reviews.deleteOne(
                { _id: ObjectId( reviewId ), user_id: userId, }
            )

            return deleteResponse
        }
        catch( error ) {
            console.error( `Unable to delete review: ${error}` )

            return { error }
        }
    }
}
