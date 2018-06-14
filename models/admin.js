var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt');

var AdminSchema = new Schema(
  {
    nombre: {type: String, required: true, max: 100, trim: true, unique: true},
    password: {type: String, required: true, max: 100, trim: true}
  }
);

AdminSchema.statics.authenticate = function (nombre, password, callback) {
    Admin.findOne({ nombre: nombre })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }else if(user){
            return callback(null, user);
        }
      });
  }

var Admin = mongoose.model('admin', AdminSchema);

module.exports = Admin;