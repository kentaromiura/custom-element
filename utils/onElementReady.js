(function(){
  var getProto = Object.getPrototypeOf || function(o){return o.constructor.prototype}
  var temp = document.createElement('div');
  temp.innerHTML = '<Unknown></Unknown>';
  var unknownProto = getProto(temp.firstChild);
  temp = null;

  document.onElementReady = function(element, callback, checkInterval){
      checkInterval = checkInterval || 100
      var poll = function(){
        if (getProto(element) != unknownProto){
          callback.call(element)
        } else {
          setTimeout(poll, checkInterval)
        }
      }
      poll()
  }
})()
