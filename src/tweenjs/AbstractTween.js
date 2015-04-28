/*
* Tween
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
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

/**
 * The TweenJS Javascript library provides a simple but powerful tweening interface. It supports tweening of both
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

// namespace:
this.createjs = this.createjs||{};

(function() {
	"use strict";


// constructor
	/**
	 * Base class that both {{#crossLink "Tween"}}{{/crossLink}} and {{#crossLink "Timeline"}}{{/crossLink}} extend. Should not be instantiated directly.
	 * 
	 * @class Tween
	 * @param {Object} [props]
	 * @extends EventDispatcher
	 * @constructor
	 */
	function AbstractTween(props) {
		this.EventDispatcher_constructor();
		
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
		this.ignoreGlobalPause = false;
	
		/**
		 * Indicates the number of times to loop. If set to -1, the tween will loop continuously.
		 * @property loop
		 * @type {Number}
		 * @default 0
		 */
		this.loop = 0;
	
		/**
		 * Indicates the duration of this tween in milliseconds (or ticks if `useTicks` is true), irrespective of `loops`.
		 * This value is automatically updated as you modify the tween. Changing it directly could result in unexpected
		 * behaviour.
		 * @property duration
		 * @type {Number}
		 * @default 0
		 * @readonly
		 */
		this.duration = 0;
	
		/**
		 * The current normalized position of the tween. This will always be a value between 0 and `duration`.
		 * Changing this property directly will have unexpected results, use {{#crossLink "Tween/setPosition"}}{{/crossLink}}.
		 * @property position
		 * @type {Object}
		 * @default 0
		 * @readonly
		 */
		this.position = 0;
		
		/**
		 * The raw tween position. This will be -1 before the tween starts.
		 * @property rawPosition
		 * @type {Number}
		 * @default -1
		 * @readonly
		 */
		this.rawPosition = -1;
	
		/**
		 * Uses ticks for all durations instead of milliseconds. This also changes the behaviour of actions (such as `call`):
		 * @property useTicks
		 * @type {Boolean}
		 * @default false
		 * @readonly
		 */
		this.useTicks = false;
		
		/**
		 * Causes the tween to play in reverse.
		 * @property reversed
		 * @type {Boolean}
		 * @default false
		 */
		this.reversed = false;
		
		/**
		 * Causes the tween to reverse direction at the end of each loop.
		 * @property bounce
		 * @type {Boolean}
		 * @default false
		 */
		this.bounce = false;
		
		/**
		 * Changes the rate at which the tween advances. For example, a `timeScale` value of `2` will double the
		 * playback speed, a value of `0.5` would halve it.
		 * @property timeScale
		 * @type {Number}
		 * @default 1
		 */
		this.timeScale = 1;
		
		
	// private properties:
		/**
		 * @property _paused
		 * @type {Boolean}
		 * @default false
		 * @protected
		 */
		this._paused = true;
		
		// TODO: doc.
		this._jump = false;
		this._prevPos = new TweenPos(this);
		this._pos = new TweenPos(this);
		
		/**
		 * @property _next
		 * @type {Tween}
		 * @default null
		 * @protected
		 */
		this._next = null;
		
		/**
		 * @property _prev
		 * @type {Tween}
		 * @default null
		 * @protected
		 */
		this._prev = null;
		
		/**
		 * @property _parent
		 * @type {Object}
		 * @default null
		 * @protected
		 */
		this._parent = null;

		/**
		 * @property _labels
		 * @type Object
		 * @protected
		 **/
		this._labels = null;

		/**
		 * @property _labelList
		 * @type Array[Object]
		 * @protected
		 **/
		this._labelList = null;

		if (props) {
			this.useTicks = !!props.useTicks;
			this.ignoreGlobalPause = !!props.ignoreGlobalPause;
			this.loop = props.loop === true ? -1 : (props.loop||0);
			this.reversed = !!props.reversed;
			this.bounce = !!props.bounce;
			this.timeScale = props.timeScale||1;
			props.onChange && this.addEventListener("change", props.onChange);
			props.onComplete && this.addEventListener("complete", props.onComplete);
		}
		if (!props || !props.paused) { this.setPaused(false); }
		
		// while `position` is shared, it needs to happen after all props are set
	};

	var p = createjs.extend(AbstractTween, createjs.EventDispatcher);

	// TODO: deprecated
	// p.initialize = function() {}; // searchable for devs wondering where it is. REMOVED. See docs for details.

// events:
	/**
	 * Dispatched whenever the tween's position changes.
	 * @event change
	 **/
	 
	/**
	 * Dispatcherd when the tween reaches its end and has paused itself. This does not fire until all loops are complete;
	 * tweens that loop continuously will never fire a complete event.
	 * @event complete
	 **/
	

