const User = require('./../src/user');
const assert = require('assert');

// joe is the model
// User is the class

describe('Deleting a User', () => {
  let Joe; 

  beforeEach((done) => {
    joe = new User({name: 'Joe', postCount: 0});

    joe.save()
      .then(() => {
        done();
      });
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('model instance type using set and save', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('model instance of update function', (done) => {
    assertName(joe.update({name: 'Alex'}), done);
  });
  
  it('class instance of update function', (done) => {
    assertName(User.update({name: 'Joe'}, {name: 'Alex'}), done);
  });
  
  it('class instance of findOneAndUpdate function', (done) => {
    assertName(User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}), done);
  });
  
  it('class instance of findByIdAndUpdate function', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, {name: 'Alex'}), done);
  });

  // You can use xit to cancel out a test you know will fail while updating code
  xit('Class Based: A user can their postcount incremented by 1', (done) => {
    User.update({name: 'Joe'}, { $inc: { postCount: 10 }})
      .then(() => User.findById(joe._id))
      .then(user => {
        assert(user.postCount === 10);
        done();
      });
  });
  
  it('Class Based: A user can their postcount incremented by 1', (done) => {
    User.update({name: 'Joe'}, { $inc: { likes: 1 }})
      .then(() => User.findById(joe._id))
      .then(user => {
        assert(user.likes === 1);
        done();
      });
  });
});