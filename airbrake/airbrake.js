module.exports = function (RED) {

    const airbrake = require('../libs/airbrake');

    function Airbrake(n) {

        RED.nodes.createNode(this, n);

        this.projectId  = n.projectId;
        this.projectKey = n.projectKey;
        this.payload    = n.payload;
        this.env        = n.env;
        this.status({});
        
      /**
       * Shows a status visual on the node
       * @param  {[string]} colour [colour of status (green, yellow, red)]
       * @param  {[string]} shape [shape of symbol]
       * @param  {[text]} text [text to show]
       */
        this.showstatus = (colour, shape, text) => {
          this.status({fill:colour,shape:shape,text:text});
        };

      /**
       * Outputs success
       * @param  {[string]} msg [success message]
       */
        this.showsuccess = (msg,payload) => {
          msg.payload = payload;
          this.send([msg,null]);
        };

      /**
       * Logs an error message
       * @param  {[string]} msg [error message]
       */
        this.showerror = (msg,payload) => {
          msg.payload = payload;
          this.send([null,msg]);
        };


      /**
       * Shows a status visual on the node
       * @param  {[string]} colour [colour of status (green, yellow, red)]
       * @param  {[string]} shape [shape of symbol]
       * @param  {[text]} text [text to show]
       */
        this.showstatus = (colour, shape, text) => {
          this.status({fill:colour,shape:shape,text:text});
        };


        this.on('input',  (msg) => {

          this.showstatus("yellow","dot","Making call");

          let projectId = msg.projectId ? msg.projectId : this.projectId;
          let projectKey = msg.projectKey ? msg.projectKey : this.projectKey;
          let env = msg.env ? msg.env : this.env;
          
          let res = airbrake.call(projectId, projectKey, msg.payload, env);
          res.then((res)=>{
            this.showstatus("green","dot","Success");
            this.showsuccess(msg,res);
          }).catch((err)=>{
            this.showstatus("red","dot","Error");
            this.showerror(msg,err);
          }).finally(()=>{
          });

      });

    }
    RED.nodes.registerType("Airbrake", Airbrake);
};
