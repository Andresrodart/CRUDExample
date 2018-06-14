var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt');

var EstudainteSchema = new Schema(
  {
    numeroDeReferencia: {type: String, required: true, max: 100, trim: true, unique: true},
    nombre: {type: String, required: true, max: 100, trim: true},
    apellidos: {type: String, required: true, max: 100, trim: true},
    fechaDeNacieminto: {type: Date, required: true},
    lugarDeNacieminto: {type: String, required: true},
    sexo: {type: String, required: true}, //true man, false girl
    curp: {type: String, required: true},
    dirección: {type:String, required: true, max: 210, trim: true},
    telefono: {type:String,  required: true, max: 10, trim: true},
    correo: {type:String,  required: true, max: 100, trim: true},
    escuelaDeProcedencia: {type:String,  required: true, max: 100, trim: true},
    promedio: {type:Number,  required: true, max: 100, trim: true},
    opcion: {type:String,  required: true, max: 100, trim: true},
    foto: {type:String,  required: true, max: 100, trim: true},
    calfExamen: {type:Number,  required: false, max: 100, trim: true},
    }
);

/*EstudainteSchema.pre('save', function (next) { //Encrypypass before updating to db
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});*/

EstudainteSchema.statics.authenticate = function (numeroDeReferencia, callback) {
    Estudiante.findOne({ numeroDeReferencia: numeroDeReferencia })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      /*bcrypt.compare(password, user.password, function (err, result) {
        if (user) {
          return callback(null, user);
        } else {
          return callback();
        }
    })*/
    });
}

/*/ Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});
*/
//Export model
var Estudiante = mongoose.model('estudiante', EstudainteSchema);

module.exports = Estudiante;