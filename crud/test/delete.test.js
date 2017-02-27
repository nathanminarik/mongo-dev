const User = require('./../src/user');
const assert = require('assert');

describe('Deleting a User', () => {
  let Joe; 

  beforeEach((done) => {
    joe = new User({name: 'Joe'});

    joe.save()
      .then(() => {
        done();
      });
  });

  it('model instance remove', (done) => {
    joe.remove()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });

  });

  it('class method remove', (done) => {
    User.remove({name: 'Joe'})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  
  it('model method findOneAndRemove', (done) => {
    User.findOneAndRemove({name: 'Joe'})
      .then(() => User.findOne({name: "Joe"}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  
  it('model method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({name: "Joe"}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
