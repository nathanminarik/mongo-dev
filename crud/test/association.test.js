const mongoose = require('mongoose');
const User = require('./../src/user');
const BlogPost = require('./../src/blogPost');
const Comment = require('./../src/comment');
const assert = require('assert');

describe('Associations', () => {
  let joe, blogPost, comment, comment2;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({title: 'JS is Great', content: 'Yep it is'});
    comment = new Comment({content: 'Great Post'});
    comment2 = new Comment({content: 'Yeah it is'});

    // Note that behind the schenes mongoose will only push te object Id and not the entire object
    // It assumes since we defined these arrays in the models as refernces that this is our intention
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    blogPost.comments.push(comment2);
    comment.user = joe;
    comment2.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save(), comment2.save()])
      .then(() => done());
  });

  // You can only run a single test in the whole suite by adding it.only
  // e.g. it.only('It saves a relation between a user and a Blog Post', (done) => {}) will only run this test
  it('It saves a relation between a user and a Blog Post', (done) => {
    User.findOne({name: 'Joe'})
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });

  it('Saves a full user graph', (done) => {
    User.findOne({name: 'Joe'})
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then(user => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great')
        assert(user.blogPosts[0].comments[0].content === 'Great Post')
        assert(user.blogPosts[0].comments[1].user.name === 'Joe')
        done();
      })
  })
});
