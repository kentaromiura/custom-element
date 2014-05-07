(function(){
  var customElements = {},
      create = Object.create || function(proto){
        var f = function(){}
        f.prototype = proto
        return new f()
      },
      has = (has = Object.prototype.hasOwnProperty, has.call.bind(has)),
      nop = function(){},
			collect = function(from, collected){
				if(document.querySelectorAll) return document.querySelectorAll('[data-id]', from)
				collected = collected || []
				if('getAttribute' in from && from.getAttribute('data-id')){
						collected.push(from)
				}
				for(var i=0, max = from.childNodes.length; i<max; i++){
					collect(from.childNodes[i], collected)
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
				var i, max;
				this.$ = {}
        for(i = 0, max = template.childNodes.length; i < max; i++){
          this.appendChild(template.childNodes[i].cloneNode(true))
        }
				var shortcuts = collect(this)
				console.log('shortcuts', shortcuts)
				for(i = 0, max = shortcuts.length; i < max; i++){
					var shortcut = shortcuts[i]
					this.$[shortcut.getAttribute('data-id')] = shortcut
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
