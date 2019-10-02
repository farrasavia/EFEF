/* eslint-disable no-undef */
'use strict';

module.exports = function(Employee) {
  Employee.getEmployeeByEmail = function(email, callback) {
    new Promise(function(resolve, reject) {
            // find name
      Employee.find({where: {Email: {like: email}}}, function(err, result) {
        if (err) reject(err);
        if (result === null) {
          err = new Error('User not Found');
          err.statusCode = 404;
          reject(err);
        }
        resolve(result);
      });
    }).then(function(res) {
      if (!res) callback(err);
      return callback(null, res[0]);
    }).catch(function(err) {
      callback(err);
    });
  };
  Employee.remoteMethod(
        'getEmployeeByEmail',
    {
      description: 'get user by email',
      accepts: [
                {arg: 'email', type: 'string'},
      ],
      returns: {
        arg: 'res', type: 'object', root: true,
      },
      http: {path: '/getEmployeeByEmail', verb: 'get'},
    }
    );
};
