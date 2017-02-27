const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./postsSchema');

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator (name) { return name.length > 2 },
      message: 'Name must be longer than two characters'
    }
  },
  lastName: String,
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

UserSchema.pre('remove', function (next){
  // var this === user instance

  // We add blogpost in the listener to prevent cylical loading if the blogPost also requires the User class
  const blogPost = mongoose.model('blogPost')

  blogPost.remove({_id: { $in: this.blogPosts}})
    .then(() => next());

});

const User = mongoose.model('user', UserSchema);

module.exports = User;