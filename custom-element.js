(function(global){
  if (!document.register) document.register = document.registerElement

  var customElements = {},
      create = Object.create || function(proto){
        var f = function(){}
        f.prototype = proto
        return new f()
      },
      has = (has = Object.prototype.hasOwnProperty, has.call.bind(has)),
      nop = function(){},
      collect = function(from, collected){
        if (document.querySelectorAll) return document.querySelectorAll('[data-id]', from)
        collected = collected || []
        if ('getAttribute' in from && from.getAttribute('data-id')){
          collected.push(from)
        }
        for (var i = 0, max = from.children.length; i<max; i++){
          collect(from.children[i], collected)
        }
        return collected
      }

  document.register.tag = function(name, options){

    options = options || {}
    if (!customElements[name]){
      customElements[name] = {
        options: options
      }
      return;
    }

    var xtends = customElements[name].xtends,
        ctor = customElements[name].ctor,
        proto = xtends? create(document.createElement(xtends).constructor.prototype) : create(HTMLElement.prototype),
        created = options.created || nop,
        ready = options.ready || nop,
        onAttributeChange = options.attributeChangedCallback || nop,
        attributes = customElements[name].attributes.split(' '),
        template = customElements[name].content,
        descriptor = function(attribute){
          return {
              enumerable: true,
              get: function(){
                return this.getAttribute(attribute)
              },
              set: function(value){
                this.setAttribute(attribute, value)
              }
            }
        }

    delete options.created
    delete options.ready
    delete options.attributeChangedCallback

    for (var any in options){
      if (has(options, any)){
        proto[any] = options[any]
      }
    }

    proto.attributeChangedCallback = function(attributeName, oldValue, newValue){
      if (oldValue === null && ~(' ' + attributes.join(' ') + ' ').indexOf(' ' + attributeName + ' ')) return
      (this[attributeName+ 'Changed'] || nop)(oldValue, newValue) // implemented the {attributeName}Changed event
      onAttributeChange.apply(this, arguments)
    }

    proto.createdCallback = function(){

        var i, max;

        for (i = 0, max = attributes.length; i < max; i++){
          var any = attributes[i]
          if(any != ''){
            if(this.getAttribute(any) === null) this.setAttribute(any, proto[any] || null)
            Object.defineProperty(this, any, descriptor(any))
          }
        }

        this.$ = {}
        for (i = 0, max = template.childNodes.length; i < max; i++){
          this.appendChild(template.childNodes[i].cloneNode(true))
        }
        var shortcuts = collect(this)

        for (i = 0, max = shortcuts.length; i < max; i++){
          var shortcut = shortcuts[i]
          this.$[shortcut.getAttribute('data-id')] = shortcut
        }

        ready.call(this)
    }

    var registered = document.register(name, {
      prototype : proto
    })
    if (ctor){
      global[ctor] = registered
    }
    created.call(registered)
  }

  var proto = create(HTMLElement.prototype)

  proto.createdCallback = function(){
    var template = this.getElementsByTagName('template')[0],
        name = this.getAttribute('name'),
        xtends = this.getAttribute('extends'),
        ctor = this.getAttribute('constructor'),
        attributes = this.getAttribute('attributes'),
        noscript = this.getAttribute('noscript') != null,
        options

    if (customElements[name] && customElements[name].options){
      options = customElements[name].options
    }

    customElements[name] = {
      content: 'content' in template? template.content : template,
      xtends: xtends,
      ctor: ctor,
      attributes: attributes || ''
    }
    if (options || noscript){
      document.register.tag(name, noscript ? {} : options)
    }

  }

  var injectionPoint = document.head || document.body || document.documentElement || {appendChild:nop}
  var temp = document.createElement('section');
  temp.innerHTML = '<style>template{display:none!important}/*Added by custom-element*/</style>'
  injectionPoint.appendChild(temp.firstChild)
  temp = null
  document.register('custom-element', {
    prototype: proto
  })
})(this)
