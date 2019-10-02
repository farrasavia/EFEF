/* eslint-disable no-undef */
'use strict';

module.exports = function(Project) {
  Project.getProjectByName = function(name, callback) {
    new Promise(function(resolve, reject) {
            // find name
      Project.find({where: {NamaProject: {like: name}}}, function(err, result) {
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
  Project.remoteMethod(
        'getProjectByName',
    {
      description: 'get user by name',
      accepts: [
                {arg: 'name', type: 'string'},
      ],
      returns: {
        arg: 'res', type: 'object', root: true,
      },
      http: {path: '/getProjectByName', verb: 'get'},
    }
    );
};
