var WeakMap = WeakMap || function(){
  /*!(C) WebReflection - Mit Style !*/
  // WARNING: DO NOT FORGET TO DELETE KEYS WHEN POSSIBLE
  //          MEMORY GREEDY, UNSAFE, BROKEN SHIM
  var w = [].indexOf || function(v){
      for(i=this.length;i--&&this[i]!==v;);return i},
      i, k, v;
  function c(){
    k = [];
    v = [];
  }
  function h(o) {
    return -1 < (i = w.call(k, o));
  }
  return {
    clear: c() || c,
    'delete': function(o){
      return !(h(o) ? (k.splice(i, 1), v.splice(i, 1), 0) : 1);
    },
    get: function(o){
      return v[w.call(k, o)];
    },
    has: h,
    set: function(o, d){
      v[h(o) ? i : k.push(o) - 1] = d;
    }
  };
};
