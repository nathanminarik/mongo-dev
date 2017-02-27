const assert = require('assert');
const User = require('../src/user');

describe('Validating Records', () => {
  
  it('Requires a username', () => {
    const user = new User({
      name: ""
    });
    
    const validateResults = user.validateSync();
    const { message } = validateResults.errors.name;

    assert(message === 'Name is required');
  });

  it('Requires a username greater than 2 characters', () => {
    const user = new User({name: "Al" });

    const validateResults = user.validateSync();
    const { message } = validateResults.errors.name;

    assert(message === 'Name must be longer than two characters');
  });

  it('Disallows invalid records from saving', (done) => {
    const user = new User({
      name: "Al"
    });

    user.save()
      .then((res) => {})
      .catch((err) => {
        const { message } = err.errors.name;
        assert(message === 'Name must be longer than two characters');    
        done();
      });
  });
});