// public methods:
	/**
	 * Advances the tween by a specified amount.
	 * @method advance
	 * @param {Number} delta The amount to advance in milliseconds (or ticks if useTicks is true). Negative values are supported.
	 * @param {Number} [ignoreActions=false] If true, actions will not be executed due to this change in position.
	 */
	p.advance = function(delta, ignoreActions) {
		this.setPosition(this.rawPosition+delta*this.timeScale, !ignoreActions);
	};
	
	/**
	 * Advances the tween to a specified position.
	 * @method setPosition
	 * @param {Number} rawPosition The raw position to seek to in milliseconds (or ticks if useTicks is true).
	 * @param {Boolean} [runActions=false] If true, immediately run actions that would be triggered by this change.
	 * @param {Boolean} [jump=false] If true, only actions at the new position will be run. If false, actions between the old and new position are run.
	 */
	p.setPosition = function(rawPosition, runActions, jump) {
		if (this.duration === 0) {
			if (this.rawPosition !== 0) {
				this.rawPosition = this.position = 0;
				this._setPosition(0, true, true);
			}
			return true;
		}
		
		var pos = this._calculatePos(rawPosition, this._prevPos);
		var prevPos = this._prevPos = this._pos;
		this._pos = pos;
		if (prevPos.clampedPos === pos.clampedPos) { this.rawPosition = rawPosition; return; } // no need to update
		
		// set this in advance in case an action modifies position:
		this._jump = jump;
		this.position = pos.position;
		this.rawPosition = rawPosition;
		
		this._updatePosition();
		
		if (pos.end) { this.setPaused(true); }
		
		if (runActions) { this._runActions() }
		this.dispatchEvent("change");
		
		if (pos.end) { this.dispatchEvent("complete"); }
	};
	
	
	/**
	 * Returns a sorted list of the labels defined on this tween.
	 * @method getLabels
	 * @return {Array[Object]} A sorted array of objects with label and position properties.
	 **/
	p.getLabels = function() {
		var list = this._labelList;
		if (!list) {
			list = this._labelList = [];
			var labels = this._labels;
			for (var n in labels) {
				list.push({label:n, position:labels[n]});
			}
			list.sort(function (a,b) { return a.position- b.position; });
		}
		return list;
	};
	

	/**
	 * Defines labels for use with gotoAndPlay/Stop. Overwrites any previously set labels.
	 * @method setLabels
	 * @param {Object} labels An object defining labels for using {{#crossLink "Timeline/gotoAndPlay"}}{{/crossLink}}/{{#crossLink "Timeline/gotoAndStop"}}{{/crossLink}}
	 * in the form `{labelName:time}` where time is in milliseconds (or ticks if `useTicks` is `true`).
	 **/
	p.setLabels = function(labels) {
		this._labels = labels;
		this._labelList = null;
	};

	/**
	 * Adds a label that can be used with {{#crossLink "Timeline/gotoAndPlay"}}{{/crossLink}}/{{#crossLink "Timeline/gotoAndStop"}}{{/crossLink}}.
	 * @method addLabel
	 * @param {String} label The label name.
	 * @param {Number} position The position this label represents.
	 **/
	p.addLabel = function(label, position) {
		if (!this._labels) { this._labels = {}; }
		this._labels[label] = position;
		var list = this._labelList;
		if (list) {
			for (var i= 0,l=list.length; i<l; i++) { if (position < list[i].position) { break; } }
			list.splice(i, 0, {label:label, position:position});
		}
	};

	/**
	 * Returns the name of the label on or immediately before the current position. For example, given a tween with
	 * two labels, "first" on frame index 4, and "second" on frame 8, getCurrentLabel would return:
	 * <UL>
	 * 		<LI>null if the current position is 2.</LI>
	 * 		<LI>"first" if the current position is 4.</LI>
	 * 		<LI>"first" if the current position is 7.</LI>
	 * 		<LI>"second" if the current position is 15.</LI>
	 * </UL>
	 * @method getCurrentLabel
	 * @return {String} The name of the current label or null if there is no label
	 **/
	p.getCurrentLabel = function(pos) {
		var labels = this.getLabels();
		if (pos == null) { pos = this.position; }
		for (var i = 0, l = labels.length; i<l; i++) { if (pos < labels[i].position) { break; } }
		return (i===0) ? null : labels[i-1].label;
	};
	
	/**
	 * Unpauses this timeline and jumps to the specified position or label.
	 * @method gotoAndPlay
	 * @param {String|Number} positionOrLabel The position in milliseconds (or ticks if `useTicks` is `true`)
	 * or label to jump to.
	 **/
	p.gotoAndPlay = function(positionOrLabel) {
		this.setPaused(false);
		this._goto(positionOrLabel);
	};

	/**
	 * Pauses this timeline and jumps to the specified position or label.
	 * @method gotoAndStop
	 * @param {String|Number} positionOrLabel The position in milliseconds (or ticks if `useTicks` is `true`) or label
	 * to jump to.
	 **/
	p.gotoAndStop = function(positionOrLabel) {
		this.setPaused(true);
		this._goto(positionOrLabel);
	};
	
	/**
	 * If a numeric position is passed, it is returned unchanged. If a string is passed, the position of the
	 * corresponding frame label will be returned, or `null` if a matching label is not defined.
	 * @method resolve
	 * @param {String|Number} positionOrLabel A numeric position value or label string.
	 **/
	p.resolve = function(positionOrLabel) {
		var pos = Number(positionOrLabel);
		if (isNaN(pos)) { pos = this._labels && this._labels[positionOrLabel]; }
		return pos;
	};
	

	/**
	 * Pauses or plays this tween.
	 * @method setPaused
	 * @param {Boolean} [value=true] Indicates whether the tween should be paused (`true`) or played (`false`).
	 * @return {Tween} This tween instance (for chaining calls)
	 * @chainable
	 */
	p.setPaused = function(value) {
		createjs.Tween._register(this, value);
		return this;
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 */
	p.toString = function() {
		return "[AbstractTween]";
	};

	/**
	 * @method clone
	 * @protected
	 */
	p.clone = function() {
		throw("AbstractTween can not be cloned.")
	};


// private methods:
	

	/**
	 * @method _updatePosition
	 * @protected
	 */
	p._updatePosition = function() {
		// abstract.
	};
	
	/**
	 * @method _goto
	 * @protected
	 **/
	p._goto = function(positionOrLabel) {
		var pos = this.resolve(positionOrLabel);
		if (pos != null) { this.setPosition(pos, true, true); }
	};
	
	/**
	 * @method _runActions
	 * @protected
	 */
	p._runActions = function(startPos, endPos, includeStart) {
		return;
		
		// runs actions between _prevPos & position. Separated to support action deferral.
		if (!this._tweens && !this._actionHead) { return; } // TODO: this is ugly.
		var d=this.duration, reversed=this.reversed, bounce=this.bounce, loopCount=this.loop;
		
		// optimize to reuse objects? Maybe static instances on Tween?
		var pos0 = startPos != null ? this._calculatePos(startPos) : this._prevPos;
		var pos1 = endPos != null ? this._calculatePos(endPos) : this._pos;
		
		if (pos0.clampedPos === pos1.clampedPos && !this._jump) { return; }
		var loop0=pos0/d|0, loop1=pos1/d| 0, loop=loop0;
		var t0=pos0%d, t1=pos1%d;
		
		//if (startPos != null) { console.log(d, " ", startPos, endPos, " ", pos0, pos1); }
		
		// catch jumping to the end, since it messes the normal logic up:
		if (this._jump && t1===0 && loop1) {
			if (this._rawPosition > pos1) { return; } // passed the end, don't run any actions.
			else { return this._runActionsRange(d, d, false); }
		}
		
		if (loop1 > loopCount && loopCount !== -1) { t1=d; loop1=loopCount; }
		
		do {
			var rev = !reversed !== !(bounce && loop%2);
			var start = (loop === loop0) ? t0 : 0;
			var end = (loop === loop1) ? t1 : d;
			if (rev) {
				start = d-start;
				end = d-end;
			}
			// TODO: this can get messed up when the timeline is reversed or advance is negative
			var inclStart = (loop === loop0 && includeStart) || (loop !== loop0 && !bounce);
			if (this._runActionsRange(start, end, inclStart)) { return true; }
		} while (++loop <= loop1);
	};
	
	/**
	 * @method _runActionsRange
	 * @param {Number} startPos
	 * @param {Number} endPos
	 * @param {Boolean} includeStart
	 * @protected
	 */
	p._runActionsRange = function(startPos, endPos, includeStart) {
		// abstract.
	};
	

	/**
	 * @method _cloneProps
	 * @param {Object} props
	 * @protected
	 */
	p._cloneProps = function(props) {
		var o = {};
		for (var n in props) { o[n] = props[n]; }
		return o;
	};
	
	p._calculatePos = function(rawPos, o, parentReverse) {
		if (!o) { o = new TweenPos(this); }
		
		var clampedPos = rawPos < 0 ? 0 : rawPos;
		var d=this.duration, loopCount = this.loop;
		var loop =  clampedPos/d|0;
		var t = clampedPos%d;
				
		var end = (loop > loopCount && loopCount !== -1);
		if (end) { clampedPos = (t=d)*(loop=loopCount)+d; }
				
		var rev = !this.reversed !== !(this.bounce && loop%2); // current loop is reversed
		rev = rev === !parentReverse;
		if (rev) { t = d-t; }
		
		return o.setValues(rawPos, clampedPos, t, loop, end, rev);
	};

	createjs.AbstractTween = createjs.promote(AbstractTween, "EventDispatcher");
	
	
	function TweenPos(tween, position) {
		this.tween = tween;
		this.setValues(-1, 0, 0, 0, false, false);
	}
	
	var p = TweenPos.prototype;
	p.setValues = function(rawPos, clampedPos, position, loop, end, reverse) {
		this.rawPos = rawPos;
		this.end = end;
		this.clampedPos = clampedPos;
		this.position = position;
		this.loop = loop;
		this.reverse = reverse;
		return this;
	};
	
	p.copy = function(o) {
		this.setValues(o.rawPos, o.clampedPos, o.position, o.loop, o.end, o.reverse);
	};
}());
