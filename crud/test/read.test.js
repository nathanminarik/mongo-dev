const User = require('./../src/user');
const assert = require('assert');

describe('Reading Users from DB', () => {

  let joe, alex, maria, zack;

  beforeEach((done) => {
        
    alex = new User({
      name: 'Alex'
    });

    maria = new User({
      name: 'Maria'
    });
    
    joe = new User({
      name: 'Joe',
      lastName: 'First'
    });
    
    joe2 = new User({
      name: 'Joe'
    });

    zack = new User({
      name: 'Zack'
    });

    Promise.all([joe.save(), alex.save(), joe2.save(), maria.save(), zack.save()]) 
      .then(() => done());
  });

  it('Finds all users named Joe', (done) => {
    User.find({name: 'Joe'})
      .then((res) => {
        res.forEach((u) => {
          assert(u.name === 'Joe');
        });

        done();
      });
  });
  
  // need to convert the returned ids into strings to pass equality
  it('First User has id that\'s the same as Joe', (done) => {
    User.find({name: 'Joe', lastName: 'First'})
      .then((res) => {
        assert(res[0]._id.toString() === joe._id.toString());
        done();
      });
  });
  
  // don't need to convert ids to strings before saving to database since mongoose will handle that
  it('Find a user with a particular ID', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      });
  });

  it('Can skip and limit results', (done) => {
    User.find({})
      .sort({name: 1})
      .skip(2)
      .limit(2)
      .then(users => {
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maria');
        assert(users.length === 2);
        done();
      });
  });
})