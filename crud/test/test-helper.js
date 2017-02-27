const mocha = require('mocha');
const mongoose = require('mongoose');

before((done) => {
  mongoose.connect('mongodb://localhost/users_test');

  mongoose.connection
    .once('open', () => { 
      console.log(`Connected to DB`); 
      done();
    })
    .on('error', (err) => { console.warn(`Error: ${err}`); });
});

beforeEach( (done) => {
  const { users, comments, blogposts: blogPosts} = mongoose.connection.collections;
  
  users.drop(() => {
    comments.drop(() => {
      blogPosts.drop(() => {
        done();
      });
    });
  });
});