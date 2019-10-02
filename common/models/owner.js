/* eslint-disable no-undef */
'use strict';

module.exports = function(Owner) {
  Owner.getOwnerByKelamin = function(kelamin, callback) {
    new Promise(function(resolve, reject) {
            // find name
      Owner.find({where: {JenisKelamin: {like: kelamin}}}, function(err, result) {
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
  Owner.remoteMethod(
        'getOwnerByKelamin',
    {
      description: 'get user by kelamin',
      accepts: [
                {arg: 'jenis kelamin', type: 'string'},
      ],
      returns: {
        arg: 'res', type: 'object', root: true,
      },
      http: {path: '/getOwnerByKelamin', verb: 'get'},
    }
    );
};
