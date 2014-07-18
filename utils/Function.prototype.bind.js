if (!eval.bind) Function.prototype.bind = function(that){
  var self = this,
    slice = Array.prototype.slice,
    args = arguments.length > 1 ? slice.call(arguments, 1) : null,
    F = function(){};

  var bound = function(){
    var context = that, length = arguments.length;
    if (this instanceof bound){
      F.prototype = self.prototype;
      context = new F;
    }
    var result = (!args && !length)
      ? self.call(context)
      : self.apply(context, args && length ? args.concat(slice(arguments)) : args || arguments);
    return context == that ? result : context;
  };
  return bound;
}
