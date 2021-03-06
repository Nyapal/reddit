const User = require('../models/user');
const Post = require('../models/post');

module.exports = app => {
    // CREATE
    app.post("/posts/new", (req, res) => {
        if (req.user) {
            var post = new Post(req.body);
            post.author = req.user._id;

            post
                .save()
                .then(post => {
                return User.findById(req.user._id);
                })
                .then(user => {
                    user.posts.unshift(post);
                    user.save();
                    //REDIRECT TO THE NEW POST
                    res.redirect(`/posts/${post._id}`);
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            return res.status(401); //UNAUTHORIZED 
        }
    });

    //GO TO NEW FORM 
    app.get('/posts/new', (req, res) => {
        const currentUser = req.user;
        res.render('posts-new', { currentUser })
    });

    //INDEX
    app.get('/', (req, res) => {
        var currentUser = req.user;
        console.log(req.cookies)
        Post.find().populate('author')
            .then(posts => {
            res.render("posts-index", { posts, currentUser });
        })
            .catch(err => {
            console.log(err.message);
        });
    });

    // SHOW BY ID OR WHATEVER
    app.get("/posts/:id", function(req, res) {
        var currentUser = req.user;
        // LOOK UP THE POST
        Post.findById(req.params.id).populate('comments').lean()
            .then((post) => {
                res.render('posts-show', { post, currentUser });
            }).catch((err) => {
                console.log(err.message)
            })
    });

    // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
        var currentUser = req.user;
        Post.find({ subreddit: req.params.subreddit }).lean()
            .then(posts => {
                res.render("posts-index", { posts, currentUser });
            })
            .catch(err => {
                console.log(err);
            });
    })





  };