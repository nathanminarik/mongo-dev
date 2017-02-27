const assert = require('assert');
const User = require('./../src/user');

describe('Subdocuments', () => {

  it('Can create subdocuments', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'First post'}]
    });

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then(user => {
        assert(user.posts[0].title === 'First post');
        done();
      });
  });

  it('Can add new subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then(user => {
        user.posts.push({title: 'New Post'});
        return user.save();
      })
      .then(() => User.findOne({name:'Joe'}))
      .then(user => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('should all a user to removing a record', done => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: 'Post to be deleted'}]
    });

    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then(user => {
        user.posts[0].remove();
        // alternatively you could write it like this:
        // const post = user.posts[0]
        // post.remove()

        return user.save();
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });
});