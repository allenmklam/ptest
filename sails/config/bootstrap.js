/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  var bcrypt = require('bcrypt');

  // Generate a salt
  var salt = bcrypt.genSaltSync(10);


  var users = [
    { "username": "admin", "password": "123456", "coin": 1000, "role": "admin", "id": 101 },
    { "username": "boss", "password": "123456", "coin": 1000, "id": 102 }
  ];

  users.forEach(function (user) {

    user.password = bcrypt.hashSync(user.password, salt);

    User.create(user).exec(function (err, model) {
      // if (model.id == 102) {
      //   model.hold.add(1);
      // }

      model.save();
    });
  });
  
  // Qpon.findOne(1).exec(function (err, model) {

  //   if (model == null) {

  //     var cupons = [
  //       { "title": "10% Off on entire order", "coin": "500", "restaurant": "Ciao Chow", "date": "2018-03-15", "district": "hk", "quota": "50", "mall": "IFC", "url": "https://static6.orstatic.com/userphoto/photo/D/AL0/0239FTAFD35FBF9CD078AApx.jpg", "details": "", id: 1 },
  //       { "title": "School Food", "coin": "400", "restaurant": "School Food", "date": "2018-04-12", "district": "kl", "quota": "40", "mall": "APM", "url": "http://4.bp.blogspot.com/-Ydb-nU7zWMk/UpGcOzOja3I/AAAAAAAAF-8/tL5LHEA7gzw/s320/IMG_0986A.jpg", "details": "nope", id: 2 },
  //       { "title": "Share tea", "coin": "200", "restaurant": "Share tea", "date": "2018-05-10", "district": "nt", "quota": "50", "mall": "荃新天地", "url": "http://www.1992sharetea.com/images/logos.png", "details": "", id: 3 },
  //       { "title": "大紅袍火鍋料理", "coin": "1000", "restaurant": "大紅袍火鍋料理", "date": "2018-05-12", "district": "kl", "quota": "0", "mall": "APM", "url": "https://static5.orstatic.com/userphoto/photo/F/CB6/02FJGC1F7C53D5C15C0AC6px.jpg", "details": "", id: 4 },
  //     ];

  //     cupons.forEach(function (cupons) {
  //       Qpon.create(cupons).exec(function (err, record) { });
  //     });

  //   }

  // });
  
  cb();
};
