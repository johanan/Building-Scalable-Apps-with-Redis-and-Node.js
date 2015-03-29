var cluster = require('cluster');

var workers = [
    {
        count: 1,
        exec: './app.js'
    },
    {
        count: 1,
        exec: './workers/log.js'
    },
    {
        count: 1,
        exec: './workers/redis.js'
    }
];

if (cluster.isMaster){

    workers.forEach(function(worker){
        for(var i=0; i < worker.count; i++){
            var c = cluster.fork({exec: worker.exec});
            c.exec = worker.exec;
        }
    });

}else{
    require(process.env['exec']);
    console.log(cluster.worker.process.pid);
}

cluster.on('exit', function(worker){
  if (worker.process.env === undefined)
  {
    var c = cluster.fork({exec: worker.exec});
    c.exec = worker.exec;
  }else{
    process.exit();
  }
});
