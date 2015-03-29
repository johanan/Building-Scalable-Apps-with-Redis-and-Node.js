var badArray = [];
var body = document.body;

function createLeak(){
  var div = document.createElement('div');
  body.appendChild(div);
  div.addEventListener('click', function(){body.innerText='HEY!';});
  badArray.push(div);
  body.removeChild(div);
}

function bigLeak(){
  for(var i=0; i<10000; i++){
    createLeak();
  }
}
