(function(){
  var customElements = {},
      create = Object.create || function(proto){
        var f = function(){}
        f.prototype = proto
        return new f()
      },
      has = (has = Object.prototype.hasOwnProperty, has.call.bind(has)),
      nop = function(){}

  document.register.tag = function(name, options){

    options = options || {}
    if (!customElements[name]){
      customElements[name] = {
        options: options
      }
      return;
    }
    var proto = create(HTMLElement.prototype),
        created = options.created || nop,
        ready = options.ready || nop,
        template = customElements[name].content

        delete options.created;
        delete options.ready;

        for (var any in options){
          if(has(options, any)){
            proto[any] = options[any]
          }
        }

      proto.createdCallback = function(){
        for(var i = 0, max = template.childNodes.length; i < max; i++){
          this.appendChild(template.childNodes[i].cloneNode())
        }
        ready.call(this)
      }

    var registered = document.register(name, {
      prototype : proto
    })
    created.call(registered)

  }

  var proto = create(HTMLElement.prototype)

  proto.createdCallback = function(){
    var template = this.getElementsByTagName('template')[0],
        name = this.getAttribute('name'),
        options

        if(customElements[name] && customElements[name].options){
          options = customElements[name].options
        }
        customElements[name] = {
          content: 'content' in template? template.content : template
        }
        if(options){
          document.register.tag(name, options)
        }

  }

  var injectionPoint = document.head || document.body || document.documentElement || document.createElement('html')
  var temp = document.createElement('section');
  temp.innerHTML = '<style>template{display:none!important}/*Added by custom-element*/</style>'
  injectionPoint.appendChild(temp.firstChild)
  temp = null
  document.register('custom-element', {
    prototype: proto
  })
})()
