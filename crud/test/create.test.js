const User = require('./../src/user');
const assert = require('assert');

describe('Creating records', () => {
  
  it('Saves a user', (done) => {
    const joe = new User({
      name: 'Joe'
    });

    joe.save()
      .then((res) => {
        assert(!joe.isNew);
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });

});