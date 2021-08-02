import express from 'express'

const router = express.Router( )

// Create routes
router.route( '/' ).get( ( req, res ) => {
    res.send( 'Hello Restaurant Reviews' )
} );

export default router