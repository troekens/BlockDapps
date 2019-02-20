const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Article = require('../../models/Article');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validateArticleInput = require('../../validation/post');

// @route   GET api/articles
// @desc    Get articles
// @access  Public
router.get('/', (req, res) => {
    Article.find()
        .sort({ date: -1 })
        .then(articles => res.json(articles))
        .catch(err => res.status(404).json({ noarticlesfound: 'No articles found' }));
});

// @route   GET api/articles/:id
// @desc    Get article by id
// @access  Public
router.get('/:id', (req, res) => {
    Article.findById(req.params.id)
        .then(article => {
            if (article) {
                res.json(article);
            }else {
                res.status(404).json({ noarticlefound: 'No article found with that ID' })
            }
        })
        .catch(err =>
            res.status(404).json({ noarticlefound: 'No article found with that ID' })
        );
});

// @route   POST api/articles
// @desc    Create article
// @access  Private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateArticleInput(req.body);

        // Check Validation
        if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }

        const newArticle = new Article({
            title:req.body.title,
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        });

        newArticle.save().then(article => res.json(article));
    }
);

// @route   DELETE api/articles/:id
// @desc    Delete article
// @access  Private
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Article.findById(req.params.id)
                .then(article => {
                    // Check for post owner
                    if (article.user.toString() !== req.user.id) {
                        return res
                            .status(401)
                            .json({ notauthorized: 'User not authorized' });
                    }

                    // Delete
                    article.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ articlenotfound: 'No article found' }));
        });
    }
);

// @route   POST api/articles/like/:id
// @desc    Like article
// @access  Private
router.post(
    '/like/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Article.findById(req.params.id)
                .then(article => {
                    if (
                        article.likes.filter(like => article.user.toString() === req.user.id)
                            .length > 0
                    ) {
                        return res
                            .status(400)
                            .json({ alreadyliked: 'User already liked this article' });
                    }

                    // Add user id to likes array
                    article.likes.unshift({ user: req.user.id });

                    article.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ articlenotfound: 'No article found' }));
        });
    }
);

// @route   POST api/articles/unlike/:id
// @desc    Unlike article
// @access  Private
router.post(
    '/unlike/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Article.findById(req.params.id)
                .then(article => {
                    if (
                        article.likes.filter(like => like.user.toString() === req.user.id)
                            .length === 0
                    ) {
                        return res
                            .status(400)
                            .json({ notliked: 'You have not yet liked this article' });
                    }

                    // Get remove index
                    const removeIndex = article.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);

                    // Splice out of array
                    article.likes.splice(removeIndex, 1);

                    // Save
                    article.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ articlenotfound: 'No article found' }));
        });
    }
);

// @route   POST api/articles/comment/:id
// @desc    Add comment to article
// @access  Private
router.post(
    '/comment/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateArticleInput(req.body);

        // Check Validation
        if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }

        Article.findById(req.params.id)
            .then(article => {
                const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id
                };

                // Add to comments array
                article.comments.unshift(newComment);

                // Save
                article.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ articlenotfound: 'No article found' }));
    }
);

// @route   DELETE api/articles/comment/:id/:comment_id
// @desc    Remove comment from article
// @access  Private
router.delete(
    '/comment/:id/:comment_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Article.findById(req.params.id)
            .then(article => {
                // Check to see if comment exists
                if (
                    article.comments.filter(
                        comment => comment._id.toString() === req.params.comment_id
                    ).length === 0
                ) {
                    return res
                        .status(404)
                        .json({ commentnotexists: 'Comment does not exist' });
                }

                // Get remove index
                const removeIndex = article.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                // Splice comment out of array
                article.comments.splice(removeIndex, 1);

                article.save().then(article => res.json(article));
            })
            .catch(err => res.status(404).json({ articlenotfound: 'No article found' }));
    }
);

module.exports = router;
