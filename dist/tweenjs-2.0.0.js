/**
 * @license TweenJS
 * Visit http://createjs.com for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
(function(exports) {
  "use strict";
  var classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function")
    }
  };
  var createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor)
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor
    }
  }();
  var inherits = function(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass)
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass
  };
  var possibleConstructorReturn = function(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self
  };
  /**
   * A collection of classes that are shared across the CreateJS libraries.
   * Classes required by a library are compiled with that library.
   *
   * @module CreateJS
   * @main CreateJS
   */
  /**
   * Contains properties and methods shared by all events for use with {{#crossLink "EventDispatcher"}}{{/crossLink}}.
   * Note that Event objects are often reused, so you should never
   * rely on an event object's state outside of the call stack it was received in.
   *
   * @class Event
   * @module CreateJS
   */
  var Event = function() {
    // constructor:
    /**
     * @param {String} type The event type.
     * @param {Boolean} [bubbles=false] Indicates whether the event will bubble through the display list.
     * @param {Boolean} [cancelable=false] Indicates whether the default behaviour of this event can be cancelled.
     * @constructor
     */
    function Event(type) {
      var bubbles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var cancelable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      classCallCheck(this, Event);
      /**
       * The type of event.
       * @property type
       * @type String
       */
      this.type = type;
      /**
       * The object that generated an event.
       * @property target
       * @type Object
       * @default null
       * @readonly
       */
      this.target = null;
      /**
       * The current target that a bubbling event is being dispatched from. For non-bubbling events, this will
       * always be the same as target. For example, if childObj.parent = parentObj, and a bubbling event
       * is generated from childObj, then a listener on parentObj would receive the event with
       * target=childObj (the original target) and currentTarget=parentObj (where the listener was added).
       * @property currentTarget
       * @type Object
       * @default null
       * @readonly
       */
      this.currentTarget = null;
      /**
       * For bubbling events, this indicates the current event phase:<OL>
       * 	<LI> capture phase: starting from the top parent to the target</LI>
       * 	<LI> at target phase: currently being dispatched from the target</LI>
       * 	<LI> bubbling phase: from the target to the top parent</LI>
       * </OL>
       * @property eventPhase
       * @type Number
       * @default 0
       * @readonly
       */
      this.eventPhase = 0;
      /**
       * Indicates whether the event will bubble through the display list.
       * @property bubbles
       * @type Boolean
       * @default false
       * @readonly
       */
      this.bubbles = bubbles;
      /**
       * Indicates whether the default behaviour of this event can be cancelled via
       * {{#crossLink "Event/preventDefault"}}{{/crossLink}}. This is set via the Event constructor.
       * @property cancelable
       * @type Boolean
       * @default false
       * @readonly
       */
      this.cancelable = cancelable;
      /**
       * The epoch time at which this event was created.
       * @property timeStamp
       * @type Number
       * @default 0
       * @readonly
       */
      this.timeStamp = (new Date).getTime();
      /**
       * Indicates if {{#crossLink "Event/preventDefault"}}{{/crossLink}} has been called
       * on this event.
       * @property defaultPrevented
       * @type Boolean
       * @default false
       * @readonly
       */
      this.defaultPrevented = false;
      /**
       * Indicates if {{#crossLink "Event/stopPropagation"}}{{/crossLink}} or
       * {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called on this event.
       * @property propagationStopped
       * @type Boolean
       * @default false
       * @readonly
       */
      this.propagationStopped = false;
      /**
       * Indicates if {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called
       * on this event.
       * @property immediatePropagationStopped
       * @type Boolean
       * @default false
       * @readonly
       */
      this.immediatePropagationStopped = false;
      /**
       * Indicates if {{#crossLink "Event/remove"}}{{/crossLink}} has been called on this event.
       * @property removed
       * @type Boolean
       * @default false
       * @readonly
       */
      this.removed = false
    }
    // public methods:
    /**
     * Sets {{#crossLink "Event/defaultPrevented"}}{{/crossLink}} to true if the event is cancelable.
     * Mirrors the DOM level 2 event standard. In general, cancelable events that have `preventDefault()` called will
     * cancel the default behaviour associated with the event.
     * @method preventDefault
     */
    Event.prototype.preventDefault = function preventDefault() {
      this.defaultPrevented = this.cancelable
    };
    /**
     * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} to true.
     * Mirrors the DOM event standard.
     * @method stopPropagation
     */
    Event.prototype.stopPropagation = function stopPropagation() {
      this.propagationStopped = true
    };
    /**
     * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} and
     * {{#crossLink "Event/immediatePropagationStopped"}}{{/crossLink}} to true.
     * Mirrors the DOM event standard.
     * @method stopImmediatePropagation
     */
    Event.prototype.stopImmediatePropagation = function stopImmediatePropagation() {
      this.immediatePropagationStopped = this.propagationStopped = true
    };
    /**
     * Causes the active listener to be removed via removeEventListener();
     *
     * 		myBtn.addEventListener("click", function(evt) {
     * 			// do stuff...
     * 			evt.remove(); // removes this listener.
     * 		});
     *
     * @method remove
     */
    Event.prototype.remove = function remove() {
      this.removed = true
    };
    /**
     * Returns a clone of the Event instance.
     * @method clone
     * @return {Event} a clone of the Event instance.
     */
    Event.prototype.clone = function clone() {
      var event = new Event(this.type, this.bubbles, this.cancelable);
      for (var n in this) {
        if (this.hasOwnProperty(n)) {
          event[n] = this[n]
        }
      }
      return event
    };
    /**
     * Provides a chainable shortcut method for setting a number of properties on the instance.
     *
     * @method set
     * @param {Object} props A generic object containing properties to copy to the instance.
     * @return {Event} Returns the instance the method is called on (useful for chaining calls.)
     * @chainable
     */
    Event.prototype.set = function set(props) {
      for (var n in props) {
        this[n] = props[n]
      }
      return this
    };
    /**
     * Returns a string representation of this object.
     * @method toString
     * @return {String} a string representation of the instance.
     */
    Event.prototype.toString = function toString() {
      return "[" + this.constructor.name + " (type=" + this.type + ")]"
    };
    return Event
  }();
  /**
   * EventDispatcher provides methods for managing queues of event listeners and dispatching events.
   *
   * You can either extend EventDispatcher or mix its methods into an existing prototype or instance by using the
   * EventDispatcher {{#crossLink "EventDispatcher/initialize"}}{{/crossLink}} method.
   *
   * Together with the CreateJS Event class, EventDispatcher provides an extended event model that is based on the
   * DOM Level 2 event model, including addEventListener, removeEventListener, and dispatchEvent. It supports
   * bubbling / capture, preventDefault, stopPropagation, stopImmediatePropagation, and handleEvent.
   *
   * EventDispatcher also exposes a {{#crossLink "EventDispatcher/on"}}{{/crossLink}} method, which makes it easier
   * to create scoped listeners, listeners that only run once, and listeners with associated arbitrary data. The
   * {{#crossLink "EventDispatcher/off"}}{{/crossLink}} method is merely an alias to
   * {{#crossLink "EventDispatcher/removeEventListener"}}{{/crossLink}}.
   *
   * Another addition to the DOM Level 2 model is the {{#crossLink "EventDispatcher/removeAllEventListeners"}}{{/crossLink}}
   * method, which can be used to listeners for all events, or listeners for a specific event. The Event object also
   * includes a {{#crossLink "Event/remove"}}{{/crossLink}} method which removes the active listener.
   *
   * <h4>Example</h4>
   * Add EventDispatcher capabilities to the "MyClass" class.
   *
   *      EventDispatcher.initialize(MyClass.prototype);
   *
   * Add an event (see {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}}).
   *
   *      instance.addEventListener("eventName", handlerMethod);
   *      function handlerMethod(event) {
   *          console.log(event.target + " Was Clicked");
   *      }
   *
   * <b>Maintaining proper scope</b><br />
   * Scope (ie. "this") can be be a challenge with events. Using the {{#crossLink "EventDispatcher/on"}}{{/crossLink}}
   * method to subscribe to events simplifies this.
   *
   *      instance.addEventListener("click", function(event) {
   *          console.log(instance == this); // false, scope is ambiguous.
   *      });
   *
   *      instance.on("click", function(event) {
   *          console.log(instance == this); // true, "on" uses dispatcher scope by default.
   *      });
   *
   * If you want to use addEventListener instead, you may want to use function.bind() or a similar proxy to manage scope.
   *
   *
   * @class EventDispatcher
   * @module CreateJS
   */
  var EventDispatcher = function() {
    // static methods:
    /**
     * Static initializer to mix EventDispatcher methods into a target object or prototype.
     *
     * 		EventDispatcher.initialize(MyClass.prototype); // add to the prototype of the class
     * 		EventDispatcher.initialize(myObject); // add to a specific instance
     *
     * @method initialize
     * @static
     * @param {Object} target The target object to inject EventDispatcher methods into. This can be an instance or a
     * prototype.
     */
    EventDispatcher.initialize = function initialize(target) {
      var p = EventDispatcher.prototype;
      target.addEventListener = p.addEventListener;
      target.on = p.on;
      target.removeEventListener = target.off = p.removeEventListener;
      target.removeAllEventListeners = p.removeAllEventListeners;
      target.hasEventListener = p.hasEventListener;
      target.dispatchEvent = p.dispatchEvent;
      target._dispatchEvent = p._dispatchEvent;
      target.willTrigger = p.willTrigger
    };
    // constructor:
    /**
     * @constructor
     */
    function EventDispatcher() {
      classCallCheck(this, EventDispatcher);
      /**
       * @protected
       * @property _listeners
       * @type Object
       */
      this._listeners = null;
      /**
       * @protected
       * @property _captureListeners
       * @type Object
       */
      this._captureListeners = null
    }
    // public methods:
    /**
     * Adds the specified event listener. Note that adding multiple listeners to the same function will result in
     * multiple callbacks getting fired.
     *
     * <h4>Example</h4>
     *
     *      displayObject.addEventListener("click", handleClick);
     *      function handleClick(event) {
     *         // Click happened.
     *      }
     *
     * @method addEventListener
     * @param {String} type The string type of the event.
     * @param {Function | Object} listener An object with a handleEvent method, or a function that will be called when
     * the event is dispatched.
     * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
     * @return {Function | Object} Returns the listener for chaining or assignment.
     */
    EventDispatcher.prototype.addEventListener = function addEventListener(type, listener, useCapture) {
      var listeners = void 0;
      if (useCapture) {
        listeners = this._captureListeners = this._captureListeners || {}
      } else {
        listeners = this._listeners = this._listeners || {}
      }
      var arr = listeners[type];
      if (arr) {
        this.removeEventListener(type, listener, useCapture)
      }
      arr = listeners[type]; // remove may have deleted the array
      if (!arr) {
        listeners[type] = [listener]
      } else {
        arr.push(listener)
      }
      return listener
    };
    /**
     * A shortcut method for using addEventListener that makes it easier to specify an execution scope, have a listener
     * only run once, associate arbitrary data with the listener, and remove the listener.
     *
     * This method works by creating an anonymous wrapper function and subscribing it with addEventListener.
     * The wrapper function is returned for use with `removeEventListener` (or `off`).
     *
     * <b>IMPORTANT:</b> To remove a listener added with `on`, you must pass in the returned wrapper function as the listener, or use
     * {{#crossLink "Event/remove"}}{{/crossLink}}. Likewise, each time you call `on` a NEW wrapper function is subscribed, so multiple calls
     * to `on` with the same params will create multiple listeners.
     *
     * <h4>Example</h4>
     *
     * 		var listener = myBtn.on("click", handleClick, null, false, {count:3});
     * 		function handleClick(evt, data) {
     * 			data.count -= 1;
     * 			console.log(this == myBtn); // true - scope defaults to the dispatcher
     * 			if (data.count == 0) {
     * 				alert("clicked 3 times!");
     * 				myBtn.off("click", listener);
     * 				// alternately: evt.remove();
     * 			}
     * 		}
     *
     * @method on
     * @param {String} type The string type of the event.
     * @param {Function | Object} listener An object with a handleEvent method, or a function that will be called when
     * the event is dispatched.
     * @param {Object} [scope] The scope to execute the listener in. Defaults to the dispatcher/currentTarget for function listeners, and to the listener itself for object listeners (ie. using handleEvent).
     * @param {Boolean} [once=false] If true, the listener will remove itself after the first time it is triggered.
     * @param {*} [data] Arbitrary data that will be included as the second parameter when the listener is called.
     * @param {Boolean} [useCapture=false] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
     * @return {Function} Returns the anonymous function that was created and assigned as the listener. This is needed to remove the listener later using .removeEventListener.
     */
    EventDispatcher.prototype.on = function on(type, listener) {
      var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var data = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var useCapture = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      if (listener.handleEvent) {
        scope = scope || listener;
        listener = listener.handleEvent
      }
      scope = scope || this;
      return this.addEventListener(type, function(evt) {
        listener.call(scope, evt, data);
        once && evt.remove()
      }, useCapture)
    };
    /**
     * Removes the specified event listener.
     *
     * <b>Important Note:</b> that you must pass the exact function reference used when the event was added. If a proxy
     * function, or function closure is used as the callback, the proxy/closure reference must be used - a new proxy or
     * closure will not work.
     *
     * <h4>Example</h4>
     *
     *      displayObject.removeEventListener("click", handleClick);
     *
     * @method removeEventListener
     * @param {String} type The string type of the event.
     * @param {Function | Object} listener The listener function or object.
     * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
     */
    EventDispatcher.prototype.removeEventListener = function removeEventListener(type, listener, useCapture) {
      var listeners = useCapture ? this._captureListeners : this._listeners;
      if (!listeners) {
        return
      }
      var arr = listeners[type];
      if (!arr) {
        return
      }
      var l = arr.length;
      for (var i = 0; i < l; i++) {
        if (arr[i] == listener) {
          if (l == 1) {
            delete listeners[type]
          } else {
            arr.splice(i, 1)
          }
          break
        }
      }
    };
    /**
     * A shortcut to the removeEventListener method, with the same parameters and return value. This is a companion to the
     * .on method.
     *
     * <b>IMPORTANT:</b> To remove a listener added with `on`, you must pass in the returned wrapper function as the listener. See
     * {{#crossLink "EventDispatcher/on"}}{{/crossLink}} for an example.
     *
     * @method off
     * @param {String} type The string type of the event.
     * @param {Function | Object} listener The listener function or object.
     * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
     */
    EventDispatcher.prototype.off = function off(type, listener, useCapture) {
      this.removeEventListener(type, listener, useCapture)
    };
    /**
     * Removes all listeners for the specified type, or all listeners of all types.
     *
     * <h4>Example</h4>
     *
     *      // Remove all listeners
     *      displayObject.removeAllEventListeners();
     *
     *      // Remove all click listeners
     *      displayObject.removeAllEventListeners("click");
     *
     * @method removeAllEventListeners
     * @param {String} [type] The string type of the event. If omitted, all listeners for all types will be removed.
     */
    EventDispatcher.prototype.removeAllEventListeners = function removeAllEventListeners(type) {
      if (!type) {
        this._listeners = this._captureListeners = null
      } else {
        if (this._listeners) {
          delete this._listeners[type]
        }
        if (this._captureListeners) {
          delete this._captureListeners[type]
        }
      }
    };
    /**
     * Dispatches the specified event to all listeners.
     *
     * <h4>Example</h4>
     *
     *      // Use a string event
     *      this.dispatchEvent("complete");
     *
     *      // Use an Event instance
     *      var event = new createjs.Event("progress");
     *      this.dispatchEvent(event);
     *
     * @method dispatchEvent
     * @param {Object | String | Event} eventObj An object with a "type" property, or a string type.
     * While a generic object will work, it is recommended to use a CreateJS Event instance. If a string is used,
     * dispatchEvent will construct an Event instance if necessary with the specified type. This latter approach can
     * be used to avoid event object instantiation for non-bubbling events that may not have any listeners.
     * @param {Boolean} [bubbles] Specifies the `bubbles` value when a string was passed to eventObj.
     * @param {Boolean} [cancelable] Specifies the `cancelable` value when a string was passed to eventObj.
     * @return {Boolean} Returns false if `preventDefault()` was called on a cancelable event, true otherwise.
     */
    EventDispatcher.prototype.dispatchEvent = function dispatchEvent(eventObj) {
      var bubbles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var cancelable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (typeof eventObj == "string") {
        // skip everything if there's no listeners and it doesn't bubble:
        var listeners = this._listeners;
        if (!bubbles && (!listeners || !listeners[eventObj])) {
          return true
        }
        eventObj = new Event(eventObj, bubbles, cancelable)
      } else if (eventObj.target && eventObj.clone) {
        // redispatching an active event object, so clone it:
        eventObj = eventObj.clone()
      }
      // TODO: it would be nice to eliminate this. Maybe in favour of evtObj instanceof Event? Or !!evtObj.createEvent
      try {
        eventObj.target = this
      } catch (e) {} // try/catch allows redispatching of native events
      if (!eventObj.bubbles || !this.parent) {
        this._dispatchEvent(eventObj, 2)
      } else {
        var top = this,
          i = void 0;
        var list = [top];
        while (top.parent) {
          list.push(top = top.parent)
        }
        var l = list.length;
        // capture & atTarget
        for (i = l - 1; i >= 0 && !eventObj.propagationStopped; i--) {
          list[i]._dispatchEvent(eventObj, 1 + (i == 0))
        }
        // bubbling
        for (i = 1; i < l && !eventObj.propagationStopped; i++) {
          list[i]._dispatchEvent(eventObj, 3)
        }
      }
      return !eventObj.defaultPrevented
    };
    /**
     * Indicates whether there is at least one listener for the specified event type.
     * @method hasEventListener
     * @param {String} type The string type of the event.
     * @return {Boolean} Returns true if there is at least one listener for the specified event.
     */
    EventDispatcher.prototype.hasEventListener = function hasEventListener(type) {
      var listeners = this._listeners,
        captureListeners = this._captureListeners;
      return !!(listeners && listeners[type] || captureListeners && captureListeners[type])
    };
    /**
     * Indicates whether there is at least one listener for the specified event type on this object or any of its
     * ancestors (parent, parent's parent, etc). A return value of true indicates that if a bubbling event of the
     * specified type is dispatched from this object, it will trigger at least one listener.
     *
     * This is similar to {{#crossLink "EventDispatcher/hasEventListener"}}{{/crossLink}}, but it searches the entire
     * event flow for a listener, not just this object.
     * @method willTrigger
     * @param {String} type The string type of the event.
     * @return {Boolean} Returns `true` if there is at least one listener for the specified event.
     */
    EventDispatcher.prototype.willTrigger = function willTrigger(type) {
      var o = this;
      while (o) {
        if (o.hasEventListener(type)) {
          return true
        }
        o = o.parent
      }
      return false
    };
    /**
     * @method toString
     * @return {String} a string representation of the instance.
     */
    EventDispatcher.prototype.toString = function toString() {
      return "[EventDispatcher]"
    };
    // private methods:
    /**
     * @method _dispatchEvent
     * @param {Object | String | Event} eventObj
     * @param {Object} eventPhase
     * @protected
     */
    EventDispatcher.prototype._dispatchEvent = function _dispatchEvent(eventObj, eventPhase) {
      var listeners = eventPhase == 1 ? this._captureListeners : this._listeners;
      var l = void 0;
      if (eventObj && listeners) {
        var arr = listeners[eventObj.type];
        if (!arr || !(l = arr.length)) {
          return
        }
        try {
          eventObj.currentTarget = this
        } catch (e) {}
        try {
          eventObj.eventPhase = eventPhase
        } catch (e) {}
        eventObj.removed = false;
        arr = arr.slice(); // to avoid issues with items being removed or added during the dispatch
        for (var i = 0; i < l && !eventObj.immediatePropagationStopped; i++) {
          var o = arr[i];
          if (o.handleEvent) {
            o.handleEvent(eventObj)
          } else {
            o(eventObj)
          }
          if (eventObj.removed) {
            this.off(eventObj.type, o, eventPhase == 1);
            eventObj.removed = false
          }
        }
      }
    };
    return EventDispatcher
  }();
  /**
   * The Ticker provides a centralized tick or heartbeat broadcast at a set interval. Listeners can subscribe to the tick
   * event to be notified when a set time interval has elapsed.
   *
   * Note that the interval that the tick event is called is a target interval, and may be broadcast at a slower interval
   * when under high CPU load. The Ticker class uses a static interface (ex. `Ticker.framerate = 30;`) and
   * can not be instantiated.
   *
   * <h4>Example</h4>
   *
   *      createjs.Ticker.addEventListener("tick", handleTick);
   *      function handleTick(event) {
   *          // Actions carried out each tick (aka frame)
   *          if (!event.paused) {
   *              // Actions carried out when the Ticker is not paused.
   *          }
   *      }
   *
   * @class TickerAPI
   * @extends EventDispatcher
   * @module CreateJS
   */
  var TickerAPI = function(_EventDispatcher) {
    inherits(TickerAPI, _EventDispatcher);
    // constructor:
    /**
     * @param name {String} The name assigned to this instance.
     * @constructor
     * TODO-ES6: Pass timingMode, maxDelta, paused values as instantiation arguments?
     */
    function TickerAPI(name) {
      classCallCheck(this, TickerAPI);
      // public properties:
      /**
       * The name of this instance.
       * @property name
       * @type {String}
       */
      var _this = possibleConstructorReturn(this, _EventDispatcher.call(this));
      _this.name = name;
      /**
       * Specifies the timing api (setTimeout or requestAnimationFrame) and mode to use. See
       * {{#crossLink "Ticker/TIMEOUT"}}{{/crossLink}}, {{#crossLink "Ticker/RAF"}}{{/crossLink}}, and
       * {{#crossLink "Ticker/RAF_SYNCHED"}}{{/crossLink}} for mode details.
       * @property timingMode
       * @type {String}
       * @default Ticker.TIMEOUT
       */
      _this.timingMode = TickerAPI.TIMEOUT;
      /**
       * Specifies a maximum value for the delta property in the tick event object. This is useful when building time
       * based animations and systems to prevent issues caused by large time gaps caused by background tabs, system sleep,
       * alert dialogs, or other blocking routines. Double the expected frame duration is often an effective value
       * (ex. maxDelta=50 when running at 40fps).
       *
       * This does not impact any other values (ex. time, runTime, etc), so you may experience issues if you enable maxDelta
       * when using both delta and other values.
       *
       * If 0, there is no maximum.
       * @property maxDelta
       * @type {number}
       * @default 0
       */
      _this.maxDelta = 0;
      /**
       * When the ticker is paused, all listeners will still receive a tick event, but the <code>paused</code> property
       * of the event will be `true`. Also, while paused the `runTime` will not increase. See {{#crossLink "Ticker/tick:event"}}{{/crossLink}},
       * {{#crossLink "Ticker/getTime"}}{{/crossLink}}, and {{#crossLink "Ticker/getEventTime"}}{{/crossLink}} for more
       * info.
       *
       * <h4>Example</h4>
       *
       *      createjs.Ticker.addEventListener("tick", handleTick);
       *      createjs.Ticker.paused = true;
       *      function handleTick(event) {
       *          console.log(event.paused,
       *          	createjs.Ticker.getTime(false),
       *          	createjs.Ticker.getTime(true));
       *      }
       *
       * @property paused
       * @type {Boolean}
       * @default false
       */
      _this.paused = false;
      // private properties:
      /**
       * @property _inited
       * @type {Boolean}
       * @protected
       */
      _this._inited = false;
      /**
       * @property _startTime
       * @type {Number}
       * @protected
       */
      _this._startTime = 0;
      /**
       * @property _pausedTime
       * @type {Number}
       * @protected
       */
      _this._pausedTime = 0;
      /**
       * The number of ticks that have passed
       * @property _ticks
       * @type {Number}
       * @protected
       */
      _this._ticks = 0;
      /**
       * The number of ticks that have passed while Ticker has been paused
       * @property _pausedTicks
       * @type {Number}
       * @protected
       */
      _this._pausedTicks = 0;
      /**
       * @property _interval
       * @type {Number}
       * @protected
       */
      _this._interval = 50;
      /**
       * @property _lastTime
       * @type {Number}
       * @protected
       */
      _this._lastTime = 0;
      /**
       * @property _times
       * @type {Array}
       * @protected
       */
      _this._times = null;
      /**
       * @property _tickTimes
       * @type {Array}
       * @protected
       */
      _this._tickTimes = null;
      /**
       * Stores the timeout or requestAnimationFrame id.
       * @property _timerId
       * @type {Number}
       * @protected
       */
      _this._timerId = null;
      /**
       * True if currently using requestAnimationFrame, false if using setTimeout. This may be different than timingMode
       * if that property changed and a tick hasn't fired.
       * @property _raf
       * @type {Boolean}
       * @protected
       */
      _this._raf = true;
      return _this
    }
    // accessor properties:
    /**
     * Indicates the target time (in milliseconds) between ticks. Default is 50 (20 FPS).
     * Note that actual time between ticks may be more than specified depending on CPU load.
     * This property is ignored if the ticker is using the `RAF` timing mode.
     * @property interval
     * @static
     * @type {Number}
     */
    // public methods:
    /**
     * Call createjs.Ticker.create() to get a new TickerAPI instance.
     * It is not initalized by default and its ticks are not synched with any other instance.
     *
     * @param name {String} The name given to the new instance.
     * @method create
     * @return {TickerAPI} A new TickerAPI instance.
     */
    TickerAPI.prototype.create = function create(name) {
      return new TickerAPI(name)
    };
    /**
     * Starts the tick. This is called automatically when the first listener is added.
     * @method init
     */
    TickerAPI.prototype.init = function init() {
      if (this._inited) {
        return
      }
      this._inited = true;
      this._times = [];
      this._tickTimes = [];
      this._startTime = this._getTime();
      this._times.push(this._lastTime = 0);
      this._setupTick()
    };
    /**
     * Stops the Ticker and removes all listeners. Use init() to restart the Ticker.
     * @method reset
     */
    TickerAPI.prototype.reset = function reset() {
      if (this._raf) {
        var f = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
        f && f(this._timerId)
      } else {
        clearTimeout(this._timerId)
      }
      this.removeAllEventListeners("tick");
      this._timerId = this._times = this._tickTimes = null;
      this._startTime = this._lastTime = this._ticks = 0;
      this._inited = false
    };
    /**
     * Init the Ticker instance if it hasn't been already.
     * Docced in superclass.
     */
    TickerAPI.prototype.addEventListener = function addEventListener(type, listener, useCapture) {
      !this._inited && this.init();
      return _EventDispatcher.prototype.addEventListener.call(this, type, listener, useCapture)
    };
    /**
     * Returns the average time spent within a tick. This can vary significantly from the value provided by getMeasuredFPS
     * because it only measures the time spent within the tick execution stack.
     *
     * Example 1: With a target FPS of 20, getMeasuredFPS() returns 20fps, which indicates an average of 50ms between
     * the end of one tick and the end of the next. However, getMeasuredTickTime() returns 15ms. This indicates that
     * there may be up to 35ms of "idle" time between the end of one tick and the start of the next.
     *
     * Example 2: With a target FPS of 30, getFPS() returns 10fps, which indicates an average of 100ms between the end of
     * one tick and the end of the next. However, getMeasuredTickTime() returns 20ms. This would indicate that something
     * other than the tick is using ~80ms (another script, DOM rendering, etc).
     * @method getMeasuredTickTime
     * @param {Number} [ticks] The number of previous ticks over which to measure the average time spent in a tick.
     * Defaults to the number of ticks per second. To get only the last tick's time, pass in 1.
     * @return {Number} The average time spent in a tick in milliseconds.
     */
    TickerAPI.prototype.getMeasuredTickTime = function getMeasuredTickTime(ticks) {
      var times = this._tickTimes;
      if (!times || times.length < 1) {
        return -1
      }
      // by default, calculate average for the past ~1 second:
      ticks = Math.min(times.length, ticks || this.framerate | 0);
      var ttl = times.reduce(function(a, b) {
        return a + b
      }, 0);
      return ttl / ticks
    };
    /**
     * Returns the actual frames / ticks per second.
     * @method getMeasuredFPS
     * @param {Number} [ticks] The number of previous ticks over which to measure the actual frames / ticks per second.
     * Defaults to the number of ticks per second.
     * @return {Number} The actual frames / ticks per second. Depending on performance, this may differ
     * from the target frames per second.
     */
    TickerAPI.prototype.getMeasuredFPS = function getMeasuredFPS(ticks) {
      var times = this._times;
      if (!times || times.length < 2) {
        return -1
      }
      // by default, calculate fps for the past ~1 second:
      ticks = Math.min(times.length - 1, ticks || this.framerate | 0);
      return 1e3 / ((times[0] - times[ticks]) / ticks)
    };
    /**
     * Returns the number of milliseconds that have elapsed since Ticker was initialized via {{#crossLink "Ticker/init"}}.
     * Returns -1 if Ticker has not been initialized. For example, you could use
     * this in a time synchronized animation to determine the exact amount of time that has elapsed.
     * @method getTime
     * @param {Boolean} [runTime=false] If true only time elapsed while Ticker was not paused will be returned.
     * If false, the value returned will be total time elapsed since the first tick event listener was added.
     * @return {Number} Number of milliseconds that have elapsed since Ticker was initialized or -1.
     */
    TickerAPI.prototype.getTime = function getTime() {
      var runTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return this._startTime ? this._getTime() - (runTime ? this._pausedTime : 0) : -1
    };
    /**
     * Similar to the {{#crossLink "Ticker/getTime"}}{{/crossLink}} method, but returns the time on the most recent {{#crossLink "Ticker/tick:event"}}{{/crossLink}}
     * event object.
     * @method getEventTime
     * @param runTime {Boolean} [runTime=false] If true, the runTime property will be returned instead of time.
     * @returns {number} The time or runTime property from the most recent tick event or -1.
     */
    TickerAPI.prototype.getEventTime = function getEventTime() {
      var runTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return this._startTime ? (this._lastTime || this._startTime) - (runTime ? this._pausedTime : 0) : -1
    };
    /**
     * Returns the number of ticks that have been broadcast by Ticker.
     * @method getTicks
     * @param {Boolean} [pauseable=false] Indicates whether to include ticks that would have been broadcast
     * while Ticker was paused. If true only tick events broadcast while Ticker is not paused will be returned.
     * If false, tick events that would have been broadcast while Ticker was paused will be included in the return
     * value.
     * @return {Number} of ticks that have been broadcast.
     */
    TickerAPI.prototype.getTicks = function getTicks() {
      var pauseable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return this._ticks - (pauseable ? this._pausedTicks : 0)
    };
    // private methods:
    /**
     * @method _handleSynch
     * @protected
     */
    TickerAPI.prototype._handleSynch = function _handleSynch() {
      this._timerId = null;
      this._setupTick();
      // run if enough time has elapsed, with a little bit of flexibility to be early:
      if (this._getTime() - this._lastTime >= (this._interval - 1) * .97) {
        this._tick()
      }
    };
    /**
     * @method _handleRAF
     * @protected
     */
    TickerAPI.prototype._handleRAF = function _handleRAF() {
      this._timerId = null;
      this._setupTick();
      this._tick()
    };
    /**
     * @method _handleTimeout
     * @protected
     */
    TickerAPI.prototype._handleTimeout = function _handleTimeout() {
      this._timerId = null;
      this._setupTick();
      this._tick()
    };
    /**
     * @method _setupTick
     * @protected
     */
    TickerAPI.prototype._setupTick = function _setupTick() {
      if (this._timerId != null) {
        return
      } // avoid duplicates
      var mode = this.timingMode || this._raf && TickerAPI.RAF; // TODO-ES6: Verify that this is desired, since Ticker.useRAF was removed.
      if (mode == TickerAPI.RAF_SYNCHED || mode == TickerAPI.RAF) {
        var f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
        if (f) {
          this._timerId = f(mode == TickerAPI.RAF ? this._handleRAF.bind(this) : this._handleSynch.bind(this));
          this._raf = true;
          return
        }
      }
      this._raf = false;
      this._timerId = setTimeout(this._handleTimeout.bind(this), this._interval)
    };
    /**
     * @method _tick
     * @protected
     */
    TickerAPI.prototype._tick = function _tick() {
      var paused = this.paused;
      var time = this._getTime();
      var elapsedTime = time - this._lastTime;
      this._lastTime = time;
      this._ticks++;
      if (paused) {
        this._pausedTicks++;
        this._pausedTime += elapsedTime
      }
      if (this.hasEventListener("tick")) {
        var event = new Event("tick");
        var maxDelta = this.maxDelta;
        event.delta = maxDelta && elapsedTime > maxDelta ? maxDelta : elapsedTime;
        event.paused = paused;
        event.time = time;
        event.runTime = time - this._pausedTime;
        this.dispatchEvent(event)
      }
      this._tickTimes.unshift(this._getTime() - time);
      while (this._tickTimes.length > 100) {
        this._tickTimes.pop()
      }
      this._times.unshift(time);
      while (this._times.length > 100) {
        this._times.pop()
      }
    };
    /**
     * @method _getTime
     * @protected
     */
    TickerAPI.prototype._getTime = function _getTime() {
      var now = window.performance.now;
      return (now && now.call(performance) || (new Date).getTime()) - this._startTime
    };
    createClass(TickerAPI, [{
      key: "interval",
      get: function get() {
        return this._interval
      },
      set: function set(interval) {
        this._interval = interval;
        if (!this._inited) {
          return
        }
        this._setupTick()
      }
    }, {
      key: "framerate",
      get: function get() {
        return 1e3 / this._interval
      },
      set: function set(fps) {
        this.interval = 1e3 / fps
      }
    }]);
    return TickerAPI
  }(EventDispatcher);
  // constants:
  /**
   * In this mode, Ticker uses the requestAnimationFrame API, but attempts to synch the ticks to target framerate. It
   * uses a simple heuristic that compares the time of the RAF return to the target time for the current frame and
   * dispatches the tick when the time is within a certain threshold.
   *
   * This mode has a higher variance for time between frames than {{#crossLink "Ticker/TIMEOUT:property"}}{{/crossLink}},
   * but does not require that content be time based as with {{#crossLink "Ticker/RAF:property"}}{{/crossLink}} while
   * gaining the benefits of that API (screen synch, background throttling).
   *
   * Variance is usually lowest for framerates that are a divisor of the RAF frequency. This is usually 60, so
   * framerates of 10, 12, 15, 20, and 30 work well.
   *
   * Falls back to {{#crossLink "Ticker/TIMEOUT:property"}}{{/crossLink}} if the requestAnimationFrame API is not
   * supported.
   * @property RAF_SYNCHED
   * @static
   * @type {String}
   * @default "synched"
   * @readonly
   */
  TickerAPI.RAF_SYNCHED = "synched";
  /**
   * In this mode, Ticker passes through the requestAnimationFrame heartbeat, ignoring the target framerate completely.
   * Because requestAnimationFrame frequency is not deterministic, any content using this mode should be time based.
   * You can leverage {{#crossLink "Ticker/getTime"}}{{/crossLink}} and the {{#crossLink "Ticker/tick:event"}}{{/crossLink}}
   * event object's "delta" properties to make this easier.
   *
   * Falls back on {{#crossLink "Ticker/TIMEOUT:property"}}{{/crossLink}} if the requestAnimationFrame API is not
   * supported.
   * @property RAF
   * @static
   * @type {String}
   * @default "raf"
   * @readonly
   */
  TickerAPI.RAF = "raf";
  /**
   * In this mode, Ticker uses the setTimeout API. This provides predictable, adaptive frame timing, but does not
   * provide the benefits of requestAnimationFrame (screen synch, background throttling).
   * @property TIMEOUT
   * @static
   * @type {String}
   * @default "timeout"
   * @readonly
   */
  TickerAPI.TIMEOUT = "timeout";
  // events:
  /**
   * Dispatched each tick. The event will be dispatched to each listener even when the Ticker has been paused using
   * {{#crossLink "Ticker/setPaused"}}{{/crossLink}}.
   *
   * <h4>Example</h4>
   *
   *      createjs.Ticker.addEventListener("tick", handleTick);
   *      function handleTick(event) {
   *          console.log("Paused:", event.paused, event.delta);
   *      }
   *
   * @event tick
   * @param {Object} target The object that dispatched the event.
   * @param {String} type The event type.
   * @param {Boolean} paused Indicates whether the ticker is currently paused.
   * @param {Number} delta The time elapsed in ms since the last tick.
   * @param {Number} time The total time in ms since Ticker was initialized.
   * @param {Number} runTime The total time in ms that Ticker was not paused since it was initialized. For example,
   * 	you could determine the amount of time that the Ticker has been paused since initialization with `time-runTime`.
   * @since 0.6.0
   */
  /**
   * The Ticker object is a singleton instance of the TickerAPI class.
   * See the {{#crossLink "TickerAPI"}}{{/crossLink}} documentation for its usage.
   * @class Ticker
   * @static
   * @module CreateJS
   */
  var Ticker = new TickerAPI("createjs.global");
  /**
   * Base class that both {{#crossLink "Tween"}}{{/crossLink}} and {{#crossLink "Timeline"}}{{/crossLink}} extend. Should not be instantiated directly.
   * @class AbstractTween
   * @param {Object} [props]
   * @extends EventDispatcher
   * @module TweenJS
   * @constructor
   */
  var AbstractTween = function(_EventDispatcher) {
    inherits(AbstractTween, _EventDispatcher);
    // constructor:
    /**
     * @constructor
     * @param {Object} [props]
     */
    function AbstractTween(props) {
      classCallCheck(this, AbstractTween);
      // public properties:
      /**
       * Causes this tween to continue playing when a global pause is active. For example, if TweenJS is using {{#crossLink "Ticker"}}{{/crossLink}},
       * then setting this to false (the default) will cause this tween to be paused when `Ticker.setPaused(true)`
       * is called. See the {{#crossLink "Tween/tick"}}{{/crossLink}} method for more info. Can be set via the `props`
       * parameter.
       * @property ignoreGlobalPause
       * @type Boolean
       * @default false
       */
      var _this = possibleConstructorReturn(this, _EventDispatcher.call(this));
      _this.ignoreGlobalPause = false;
      /**
       * Indicates the number of times to loop. If set to -1, the tween will loop continuously.
       * @property loop
       * @type {Number}
       * @default 0
       */
      _this.loop = 0;
      /**
       * Uses ticks for all durations instead of milliseconds. This also changes the behaviour of some actions (such as `call`).
       * Changing this value on a running tween could have unexpected results.
       * @property useTicks
       * @type {Boolean}
       * @default false
       * @readonly
       */
      _this.useTicks = false;
      /**
       * Causes the tween to play in reverse.
       * @property reversed
       * @type {Boolean}
       * @default false
       */
      _this.reversed = false;
      /**
       * Causes the tween to reverse direction at the end of each loop.
       * @property bounce
       * @type {Boolean}
       * @default false
       */
      _this.bounce = false;
      /**
       * Changes the rate at which the tween advances. For example, a `timeScale` value of `2` will double the
       * playback speed, a value of `0.5` would halve it.
       * @property timeScale
       * @type {Number}
       * @default 1
       */
      _this.timeScale = 1;
      /**
       * Indicates the duration of this tween in milliseconds (or ticks if `useTicks` is true), irrespective of `loops`.
       * This value is automatically updated as you modify the tween. Changing it directly could result in unexpected
       * behaviour.
       * @property duration
       * @type {Number}
       * @default 0
       * @readonly
       */
      _this.duration = 0;
      /**
       * The current normalized position of the tween. This will always be a value between 0 and `duration`.
       * Changing this property directly will have unexpected results, use {{#crossLink "Tween/setPosition"}}{{/crossLink}}.
       * @property position
       * @type {Object}
       * @default 0
       * @readonly
       */
      _this.position = 0;
      /**
       * The raw tween position. This value will be between `0` and `loops * duration` while the tween is active, or -1 before it activates.
       * @property rawPosition
       * @type {Number}
       * @default -1
       * @readonly
       */
      _this.rawPosition = -1;
      // private properties:
      /**
       * @property _paused
       * @type {Boolean}
       * @default false
       * @protected
       */
      _this._paused = true;
      /**
       * @property _next
       * @type {Tween}
       * @default null
       * @protected
       */
      _this._next = null;
      /**
       * @property _prev
       * @type {Tween}
       * @default null
       * @protected
       */
      _this._prev = null;
      /**
       * @property _parent
       * @type {Object}
       * @default null
       * @protected
       */
      _this._parent = null;
      /**
       * @property _labels
       * @type Object
       * @protected
       */
      _this._labels = null;
      /**
       * @property _labelList
       * @type Array[Object]
       * @protected
       */
      _this._labelList = null;
      if (props) {
        _this.useTicks = !!props.useTicks;
        _this.ignoreGlobalPause = !!props.ignoreGlobalPause;
        _this.loop = props.loop === true ? -1 : props.loop || 0;
        _this.reversed = !!props.reversed;
        _this.bounce = !!props.bounce;
        _this.timeScale = props.timeScale || 1;
        props.onChange && _this.addEventListener("change", props.onChange);
        props.onComplete && _this.addEventListener("complete", props.onComplete)
      }
      // while `position` is shared, it needs to happen after ALL props are set, so it's handled in _init()
      return _this
    }
    // accessor properties:
    /**
     * Returns a list of the labels defined on this tween sorted by position.
     * @property labels
     * @type {Array[Object]}
     */
    // public methods:
    /**
     * Advances the tween by a specified amount.
     * @method advance
     * @param {Number} delta The amount to advance in milliseconds (or ticks if useTicks is true). Negative values are supported.
     * @param {Boolean} [ignoreActions=false] If true, actions will not be executed due to this change in position.
     */
    AbstractTween.prototype.advance = function advance(delta) {
      var ignoreActions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.setPosition(this.rawPosition + delta * this.timeScale, ignoreActions)
    };
    /**
     * Advances the tween to a specified position.
     * @method setPosition
     * @param {Number} rawPosition The raw position to seek to in milliseconds (or ticks if useTicks is true).
     * @param {Boolean} [ignoreActions=false] If true, do not run any actions that would be triggered by this operation.
     * @param {Boolean} [jump=false] If true, only actions at the new position will be run. If false, actions between the old and new position are run.
     * @param {Function} [callback] Primarily for use with MovieClip, this callback is called after properties are updated, but before actions are run.
     */
    AbstractTween.prototype.setPosition = function setPosition(rawPosition) {
      var ignoreActions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var jump = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var callback = arguments[3];
      var d = this.duration,
        loopCount = this.loop,
        prevRawPos = this.rawPosition;
      var loop = 0,
        t = 0,
        end = false;
      // normalize position:
      if (rawPosition < 0) {
        rawPosition = 0
      }
      if (d === 0) {
        // deal with 0 length tweens.
        end = true;
        if (prevRawPos !== -1) {
          return end
        }
      } else {
        loop = rawPosition / d | 0;
        t = rawPosition - loop * d;
        end = loopCount !== -1 && rawPosition >= loopCount * d + d;
        if (end) {
          rawPosition = (t = d) * (loop = loopCount) + d
        }
        if (rawPosition === prevRawPos) {
          return end
        } // no need to update
        var rev = !this.reversed !== !(this.bounce && loop % 2); // current loop is reversed
        if (rev) {
          t = d - t
        }
      }
      // set this in advance in case an action modifies position:
      this.position = t;
      this.rawPosition = rawPosition;
      this._updatePosition(jump, end);
      if (end) {
        this.paused = true
      }
      callback && callback(this);
      if (!ignoreActions) {
        this._runActions(prevRawPos, rawPosition, jump, !jump && prevRawPos === -1)
      }
      this.dispatchEvent("change");
      if (end) {
        this.dispatchEvent("complete")
      }
    };
    /**
     * Calculates a normalized position based on a raw position. For example, given a tween with a duration of 3000ms set to loop:
     * 	console.log(myTween.calculatePosition(3700); // 700
     * @method calculatePosition
     * @param {Number} rawPosition A raw position.
     */
    AbstractTween.prototype.calculatePosition = function calculatePosition(rawPosition) {
      // largely duplicated from setPosition, but necessary to avoid having to instantiate generic objects to pass values (end, loop, position) back.
      var d = this.duration,
        loopCount = this.loop,
        loop = 0,
        t = 0;
      if (d === 0) {
        return 0
      }
      if (loopCount !== -1 && rawPosition >= loopCount * d + d) {
        t = d;
        loop = loopCount
      } else if (rawPosition < 0) {
        t = 0
      } else {
        loop = rawPosition / d | 0;
        t = rawPosition - loop * d
      }
      var rev = !this.reversed !== !(this.bounce && loop % 2); // current loop is reversed
      return rev ? d - t : t
    };
    /**
     * Adds a label that can be used with {{#crossLink "Timeline/gotoAndPlay"}}{{/crossLink}}/{{#crossLink "Timeline/gotoAndStop"}}{{/crossLink}}.
     * @method addLabel
     * @param {String} label The label name.
     * @param {Number} position The position this label represents.
     */
    AbstractTween.prototype.addLabel = function addLabel(label, position) {
      if (!this._labels) {
        this._labels = {}
      }
      this._labels[label] = position;
      var list = this._labelList;
      if (list) {
        for (var _i = 0, l = list.length; _i < l; _i++) {
          if (position < list[_i].position) {
            break
          }
        }
        list.splice(i, 0, {
          label: label,
          position: position
        })
      }
    };
    /**
     * Unpauses this timeline and jumps to the specified position or label.
     * @method gotoAndPlay
     * @param {String|Number} positionOrLabel The position in milliseconds (or ticks if `useTicks` is `true`)
     * or label to jump to.
     */
    AbstractTween.prototype.gotoAndPlay = function gotoAndPlay(positionOrLabel) {
      this.paused = false;
      this._goto(positionOrLabel)
    };
    /**
     * Pauses this timeline and jumps to the specified position or label.
     * @method gotoAndStop
     * @param {String|Number} positionOrLabel The position in milliseconds (or ticks if `useTicks` is `true`) or label
     * to jump to.
     */
    AbstractTween.prototype.gotoAndStop = function gotoAndStop(positionOrLabel) {
      this.paused = true;
      this._goto(positionOrLabel)
    };
    /**
     * If a numeric position is passed, it is returned unchanged. If a string is passed, the position of the
     * corresponding frame label will be returned, or `null` if a matching label is not defined.
     * @method resolve
     * @param {String|Number} positionOrLabel A numeric position value or label string.
     */
    AbstractTween.prototype.resolve = function resolve(positionOrLabel) {
      var pos = Number(positionOrLabel);
      if (isNaN(pos)) {
        pos = this._labels && this._labels[positionOrLabel]
      }
      return pos
    };
    /**
     * Returns a string representation of this object.
     * @method toString
     * @return {String} a string representation of the instance.
     */
    AbstractTween.prototype.toString = function toString() {
      return "[" + this.constructor.name + (this.name ? " (name=" + this.name + ")" : "") + "]"
    };
    /**
     * @method clone
     * @protected
     */
    AbstractTween.prototype.clone = function clone() {
      throw "AbstractTween can not be cloned."
    };
    // private methods:
    /**
     * Shared logic that executes at the end of the subclass constructor.
     * @method _init
     * @protected
     */
    AbstractTween.prototype._init = function _init(props) {
      if (!props || !props.paused) {
        this.paused = false
      }
      if (props && props.position != null) {
        this.setPosition(props.position)
      }
    };
    /**
     * @method _goto
     * @protected
     */
    AbstractTween.prototype._goto = function _goto(positionOrLabel) {
      var pos = this.resolve(positionOrLabel);
      if (pos != null) {
        this.setPosition(pos, false, true)
      }
    };
    /**
     * Runs actions between startPos & endPos. Separated to support action deferral.
     * @method _runActions
     * @protected
     */
    AbstractTween.prototype._runActions = function _runActions(startRawPos, endRawPos, jump, includeStart) {
      // console.log(this.passive === false ? " > Tween" : "Timeline", "run", startRawPos, endRawPos, jump, includeStart);
      // if we don't have any actions, and we're not a Timeline, then return:
      // TODO: a cleaner way to handle this would be to override this method in Tween, but I'm not sure it's worth the overhead.
      if (!this._actionHead && !this.tweens) {
        return
      }
      var d = this.duration,
        reversed = this.reversed,
        bounce = this.bounce,
        loopCount = this.loop;
      var loop0 = void 0,
        loop1 = void 0,
        t0 = void 0,
        t1 = void 0;
      if (d === 0) {
        // deal with 0 length tweens:
        loop0 = loop1 = t0 = t1 = 0;
        reversed = bounce = false
      } else {
        loop0 = startRawPos / d | 0;
        loop1 = endRawPos / d | 0;
        t0 = startRawPos - loop0 * d;
        t1 = endRawPos - loop1 * d
      }
      // catch positions that are past the end:
      if (loopCount !== -1) {
        if (loop1 > loopCount) {
          t1 = d;
          loop1 = loopCount
        }
        if (loop0 > loopCount) {
          t0 = d;
          loop0 = loopCount
        }
      }
      // special cases:
      if (jump) {
        return this._runActionsRange(t1, t1, jump, includeStart)
      } else if (loop0 === loop1 && t0 === t1 && !jump && !includeStart) {
        return
      } else if (loop0 === -1) {
        loop0 = t0 = 0
      } // correct the -1 value for first advance, important with useTicks.
      var dir = startRawPos <= endRawPos,
        loop = loop0;
      do {
        var rev = !reversed !== !(bounce && loop % 2);
        var start = loop === loop0 ? t0 : dir ? 0 : d;
        var end = loop === loop1 ? t1 : dir ? d : 0;
        if (rev) {
          start = d - start;
          end = d - end
        }
        if (bounce && loop !== loop0 && start === end) {} else if (this._runActionsRange(start, end, jump, includeStart || loop !== loop0 && !bounce)) {
          return true
        }
        includeStart = false
      } while (dir && ++loop <= loop1 || !dir && --loop >= loop1)
    };
    /**
     * @method _runActionsRange
     * @abstract
     * @protected
     */
    AbstractTween.prototype._runActionsRange = function _runActionsRange(startPos, endPos, jump, includeStart) {};
    AbstractTween.prototype._updatePosition = function _updatePosition(jump, end) {};
    createClass(AbstractTween, [{
      key: "labels",
      get: function get() {
        var list = this._labelList;
        if (!list) {
          list = this._labelList = [];
          var labels = this._labels;
          for (var label in labels) {
            list.push({
              label: label,
              position: labels[label]
            })
          }
          list.sort(function(a, b) {
            return a.position - b.position
          })
        }
        return list
      },
      set: function set(labels) {
        this._labels = labels;
        this._labelList = null
      }
    }, {
      key: "currentLabel",
      get: function get() {
        var labels = this.getLabels();
        var pos = this.position;
        for (var _i2 = 0, l = labels.length; _i2 < l; _i2++) {
          if (pos < labels[_i2].position) {
            break
          }
        }
        return i === 0 ? null : labels[i - 1].label
      }
    }, {
      key: "paused",
      get: function get() {
        return this._paused
      },
      set: function set(paused) {
        Tween._register(this, paused);
        this._paused = paused
      }
    }]);
    return AbstractTween
  }(EventDispatcher);
  /**
   * The Ease class provides a collection of easing functions for use with TweenJS. It does not use the standard 4 param
   * easing signature. Instead it uses a single param which indicates the current linear ratio (0 to 1) of the tween.
   *
   * Most methods on Ease can be passed directly as easing functions:
   *
   *      Tween.get(target).to({x:100}, 500, Ease.linear);
   *
   * However, methods beginning with "get" will return an easing function based on parameter values:
   *
   *      Tween.get(target).to({y:200}, 500, Ease.getPowIn(2.2));
   *
   * Please see the <a href="http://www.createjs.com/Demos/TweenJS/Tween_SparkTable">spark table demo</a> for an
   * overview of the different ease types on <a href="http://tweenjs.com">TweenJS.com</a>.
   *
   * <em>Equations derived from work by Robert Penner.</em>
   * @class Ease
   * @static
   * @module TweenJS
   */
  var Ease = function() {
    function Ease() {
      classCallCheck(this, Ease);
      throw "Ease is static and cannot be instantiated."
    }
    // static methods:
    /**
     * @method linear
     * @param {Number} t
     * @static
     * @return {Number}
     */
    Ease.linear = function linear(t) {
      return t
    };
    /**
     * Mimics the simple -100 to 100 easing in Flash Pro.
     * @method get
     * @param {Number} amount A value from -1 (ease in) to 1 (ease out) indicating the strength and direction of the ease.
     * @static
     * @return {Function}
     */
    Ease.get = function get(amount) {
      if (amount < -1) {
        amount = -1
      } else if (amount > 1) {
        amount = 1
      }
      return function(t) {
        if (amount == 0) {
          return t
        }
        if (amount < 0) {
          return t * (t * -amount + 1 + amount)
        }
        return t * ((2 - t) * amount + (1 - amount))
      }
    };
    /**
     * Configurable exponential ease.
     * @method getPowIn
     * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
     * @static
     * @return {Function}
     */
    Ease.getPowIn = function getPowIn(pow) {
      return function(t) {
        return Math.pow(t, pow)
      }
    };
    /**
     * Configurable exponential ease.
     * @method getPowOut
     * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
     * @static
     * @return {Function}
     */
    Ease.getPowOut = function getPowOut(pow) {
      return function(t) {
        return 1 - Math.pow(1 - t, pow)
      }
    };
    /**
     * Configurable exponential ease.
     * @method getPowInOut
     * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
     * @static
     * @return {Function}
     */
    Ease.getPowInOut = function getPowInOut(pow) {
      return function(t) {
        if ((t *= 2) < 1) return .5 * Math.pow(t, pow);
        return 1 - .5 * Math.abs(Math.pow(2 - t, pow))
      }
    };
    /**
     * @method sineIn
     * @param {Number} t
     * @static
     * @return {Number}
     */
    Ease.sineIn = function sineIn(t) {
      return 1 - Math.cos(t * Math.PI / 2)
    };
    /**
     * @method sineOut
     * @param {Number} t
     * @static
     * @return {Number}
     */
    Ease.sineOut = function sineOut(t) {
      return Math.sin(t * Math.PI / 2)
    };
    /**
     * @method sineInOut
     * @param {Number} t
     * @static
     * @return {Number}
     */
    Ease.sineInOut = function sineInOut(t) {
      return -.5 * (Math.cos(Math.PI * t) - 1)
    };
    /**
     * Configurable "back in" ease.
     * @method getBackIn
     * @param {Number} amount The strength of the ease.
     * @static
     * @return {Function}
     */
    Ease.getBackIn = function getBackIn(amount) {
      return function(t) {
        return t * t * ((amount + 1) * t - amount)
      }
    };
    /**
     * Configurable "back out" ease.
     * @method getBackOut
     * @param {Number} amount The strength of the ease.
     * @static
     * @return {Function}
     */
    Ease.getBackOut = function getBackOut(amount) {
      return function(t) {
        return --t * t * ((amount + 1) * t + amount) + 1
      }
    };
    /**
     * Configurable "back in out" ease.
     * @method getBackInOut
     * @param {Number} amount The strength of the ease.
     * @static
     * @return {Function}
     */
    Ease.getBackInOut = function getBackInOut(amount) {
      amount *= 1.525;
      return function(t) {
        if ((t *= 2) < 1) return .5 * (t * t * ((amount + 1) * t - amount));
        return .5 * ((t -= 2) * t * ((amount + 1) * t + amount) + 2)
      }
    };
    /**
     * @method circIn
     * @param {Number} t
     * @static
     * @return {Number}
     */
    Ease.circIn = function circIn(t) {
      return -(Math.sqrt(1 - t * t) - 1)
    };
    /**
     * @method circOut
     * @param {Number} t
     * @static
     * @return {Number}
     */
    Ease.circOut = function circOut(t) {
      return Math.sqrt(1 - --t * t)
    };
    /**
     * @method circInOut
     * @param {Number} t
     * @static
     * @return {Number}
     */
    Ease.circInOut = function circInOut(t) {
      if ((t *= 2) < 1) return -.5 * (Math.sqrt(1 - t * t) - 1);
      return .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
    };
    /**
     * @method bounceIn
     * @param {Number} t
     * @static
     * @return {Number}
     */
    Ease.bounceIn = function bounceIn(t) {
      return 1 - Ease.bounceOut(1 - t)
    };
    /**
     * @method bounceOut
     * @param {Number} t
     * @static
     * @return {Number}
     */
    Ease.bounceOut = function bounceOut(t) {
      if (t < 1 / 2.75) {
        return 7.5625 * t * t
      } else if (t < 2 / 2.75) {
        return 7.5625 * (t -= 1.5 / 2.75) * t + .75
      } else if (t < 2.5 / 2.75) {
        return 7.5625 * (t -= 2.25 / 2.75) * t + .9375
      } else {
        return 7.5625 * (t -= 2.625 / 2.75) * t + .984375
      }
    };
    /**
     * @method bounceInOut
     * @param {Number} t
     * @static
     * @return {Number}
     */
    Ease.bounceInOut = function bounceInOut(t) {
      if (t < .5) return Ease.bounceIn(t * 2) * .5;
      return Ease.bounceOut(t * 2 - 1) * .5 + .5
    };
    /**
     * Configurable elastic ease.
     * @method getElasticIn
     * @param {Number} amplitude
     * @param {Number} period
     * @static
     * @return {Function}
     */
    Ease.getElasticIn = function getElasticIn(amplitude, period) {
      var pi2 = Math.PI * 2;
      return function(t) {
        if (t === 0 || t === 1) return t;
        var s = period / pi2 * Math.asin(1 / amplitude);
        return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period))
      }
    };
    /**
     * Configurable elastic ease.
     * @method getElasticOut
     * @param {Number} amplitude
     * @param {Number} period
     * @static
     * @return {Function}
     */
    Ease.getElasticOut = function getElasticOut(amplitude, period) {
      var pi2 = Math.PI * 2;
      return function(t) {
        if (t === 0 || t === 1) return t;
        var s = period / pi2 * Math.asin(1 / amplitude);
        return amplitude * Math.pow(2, -10 * t) * Math.sin((t - s) * pi2 / period) + 1
      }
    };
    /**
     * Configurable elastic ease.
     * @method getElasticInOut
     * @param {Number} amplitude
     * @param {Number} period
     * @static
     * @return {Function}
     */
    Ease.getElasticInOut = function getElasticInOut(amplitude, period) {
      var pi2 = Math.PI * 2;
      return function(t) {
        var s = period / pi2 * Math.asin(1 / amplitude);
        if ((t *= 2) < 1) return -.5 * (amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
        return amplitude * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * pi2 / period) * .5 + 1
      }
    };
    return Ease
  }();
  Ease.none = Ease.linear;
  /**
   * @method quadIn
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.quadIn = Ease.getPowIn(2);
  /**
   * @method quadOut
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.quadOut = Ease.getPowOut(2);
  /**
   * @method quadInOut
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.quadInOut = Ease.getPowInOut(2);
  /**
   * @method cubicIn
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.cubicIn = Ease.getPowIn(3);
  /**
   * @method cubicOut
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.cubicOut = Ease.getPowOut(3);
  /**
   * @method cubicInOut
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.cubicInOut = Ease.getPowInOut(3);
  /**
   * @method quartIn
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.quartIn = Ease.getPowIn(4);
  /**
   * @method quartOut
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.quartOut = Ease.getPowOut(4);
  /**
   * @method quartInOut
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.quartInOut = Ease.getPowInOut(4);
  /**
   * @method quintIn
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.quintIn = Ease.getPowIn(5);
  /**
   * @method quintOut
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.quintOut = Ease.getPowOut(5);
  /**
   * @method quintInOut
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.quintInOut = Ease.getPowInOut(5);
  /**
   * @method backIn
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.backIn = Ease.getBackIn(1.7);
  /**
   * @method backOut
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.backOut = Ease.getBackOut(1.7);
  /**
   * @method backInOut
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.backInOut = Ease.getBackInOut(1.7);
  /**
   * @method elasticIn
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.elasticIn = Ease.getElasticIn(1, .3);
  /**
   * @method elasticOut
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.elasticOut = Ease.getElasticOut(1, .3);
  /**
   * @method elasticInOut
   * @param {Number} t
   * @static
   * @return {Number}
   */
  Ease.elasticInOut = Ease.getElasticInOut(1, .3 * 1.5);
  /**
   * Tweens properties for a single target. Methods can be chained to create complex animation sequences:
   *
   * <h4>Example</h4>
   *
   *	createjs.Tween.get(target)
   *		.wait(500)
   *		.to({alpha:0, visible:false}, 1000)
   *		.call(handleComplete);
   *
   * Multiple tweens can share a target, however if they affect the same properties there could be unexpected
   * behaviour. To stop all tweens on an object, use {{#crossLink "Tween/removeTweens"}}{{/crossLink}} or pass `override:true`
   * in the props argument.
   *
   * 	createjs.Tween.get(target, {override:true}).to({x:100});
   *
   * Subscribe to the {{#crossLink "Tween/change:event"}}{{/crossLink}} event to be notified when the tween position changes.
   *
   * 	createjs.Tween.get(target, {override:true}).to({x:100}).addEventListener("change", handleChange);
   * 	function handleChange(event) {
   * 		// The tween changed.
   * 	}
   *
   * See the {{#crossLink "Tween/get"}}{{/crossLink}} method also.
   * @class Tween
   * @extends AbstractTween
   * @module TweenJS
   */
  var Tween = function(_AbstractTween) {
    inherits(Tween, _AbstractTween);
    // constructor:
    /**
     * @constructor
     * @param {Object} target The target object that will have its properties tweened.
     * @param {Object} [props] The configuration properties to apply to this instance (ex. `{loop:-1, paused:true}`).
     * Supported props are listed below. These props are set on the corresponding instance properties except where
     * specified.<UL>
     *    <LI> `useTicks`</LI>
     *    <LI> `ignoreGlobalPause`</LI>
     *    <LI> `loop`</LI>
     *    <LI> `reversed`</LI>
     *    <LI> `bounce`</LI>
     *    <LI> `timeScale`</LI>
     *    <LI> `pluginData`</LI>
     *    <LI> `paused`</LI>
     *    <LI> `position`: indicates the initial position for this tween.</LI>
     *    <LI> `onChange`: adds the specified function as a listener to the `change` event</LI>
     *    <LI> `onComplete`: adds the specified function as a listener to the `complete` event</LI>
     *    <LI> `override`: if true, removes all existing tweens for the target</LI>
     * </UL>
     */
    function Tween(target, props) {
      classCallCheck(this, Tween);
      // public properties:
      /**
       * Allows you to specify data that will be used by installed plugins. Each plugin uses this differently, but in general
       * you specify data by assigning it to a property of `pluginData` with the same name as the plugin.
       * Note that in many cases, this data is used as soon as the plugin initializes itself for the tween.
       * As such, this data should be set before the first `to` call in most cases.
       * @example
       *	myTween.pluginData.SmartRotation = data;
       *
       * Most plugins also support a property to disable them for a specific tween. This is typically the plugin name followed by "_disabled".
       * @example
       *	myTween.pluginData.SmartRotation_disabled = true;
       *
       * Some plugins also store working data in this object, usually in a property named `_PluginClassName`.
       * See the documentation for individual plugins for more details.
       * @property pluginData
       * @type {Object}
       */
      var _this = possibleConstructorReturn(this, _AbstractTween.call(this, props));
      _this.pluginData = null;
      /**
       * The target of this tween. This is the object on which the tweened properties will be changed.
       * @property target
       * @type {Object}
       * @readonly
       */
      _this.target = target;
      /**
       * Indicates the tween's current position is within a passive wait.
       * @property passive
       * @type {Boolean}
       * @default false
       * @readonly
       */
      _this.passive = false;
      // private properties:
      /**
       * @property _stepHead
       * @type {TweenStep}
       * @protected
       */
      _this._stepHead = new TweenStep(null, 0, 0, {}, null, true);
      /**
       * @property _stepTail
       * @type {TweenStep}
       * @protected
       */
      _this._stepTail = _this._stepHead;
      /**
       * The position within the current step. Used by MovieClip.
       * @property _stepPosition
       * @type {Number}
       * @default 0
       * @protected
       */
      _this._stepPosition = 0;
      /**
       * @property _actionHead
       * @type {TweenAction}
       * @protected
       */
      _this._actionHead = null;
      /**
       * @property _actionTail
       * @type {TweenAction}
       * @protected
       */
      _this._actionTail = null;
      /**
       * Plugins added to this tween instance.
       * @property _plugins
       * @type Array[Object]
       * @default null
       * @protected
       */
      _this._plugins = null;
      /**
       * Hash for quickly looking up added plugins. Null until a plugin is added.
       * @property _plugins
       * @type Object
       * @default null
       * @protected
       */
      _this._pluginIds = null;
      /**
       * Used by plugins to inject new properties.
       * @property _injected
       * @type {Object}
       * @default null
       * @protected
       */
      _this._injected = null;
      if (props) {
        _this.pluginData = props.pluginData;
        if (props.override) {
          Tween.removeTweens(target)
        }
      }
      if (!_this.pluginData) {
        _this.pluginData = {}
      }
      _this._init(props);
      return _this
    }
    // static methods:
    /**
     * Returns a new tween instance. This is functionally identical to using `new Tween(...)`, but may look cleaner
     * with the chained syntax of TweenJS.
     * <h4>Example</h4>
     *
     *	var tween = createjs.Tween.get(target).to({x:100}, 500);
     *	// equivalent to:
     *	var tween = new createjs.Tween(target).to({x:100}, 500);
     *
     * @method get
     * @param {Object} target The target object that will have its properties tweened.
     * @param {Object} [props] The configuration properties to apply to this instance (ex. `{loop:-1, paused:true}`).
     * Supported props are listed below. These props are set on the corresponding instance properties except where
     * specified.<UL>
     *    <LI> `useTicks`</LI>
     *    <LI> `ignoreGlobalPause`</LI>
     *    <LI> `loop`</LI>
     *    <LI> `reversed`</LI>
     *    <LI> `bounce`</LI>
     *    <LI> `timeScale`</LI>
     *    <LI> `pluginData`</LI>
     *    <LI> `paused`</LI>
     *    <LI> `position`: indicates the initial position for this tween.</LI>
     *    <LI> `onChange`: adds the specified function as a listener to the `change` event</LI>
     *    <LI> `onComplete`: adds the specified function as a listener to the `complete` event</LI>
     *    <LI> `override`: if true, removes all existing tweens for the target</LI>
     * </UL>
     * @return {Tween} A reference to the created tween.
     * @static
     */
    Tween.get = function get(target, props) {
      return new Tween(target, props)
    };
    /**
     * Advances all tweens. This typically uses the {{#crossLink "Ticker"}}{{/crossLink}} class, but you can call it
     * manually if you prefer to use your own "heartbeat" implementation.
     * @method tick
     * @param {Number} delta The change in time in milliseconds since the last tick. Required unless all tweens have
     * `useTicks` set to true.
     * @param {Boolean} paused Indicates whether a global pause is in effect. Tweens with {{#crossLink "Tween/ignoreGlobalPause:property"}}{{/crossLink}}
     * will ignore this, but all others will pause if this is `true`.
     * @static
     */
    Tween.tick = function tick(delta, paused) {
      var tween = Tween._tweenHead;
      while (tween) {
        var next = tween._next; // in case it completes and wipes its _next property
        if (paused && !tween.ignoreGlobalPause || tween._paused) {} else {
          tween.advance(tween.useTicks ? 1 : delta)
        }
        tween = next
      }
    };
    /**
     * Handle events that result from Tween being used as an event handler. This is included to allow Tween to handle
     * {{#crossLink "Ticker/tick:event"}}{{/crossLink}} events from the createjs {{#crossLink "Ticker"}}{{/crossLink}}.
     * No other events are handled in Tween.
     * @method handleEvent
     * @param {Object} event An event object passed in by the {{#crossLink "EventDispatcher"}}{{/crossLink}}. Will
     * usually be of type "tick".
     * @private
     * @static
     * @since 0.4.2
     */
    Tween.handleEvent = function handleEvent(event) {
      if (event.type === "tick") {
        this.tick(event.delta, event.paused)
      }
    };
    /**
     * Removes all existing tweens for a target. This is called automatically by new tweens if the `override`
     * property is `true`.
     * @method removeTweens
     * @param {Object} target The target object to remove existing tweens from.
     * @static
     */
    Tween.removeTweens = function removeTweens(target) {
      if (!target.tweenjs_count) {
        return
      }
      var tween = Tween._tweenHead;
      while (tween) {
        var next = tween._next;
        if (tween.target === target) {
          tween.paused = true
        }
        tween = next
      }
      target.tweenjs_count = 0
    };
    /**
     * Stop and remove all existing tweens.
     * @method removeAllTweens
     * @static
     * @since 0.4.1
     */
    Tween.removeAllTweens = function removeAllTweens() {
      var tween = Tween._tweenHead;
      while (tween) {
        var next = tween._next;
        tween._paused = true;
        tween.target && (tween.target.tweenjs_count = 0);
        tween._next = tween._prev = null;
        tween = next
      }
      Tween._tweenHead = Tween._tweenTail = null
    };
    /**
     * Indicates whether there are any active tweens on the target object (if specified) or in general.
     * @method hasActiveTweens
     * @param {Object} [target] The target to check for active tweens. If not specified, the return value will indicate
     * if there are any active tweens on any target.
     * @return {Boolean} Indicates if there are active tweens.
     * @static
     */
    Tween.hasActiveTweens = function hasActiveTweens(target) {
      if (target) {
        return !!target.tweenjs_count
      }
      return !!Tween._tweenHead
    };
    /**
     * Installs a plugin, which can modify how certain properties are handled when tweened. See the {{#crossLink "SamplePlugin"}}{{/crossLink}}
     * for an example of how to write TweenJS plugins. Plugins should generally be installed via their own `install` method, in order to provide
     * the plugin with an opportunity to configure itself.
     * @method installPlugin
     * @param {Object} plugin The plugin to install
     * @param {Object} props The props to pass to the plugin
     * @static
     */
    Tween.installPlugin = function installPlugin(plugin, props) {
      plugin.install(props);
      var priority = plugin.priority = plugin.priority || 0,
        arr = Tween._plugins = Tween._plugins || [];
      for (var _i = 0, l = arr.length; _i < l; _i++) {
        if (priority < arr[_i].priority) {
          break
        }
      }
      arr.splice(i, 0, plugin)
    };
    /**
     * Registers or unregisters a tween with the ticking system.
     * @method _register
     * @param {Tween} tween The tween instance to register or unregister.
     * @param {Boolean} paused If `false`, the tween is registered. If `true` the tween is unregistered.
     * @static
     * @protected
     */
    Tween._register = function _register(tween, paused) {
      var target = tween.target;
      if (!paused && tween._paused) {
        // TODO: this approach might fail if a dev is using sealed objects
        if (target) {
          target.tweenjs_count = target.tweenjs_count ? target.tweenjs_count + 1 : 1
        }
        var tail = Tween._tweenTail;
        if (!tail) {
          Tween._tweenHead = Tween._tweenTail = tween
        } else {
          Tween._tweenTail = tail._next = tween;
          tween._prev = tail
        }
        if (!Tween._inited) {
          Ticker.addEventListener("tick", Tween);
          Tween._inited = true
        }
      } else if (paused && !tween._paused) {
        if (target) {
          target.tweenjs_count--
        }
        var next = tween._next,
          prev = tween._prev;
        if (next) {
          next._prev = prev
        } else {
          Tween._tweenTail = prev
        } // was tail
        if (prev) {
          prev._next = next
        } else {
          Tween._tweenHead = next
        } // was head.
        tween._next = tween._prev = null
      }
    };
    // public methods:
    /**
     * Adds a wait (essentially an empty tween).
     * <h4>Example</h4>
     *
     *	//This tween will wait 1s before alpha is faded to 0.
     *	createjs.Tween.get(target).wait(1000).to({alpha:0}, 1000);
     *
     * @method wait
     * @param {Number} duration The duration of the wait in milliseconds (or in ticks if `useTicks` is true).
     * @param {Boolean} [passive=false] Tween properties will not be updated during a passive wait. This
     * is mostly useful for use with {{#crossLink "Timeline"}}{{/crossLink}} instances that contain multiple tweens
     * affecting the same target at different times.
     * @return {Tween} This tween instance (for chaining calls).
     * @chainable
     */
    Tween.prototype.wait = function wait(duration) {
      var passive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (duration > 0) {
        this._addStep(+duration, this._stepTail.props, null, passive)
      }
      return this
    };
    /**
     * Adds a tween from the current values to the specified properties. Set duration to 0 to jump to these value.
     * Numeric properties will be tweened from their current value in the tween to the target value. Non-numeric
     * properties will be set at the end of the specified duration.
     * <h4>Example</h4>
     *
     *	createjs.Tween.get(target).to({alpha:0, visible:false}, 1000);
     *
     * @method to
     * @param {Object} props An object specifying property target values for this tween (Ex. `{x:300}` would tween the x
     * property of the target to 300).
     * @param {Number} [duration=0] The duration of the tween in milliseconds (or in ticks if `useTicks` is true).
     * @param {Function} [ease=Ease.linear] The easing function to use for this tween. See the {{#crossLink "Ease"}}{{/crossLink}}
     * class for a list of built-in ease functions.
     * @return {Tween} This tween instance (for chaining calls).
     * @chainable
     */
    Tween.prototype.to = function to(props) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var ease = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Ease.linear;
      if (duration < 0) {
        duration = 0
      }
      var step = this._addStep(+duration, null, ease);
      this._appendProps(props, step);
      return this
    };
    /**
     * Adds a label that can be used with {{#crossLink "Tween/gotoAndPlay"}}{{/crossLink}}/{{#crossLink "Tween/gotoAndStop"}}{{/crossLink}}
     * at the current point in the tween. For example:
     *
     * 	var tween = createjs.Tween.get(foo)
     * 					.to({x:100}, 1000)
     * 					.label("myLabel")
     * 					.to({x:200}, 1000);
     * // ...
     * tween.gotoAndPlay("myLabel"); // would play from 1000ms in.
     *
     * @method label
     * @param {String} label The label name.
     * @return {Tween} This tween instance (for chaining calls).
     * @chainable
     */
    Tween.prototype.label = function label(name) {
      this.addLabel(name, this.duration);
      return this
    };
    /**
     * Adds an action to call the specified function.
     * <h4>Example</h4>
     *
     * 	//would call myFunction() after 1 second.
     * 	createjs.Tween.get().wait(1000).call(myFunction);
     *
     * @method call
     * @param {Function} callback The function to call.
     * @param {Array} [params]. The parameters to call the function with. If this is omitted, then the function
     * will be called with a single param pointing to this tween.
     * @param {Object} [scope]. The scope to call the function in. If omitted, it will be called in the target's scope.
     * @return {Tween} This tween instance (for chaining calls).
     * @chainable
     */
    Tween.prototype.call = function call(callback, params, scope) {
      return this._addAction(scope || this.target, callback, params || [this])
    };
    /**
     * Adds an action to set the specified props on the specified target. If `target` is null, it will use this tween's
     * target. Note that for properties on the target object, you should consider using a zero duration {{#crossLink "Tween/to"}}{{/crossLink}}
     * operation instead so the values are registered as tweened props.
     * <h4>Example</h4>
     *
     *	myTween.wait(1000).set({visible:false}, foo);
     *
     * @method set
     * @param {Object} props The properties to set (ex. `{visible:false}`).
     * @param {Object} [target] The target to set the properties on. If omitted, they will be set on the tween's target.
     * @return {Tween} This tween instance (for chaining calls).
     * @chainable
     */
    Tween.prototype.set = function set(props, target) {
      return this._addAction(target || this.target, this._set, [props])
    };
    /**
     * Adds an action to play (unpause) the specified tween. This enables you to sequence multiple tweens.
     * <h4>Example</h4>
     *
     *	myTween.to({x:100}, 500).play(otherTween);
     *
     * @method play
     * @param {Tween} [tween] The tween to play. Defaults to this tween.
     * @return {Tween} This tween instance (for chaining calls).
     * @chainable
     */
    Tween.prototype.play = function play(tween) {
      return this._addAction(tween || this, this._set, [{
        paused: false
      }])
    };
    /**
     * Adds an action to pause the specified tween.
     *
     * myTween.pause(otherTween).to({alpha:1}, 1000).play(otherTween);
     *
     * Note that this executes at the end of a tween update, so the tween may advance beyond the time the pause
     * action was inserted at. For example:
     *
     * myTween.to({foo:0}, 1000).pause().to({foo:1}, 1000);
     *
     * At 60fps the tween will advance by ~16ms per tick, if the tween above was at 999ms prior to the current tick, it
     * will advance to 1015ms (15ms into the second "step") and then pause.
     *
     * @method pause
     * @param {Tween} [tween] The tween to pause. Defaults to this tween.
     * @return {Tween} This tween instance (for chaining calls)
     * @chainable
     */
    Tween.prototype.pause = function pause(tween) {
      return this._addAction(tween || this, this._set, [{
        paused: false
      }])
    };
    /**
     * @method clone
     * @protected
     */
    Tween.prototype.clone = function clone() {
      throw "Tween can not be cloned."
    };
    // private methods:
    /**
     * Adds a plugin to this tween.
     * @method _addPlugin
     * @param {Object} plugin
     * @protected
     */
    Tween.prototype._addPlugin = function _addPlugin(plugin) {
      var ids = this._pluginIds || (this._pluginIds = {}),
        id = plugin.id;
      if (!id || ids[id]) {
        return
      } // already added
      ids[id] = true;
      var plugins = this._plugins || (this._plugins = []),
        priority = plugin.priority || 0;
      for (var _i2 = 0, l = plugins.length; _i2 < l; _i2++) {
        if (priority < plugins[_i2].priority) {
          plugins.splice(_i2, 0, plugin);
          return
        }
      }
      plugins.push(plugin)
    };
    /**
     * @method _updatePosition
     * @override
     */
    Tween.prototype._updatePosition = function _updatePosition(jump, end) {
      var step = this._stepHead.next,
        t = this.position,
        d = this.duration;
      if (this.target && step) {
        // find our new step index:
        var stepNext = step.next;
        while (stepNext && stepNext.t <= t) {
          step = step.next;
          stepNext = step.next
        }
        var ratio = end ? d === 0 ? 1 : t / d : (t - step.t) / step.d; // TODO: revisit this.
        this._updateTargetProps(step, ratio, end)
      }
      this._stepPosition = step ? t - step.t : 0
    };
    /**
     * @method _updateTargetProps
     * @param {Object} step
     * @param {Number} ratio
     * @param {Boolean} end Indicates to plugins that the full tween has ended.
     * @protected
     */
    Tween.prototype._updateTargetProps = function _updateTargetProps(step, ratio, end) {
      if (this.passive = !!step.passive) {
        return
      } // don't update props.
      var v = void 0,
        v0 = void 0,
        v1 = void 0,
        ease = void 0;
      var p0 = step.prev.props;
      var p1 = step.props;
      if (ease = step.ease) {
        ratio = ease(ratio, 0, 1, 1)
      }
      var plugins = this._plugins;
      proploop: for (var n in p0) {
        v0 = p0[n];
        v1 = p1[n];
        // values are different & it is numeric then interpolate:
        if (v0 !== v1 && typeof v0 === "number") {
          v = v0 + (v1 - v0) * ratio
        } else {
          v = ratio >= 1 ? v1 : v0
        }
        if (plugins) {
          for (var _i3 = 0, l = plugins.length; _i3 < l; _i3++) {
            var value = plugins[_i3].change(this, step, n, v, ratio, end);
            if (value === Tween.IGNORE) {
              continue proploop
            }
            if (value !== undefined) {
              v = value
            }
          }
        }
        this.target[n] = v
      }
    };
    /**
     * @method _runActionsRange
     * @param {Number} startPos
     * @param {Number} endPos
     * @param {Boolean} includeStart
     * @protected
     * @override
     */
    Tween.prototype._runActionsRange = function _runActionsRange(startPos, endPos, jump, includeStart) {
      var rev = startPos > endPos;
      var action = rev ? this._actionTail : this._actionHead;
      var ePos = endPos,
        sPos = startPos;
      if (rev) {
        ePos = startPos;
        sPos = endPos
      }
      var t = this.position;
      while (action) {
        var pos = action.t;
        if (pos === endPos || pos > sPos && pos < ePos || includeStart && pos === startPos) {
          action.funct.apply(action.scope, action.params);
          if (t !== this.position) {
            return true
          }
        }
        action = rev ? action.prev : action.next
      }
    };
    /**
     * @method _appendProps
     * @param {Object} props
     * @protected
     */
    Tween.prototype._appendProps = function _appendProps(props, step, stepPlugins) {
      var initProps = this._stepHead.props,
        target = this.target,
        plugins = Tween._plugins;
      var n = void 0,
        i = void 0,
        l = void 0,
        value = void 0,
        initValue = void 0,
        inject = void 0;
      var oldStep = step.prev,
        oldProps = oldStep.props;
      var stepProps = step.props = this._cloneProps(oldProps);
      var cleanProps = {};
      for (n in props) {
        if (!props.hasOwnProperty(n)) {
          continue
        }
        cleanProps[n] = stepProps[n] = props[n];
        if (initProps[n] !== undefined) {
          continue
        }
        initValue = undefined; // accessing missing properties on DOMElements when using CSSPlugin is INSANELY expensive, so we let the plugin take a first swing at it.
        if (plugins) {
          for (i = plugins.length - 1; i >= 0; i--) {
            value = plugins[i].init(this, n, initValue);
            if (value !== undefined) {
              initValue = value
            }
            if (initValue === Tween.IGNORE) {
              (ignored = ignored || {})[n] = true;
              delete stepProps[n];
              delete cleanProps[n];
              break
            }
          }
        }
        if (initValue !== Tween.IGNORE) {
          if (initValue === undefined) {
            initValue = target[n]
          }
          oldProps[n] = initValue === undefined ? null : initValue
        }
      }
      for (n in cleanProps) {
        value = props[n];
        // propagate old value to previous steps:
        var o = void 0,
          prev = oldStep;
        while ((o = prev) && (prev = o.prev)) {
          if (prev.props === o.props) {
            continue
          } // wait step
          if (prev.props[n] !== undefined) {
            break
          } // already has a value, we're done.
          prev.props[n] = oldProps[n]
        }
      }
      if (stepPlugins && (plugins = this._plugins)) {
        for (i = plugins.length - 1; i >= 0; i--) {
          plugins[i].step(this, step, cleanProps)
        }
      }
      if (inject = this._injected) {
        this._injected = null;
        this._appendProps(inject, step, false)
      }
    };
    /**
     * Used by plugins to inject properties onto the current step. Called from within `Plugin.step` calls.
     * For example, a plugin dealing with color, could read a hex color, and inject red, green, and blue props into the tween.
     * See the SamplePlugin for more info.
     * @method _injectProp
     * @param {String} name
     * @param {Object} value
     * @protected
     */
    Tween.prototype._injectProp = function _injectProp(name, value) {
      var o = this._injected || (this._injected = {});
      o[name] = value
    };
    /**
     * @method _addStep
     * @param {Number} duration
     * @param {Object} props
     * @param {Function} ease
     * @param {Boolean} [passive=false]
     * @protected
     */
    Tween.prototype._addStep = function _addStep(duration, props, ease) {
      var passive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var step = new TweenStep(this._stepTail, this.duration, duration, props, ease, passive);
      this.duration += duration;
      return this._stepTail = this._stepTail.next = step
    };
    /**
     * @method _addAction
     * @param {Object} scope
     * @param {Function} funct
     * @param {Array} params
     * @protected
     */
    Tween.prototype._addAction = function _addAction(scope, funct, params) {
      var action = new TweenAction(this._actionTail, this.duration, scope, funct, params);
      if (this._actionTail) {
        this._actionTail.next = action
      } else {
        this._actionHead = action
      }
      this._actionTail = action;
      return this
    };
    /**
     * @method _set
     * @param {Object} props
     * @protected
     */
    Tween.prototype._set = function _set(props) {
      for (var n in props) {
        this[n] = props[n]
      }
    };
    /**
     * @method _cloneProps
     * @param {Object} props
     * @protected
     */
    Tween.prototype._cloneProps = function _cloneProps(props) {
      var o = {};
      for (var n in props) {
        o[n] = props[n]
      }
      return o
    };
    return Tween
  }(AbstractTween); {
    var p = Tween.prototype;
    p.w = p.wait;
    p.t = p.to;
    p.c = p.call;
    p.s = p.set
  }
  // static properties
  /**
   * Constant returned by plugins to tell the tween not to use default assignment.
   * @property IGNORE
   * @type Object
   * @static
   */
  Tween.IGNORE = {};
  /**
   * @property _listeners
   * @type Array[Tween]
   * @static
   * @protected
   */
  Tween._tweens = [];
  /**
   * @property _plugins
   * @type Object
   * @static
   * @protected
   */
  Tween._plugins = null;
  /**
   * @property _tweenHead
   * @type Tween
   * @static
   * @protected
   */
  Tween._tweenHead = null;
  /**
   * @property _tweenTail
   * @type Tween
   * @static
   * @protected
   */
  Tween._tweenTail = null;
  // helpers:
  var TweenStep = function TweenStep(prev, t, d, props, ease, passive) {
    classCallCheck(this, TweenStep);
    this.next = null;
    this.prev = prev;
    this.t = t;
    this.d = d;
    this.props = props;
    this.ease = ease;
    this.passive = passive;
    this.index = prev ? prev.index + 1 : 0
  };
  var TweenAction = function TweenAction(prev, t, scope, funct, params) {
    classCallCheck(this, TweenAction);
    this.next = null;
    this.d = 0;
    this.prev = prev;
    this.t = t;
    this.scope = scope;
    this.funct = funct;
    this.params = params
  };
  /**
   * The Timeline class synchronizes multiple tweens and allows them to be controlled as a group. Please note that if a
   * timeline is looping, the tweens on it may appear to loop even if the "loop" property of the tween is false.
   *
   * NOTE: Timeline currently also accepts a param list in the form: `tweens, labels, props`. This is for backwards
   * compatibility only and will be removed in the future. Include tweens and labels as properties on the props object.
   * @class Timeline
   * @param {Object} [props] The configuration properties to apply to this instance (ex. `{loop:-1, paused:true}`).
   * Supported props are listed below. These props are set on the corresponding instance properties except where
   * specified.<UL>
   *    <LI> `useTicks`</LI>
   *    <LI> `ignoreGlobalPause`</LI>
   *    <LI> `loop`</LI>
   *    <LI> `reversed`</LI>
   *    <LI> `bounce`</LI>
   *    <LI> `timeScale`</LI>
   *    <LI> `paused`</LI>
   *    <LI> `position`: indicates the initial position for this tween.</LI>
   *    <LI> `onChange`: adds the specified function as a listener to the `change` event</LI>
   *    <LI> `onComplete`: adds the specified function as a listener to the `complete` event</LI>
   * </UL>
   * @extends AbstractTween
   * @module TweenJS
   */
  var Timeline = function(_AbstractTween) {
    inherits(Timeline, _AbstractTween);
    // constructor
    /**
     * @constructor
     * @param {Object} props
     */
    function Timeline() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, Timeline);
      // private properties:
      /**
       * The array of tweens in the timeline. It is *strongly* recommended that you use
       * {{#crossLink "Tween/addTween"}}{{/crossLink}} and {{#crossLink "Tween/removeTween"}}{{/crossLink}},
       * rather than accessing this directly, but it is included for advanced uses.
       * @property tweens
       * @type Array
       */
      var _this = possibleConstructorReturn(this, _AbstractTween.call(this, props));
      _this.tweens = [];
      if (props.tweens) {
        _this.addTween.apply(_this, props.tweens)
      }
      if (props.labels) {
        _this.labels = props.labels
      }
      _this._init(props);
      return _this
    }
    // public methods:
    /**
     * Adds one or more tweens (or timelines) to this timeline. The tweens will be paused (to remove them from the
     * normal ticking system) and managed by this timeline. Adding a tween to multiple timelines will result in
     * unexpected behaviour.
     * @method addTween
     * @param {Tween} ...tween The tween(s) to add. Accepts multiple arguments.
     * @return {Tween} The first tween that was passed in.
     */
    Timeline.prototype.addTween = function addTween() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key]
      }
      var l = args.length;
      if (l === 1) {
        var _tween = args[0];
        this.tweens.push(_tween);
        _tween._parent = this;
        _tween.paused = true;
        var d = _tween.duration;
        if (_tween.loop > 0) {
          d *= _tween.loop + 1
        }
        if (d > this.duration) {
          this.duration = d
        }
        if (this.rawPosition >= 0) {
          _tween.setPosition(this.rawPosition)
        }
        return _tween
      }
      if (l > 1) {
        for (var i = 0; i < l; i++) {
          this.addTween(args[i])
        }
        return args[l - 1]
      }
      return null
    };
    /**
     * Removes one or more tweens from this timeline.
     * @method removeTween
     * @param {Tween} ...args The tween(s) to remove. Accepts multiple arguments.
     * @return Boolean Returns `true` if all of the tweens were successfully removed.
     */
    Timeline.prototype.removeTween = function removeTween() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2]
      }
      var l = args.length;
      if (l === 1) {
        var tweens = this.tweens;
        var i = tweens.length;
        while (i--) {
          if (tweens[i] === tween) {
            tweens.splice(i, 1);
            tween._parent = null;
            if (tween.duration >= this.duration) {
              this.updateDuration()
            }
            return true
          }
        }
        return false
      }
      if (l > 1) {
        var good = true;
        for (var _i = 0; _i < l; _i++) {
          good = good && this.removeTween(args[_i])
        }
        return good
      }
      return true
    };
    /**
     * Recalculates the duration of the timeline. The duration is automatically updated when tweens are added or removed,
     * but this method is useful if you modify a tween after it was added to the timeline.
     * @method updateDuration
     */
    Timeline.prototype.updateDuration = function updateDuration() {
      this.duration = 0;
      for (var i = 0, l = this.tweens.length; i < l; i++) {
        var _tween2 = this.tweens[i];
        var d = _tween2.duration;
        if (_tween2.loop > 0) {
          d *= _tween2.loop + 1
        }
        if (d > this.duration) {
          this.duration = d
        }
      }
    };
    /**
     * @method clone
     * @protected
     */
    Timeline.prototype.clone = function clone() {
      throw "Timeline can not be cloned."
    };
    // private methods:
    /**
     * @method _updatePosition
     * @override
     */
    Timeline.prototype._updatePosition = function _updatePosition(jump, end) {
      var t = this.position;
      for (var i = 0, l = this.tweens.length; i < l; i++) {
        this.tweens[i].setPosition(t, true, jump)
      }
    };
    /**
     * @method _runActionsRange
     * @override
     */
    Timeline.prototype._runActionsRange = function _runActionsRange(startPos, endPos, jump, includeStart) {
      //console.log("	range", startPos, endPos, jump, includeStart);
      var t = this.position;
      for (var i = 0, l = this.tweens.length; i < l; i++) {
        this.tweens[i]._runActions(startPos, endPos, jump, includeStart);
        if (t !== this.position) {
          return true
        }
      }
    };
    return Timeline
  }(AbstractTween);
  /**
   * The TweenJS JavaScript library provides a simple but powerful tweening interface. It supports tweening of both
   * numeric object properties & CSS style properties, and allows you to chain tweens and actions together to create
   * complex sequences.
   *
   * <h4>Simple Tween</h4>
   * This tween will tween the target's alpha property from 0 to 1 for 1s then call the <code>handleComplete</code> function.
   *
   *	    target.alpha = 0;
   *	    createjs.Tween.get(target).to({alpha:1}, 1000).call(handleComplete);
   *	    function handleComplete() {
   *	    	//Tween complete
   *	    }
   *
   * <strong>Arguments and Scope</strong>
   * Tween also supports a `call()` with arguments and/or a scope. If no scope is passed, then the function is called
   * anonymously (normal JavaScript behaviour). The scope is useful for maintaining scope when doing object-oriented
   * style development.
   *
   *      createjs.Tween.get(target).to({alpha:0})
   *          .call(handleComplete, [argument1, argument2], this);
   *
   * <h4>Chainable Tween</h4>
   * This tween will wait 0.5s, tween the target's alpha property to 0 over 1s, set it's visible to false, then call the
   * <code>handleComplete</code> function.
   *
   *	    target.alpha = 1;
   *	    createjs.Tween.get(target).wait(500).to({alpha:0, visible:false}, 1000).call(handleComplete);
   *	    function handleComplete() {
   *	    	//Tween complete
   *	    }
   *
   * <h4>Browser Support</h4>
   * TweenJS will work in all browsers.
   *
   * @module TweenJS
   * @main TweenJS
   */
  /**
   * README: Export Order
   *
   * Due to some classes having circular import bindings (whether at the top of the import chain or deeper in),
   * some exports here are in reverse order (such as Tween being exported before AbstractTween).
   * This is explained here: https://github.com/rollup/rollup/issues/845#issuecomment-240277194
   */
  // re-export shared classes
  // TODO: Review this version export.
  // version (templated in gulpfile, pulled from package).
  var version = "2.0.0";
  exports.version = version;
  exports.EventDispatcher = EventDispatcher;
  exports.Event = Event;
  exports.Ticker = Ticker;
  exports.Tween = Tween;
  exports.AbstractTween = AbstractTween;
  exports.Timeline = Timeline;
  exports.Ease = Ease
})(this.createjs = this.createjs || {});