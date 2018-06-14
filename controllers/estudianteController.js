var Estudiante = require('../models/estudiante');
var mongoose = require('mongoose');
var path = require('path');
var PDFDocument = require ('pdfkit')


exports.Estudainte_create_get = function(req, res, next) {
    // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
    Estudiante.authenticate(req.body.gamer, req.body.password, function (error, user) {
       if (error || !user) {
           req.flash('error', 'Password or Email wrong :C.');
           return res.redirect('back');
       } else {
           req.session.userId = user._id;
           req.session.user = user.gamerTag;
           req.session.mail = user.email;
           return res.redirect('/');
       }
     });
};

exports.estudiante_create_post = function(req, res, next){
    //sanitizeBody('gamerTag').trim().escape(),
    //sanitizeBody('email').trim().escape(),
    //sanitizeBody('password').trim().escape()
    Estudiante.find().exec(function (err, results) {
        var count = results.length + 1;
        console.log(count);
        Estudiante.create({
            "numeroDeReferencia": req.body.input,
            "nombre": req.body.name,
            "apellidos": req.body.last,
            "fechaDeNacieminto": req.body.date,
            "lugarDeNacieminto": req.body.select1,
            "sexo": req.body.radio,
            "curp": req.body.input1,
            "dirección": req.body.input2,
            "telefono": req.body.phone,
            "correo": req.body.email,
            "escuelaDeProcedencia": req.body.select,
            "promedio": req.body.number,
            "opcion": req.body.radio1,
            "foto": req.body.file
            },function(err, user){
                if (err) {
                    req.flash('error', 'Ingrese datos correctos');
                    return res.redirect('back');
                }else{
                    const doc = new PDFDocument();
                    let filename = "TuHorarioDeExamen";
                    // Stripping special characters
                    filename = encodeURIComponent(filename) + '.pdf'
                    // Setting response to 'attachment' (download).
                    // If you use 'inline' here it will automatically open the PDF
                    res.setHeader('Content-type', 'application/pdf')
                    
                    var content = 'Cita para examen diagnóstico\n';
                    
                    if(count < 30)
                        content = "Tu cita es el día 5 Julio a las 10 a.m.";
                    else if(count >= 30 && count < 60)
                        content = "Tu cita es el día 5 Julio a las 1 p.m.";
                    else if(count >= 60 && count < 90)
                        content = "Tu cita es el día 5 Julio a las 4 p.m.";
                    else if(count >= 90 && count < 120)
                        content = "Tu cita es el día 6 Julio a las 10 a.m.";
                    else if(count >= 120 && count < 150)
                        content = "Tu cita es el día 6 Julio a las 1 p.m.";
                    else if(count >= 150 && count < 180)
                        content = "Tu cita es el día 6 Julio a las 4 p.m.";
                    else if(count >= 180 && count < 210)
                        content = "Tu cita es el día 7 Julio a las 10 a.m.";
                    else if(count >= 210 && count < 240)
                        content = "Tu cita es el día 7 Julio a las 1 p.m.";
                    else if(count >= 240 && count < 270)
                        content = "Tu cita es el día 7 Julio a las 4 p.m.";
                    else if(count >= 270 && count < 300)
                        content = "Tu cita es el día 8 Julio a las 10 a.m.";
                    else if(count >= 300 && count < 330)
                        content = "Tu cita es el día 8 Julio a las 1 p.m.";
                    else if(count >= 330 && count < 360)
                        content = "Tu cita es el día 8 Julio a las 4 p.m.";
                    else if(count >= 360 && count < 390)
                        content = "Tu cita es el día 9 Julio a las 10 a.m.";
                    else if(count >= 390 && count < 410)
                        content = "Tu cita es el día 9 Julio a las 1 p.m.";
                    
                    content += '\nNúm de referenica: ' + user.numeroDeReferencia
                    + '\nEstudiante: ' + user.nombre + " " + user.apellidos
                    + '\nCurp: ' + user.curp
                    + '\nEmail: ' + user.correo
                    + `\nFavor de presentarse 30 minutos antes con esta hoja en las instalaciones de la ESCOM (si tienes dudas de como llegar puedes buscar la dirección en Google Maps`;

                    doc.y = 300
                    doc.text(content, 50, 50)
                    doc.pipe(res)
                    doc.end();
                    req.flash('success', 'Ingresó datos correctos');
                    //return res.redirect('/');
                }
            }
        );
      });
    
};

exports.estudiante_make_post = function(req, res, next){
    if (req.body._id){
        Estudiante.findByIdAndUpdate(req.body._id, { $set: req.body}, { new: true }, function (err, tank) {
            if (err) console.log(err);
            else res.send(tank);
          });
    }
    else{
        console.log(req.body);
        Estudiante.find().exec(function (err, results) {
            res.send(results);
        });
    }
};

exports.estudiante_make_post_report = function(req, res, next){
    if (req.body.arg === 'Aciertos'){
        Estudiante.find().exec(function (err, results) {
            res.send(results);
        });
    }
    else{
        console.log(req.body);
        Estudiante.find().exec(function (err, results) {
            res.send(results);
        });
    }
};
