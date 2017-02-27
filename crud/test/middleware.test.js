const mongoose = require('mongoose');
const assert = require('assert');
const User = require('./../src/user');
const BlogPost = require('./../src/blogPost');

describe('Associations', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({title: 'JS is Great', content: 'Yep it is'});

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('Users clean up dangling blog post on remove', (done) => {
    joe.remove()
      .then(() => {
        return BlogPost.count()
      })
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});