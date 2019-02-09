const Post = require('../models/post');

module.exports = app => {
    // CREATE
    app.post("/posts/new", (req, res) => {
        if (req.user) {
            var post = new Post(req.body);
        
            // SAVE INSTANCE OF POST MODEL TO DB
            post.save(function(err, post) {
                // REDIRECT TO THE ROOT
                return res.redirect(`/`);
            });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });
    //GO TO NEW FORM 
    app.get('/posts/new', (req, res) => {
        res.render('posts-new')
    })
    //INDEX
    app.get('/', (req, res) => {
        var currentUser = req.user;
        Post.find({})
            .then(posts => {
            res.render("posts-index", { posts, currentUser });
        })
            .catch(err => {
            console.log(err.message);
        });
    })
    // BY ID OR WHATEVER
    app.get("/posts/:id", function(req, res) {
        // LOOK UP THE POST
        Post.findById(req.params.id).populate('comments').then((post) => {
            res.render('posts-show', { post })
          }).catch((err) => {
            console.log(err.message)
          })
    });
    // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
        Post.find({ subreddit: req.params.subreddit })
            .then(posts => {
                res.render("posts-index", { posts });
            })
            .catch(err => {
                console.log(err);
        });
    })





  };