const { Notifier } = require('@airbrake/node');

/**
 * Makes a rest call
 * @param  {[string]} projectId   [ID of Airbrake project]
 * @param  {[string]} projectKey  [Key of Aibrake project]
 * @param  {[json]}   payload     [payload]
 * @return {[promise]}        
 */

 function call(projectId, projectKey, payload, env){

    return new Promise((resolve, reject) => {
        try {

            var airbrake = new Notifier({
                projectId: projectId,
                projectKey: projectKey,
                environment: env ? env : "production",
              });
              
              airbrake.notify(payload)
              .then((notice) => {
                  if (notice.id)
                    resolve(notice.id);
                  else 
                    reject(notice);
              });

        } catch (err) {
            return reject("Error : " + err);
        }
    });
}

module.exports.call = call;