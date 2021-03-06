custom-element
==============

Native declarative way to create a custom webcomponent

Since [Polymer shadowdom polyfill](https://github.com/Polymer/ShadowDOM) causes some issues with other libraries (notable with MooTools) I decided to create this clone of the `polymer-element` element that doesn't use the shadow dom part.

`custom-element` follows a native approach so it's not dependant on any framework to work, so any component built with it will work with both Polymer or X-Tag but it can also be used as standalone just by including only a [Custom Elements](http://w3c.github.io/webcomponents/spec/custom/) polyfill like the [Polymer one](https://github.com/Polymer/CustomElements) or [@WebReflection one](http://github.com/WebReflection/document-register-element) , and it will work natively in browsers which supports the `document.registerElement` method such as [Google Chrome Canary](https://www.google.co.uk/intl/en/chrome/browser/canary.html)


What's similar to polymer-element
=================================
- `custom-element` will look for the first `template` element inside the component and it will clone its content and attach it to its body
- the prototype registration can be done anywhere, even in a different script
- if you don't need to register any prototype you can use the `noscript` attribute
- it can extend an existing element using `extend`
- it can publish a constructor using the `constructor` attribute
- you can _publish_ some attributes using the `attributes` attribute
- you can use the `content` tag inside `template` to define where your element content will appear
- you can listen to the {_propertyName_}Changed event.
- you can listen to the `ready` event.
- you can listen to the `created` event.

also from the [Custom Element Polyfill](https://github.com/Polymer/CustomElements)
- you can listen to the `attributeChangedCallback` event.
- you can listen to the `attachedCallback` event.
- you can listen to the `detachedCallback` event.

Differences with Polymer-Element
================================
- The biggest change is that `custom-element` do not use _shadow dom_, since the polyfill was causing some issues with MooTools.
This change will make the component simpler to theme also since all the subtree is exposed now.

- Instead of calling `Polymer` you will call `document.register.tag` instead, the syntax is the same

- the $ shortcut will map using `data-id` instead of the `id`, since otherwise there will possibly be duplicates `id` in the page.

- it doesn't support _publishing_ attributes via the _published_ options
- if no `content` element is provided in the `template` element, the content will still be appended after the `template` contents

Work in progress. Alpha version. Don't try this at home. No Cats has been harmed during the writing of this clone.
