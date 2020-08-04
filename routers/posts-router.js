const router = require('express').Router()
const db = require('../data/db')

//Gets all posts
router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json({data: posts})
        })
        .catch(err => {
            res.status(500).json({error: "The posts information could not be retrieved."})
        })
})

//Gets post by Id
router.get('/:id', (req, res) => {
    db.findById(req.params.id)
    .then((post) => {
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})

// Gets comments by post ID
router.get('/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
    .then(postComments => {
        if(postComments) {
            res.status(200).json(postComments)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({error: "The comments information could not be retrieved."})
    })
})

// Adds post to db
router.post('/', (req, res) => {
    db.insert(req.body)
    .then(post => {
        if(!req.body.title || !req.body.contents) {
            res.status(400).json({errorMessage: "Please provide title and contents for the post"})
        } else {
            res.status(201).json(post)
        }
    })
    .catch(err => {
        res.status(500).json({error: "There was an error while saving the post to the database"})
    })
})

//Adds comment to db for given post ID
router.post('/:id/comments', (req, res) => {
   const { text } = req.body
   const post_id = req.params.id


   if(!text) {
       res.status(400).json({errorMessage: "Pleaser provide text for the comment"})
   } else {
       db.findById(post_id)
       .then(post => {
           if(!post) {
               res.status(404).json({message: "The post with the specified ID does not exist"})
           } else {
               let postedComment = {
                   text: text,
                   post_id: post_id
               }
               db.insertComment(postedComment)
               .then(({id}) => {
                   db.findCommentById(id)
                   .then(comment => {
                       res.status(201).json(comment)
                   })
               })
               .catch(err => {
                   res.status(500).json({error: "There was an error while saving the comment to the database"})
               })
           }
       })
   }
})

//Deletes posts by id
router.delete('/:id', (req, res) => {
    db.remove(req.params.id) 
    .then(count => {
        if (count > 0) {
            res.status(200).json({deleted: count, message: "post was deleted" })
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
    })
    .catch(err => {
        res.status(500).json({error: "The post could not be removed"})
    })
})

router.put('/:id', (req, res) => {
    const updates = req.body
    const { id } = req.params
    if(!updates.title || !updates.contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post"})
    }
    db.update(id, updates)
    .then(newUpdate => {
        if(newUpdate) {
            res.status(200).json(newUpdate)
        } else{
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
    })
    .catch(err => {
        res.status(500).json({error: "The post information could not be modified"})
    })
    
})

module.exports = router