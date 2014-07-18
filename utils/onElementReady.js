(function(){
  var getProto = Object.getPrototypeOf || function(o){return o.constructor.prototype}
  var temp = document.createElement('div');
  temp.innerHTML = '<Unknown></Unknown>';
  var unknownProto = getProto(temp.firstChild);
  temp = null;

  document.onElementReady = function(element, callback){
      console.log(element, getProto(element))
      if (getProto(element) != unknownProto){
          callback.call(element)
      } else {
          element.addEventListener('created', function(){
              callback.call(element);
          })
      }
  }
})()
