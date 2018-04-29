/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    login: function (req, res) {

        if (req.method == "GET")
            return res.view('user/login');
        else {
            User.findOne({ username: req.body.username }).exec(function (err, user) {

                if (user == null)
                    return res.send("No such user");

                // Load the bcrypt module
                var bcrypt = require('bcrypt');

                // Generate a salt
                var salt = bcrypt.genSaltSync(10);

                //  if (user.password != req.body.password)
                if (!bcrypt.compareSync(req.body.password, user.password))
                    return res.send("Wrong Password");

                req.session.regenerate(function (err) {

                    req.session.username = req.body.username;
                    req.session.uid = user.id;

                    return res.send("login successfully.");

                });
            });
        }
    },

    logout: function (req, res) {

        req.session.destroy(function (err) {
            return res.send("Log out successfully.");
        });
    },
};

