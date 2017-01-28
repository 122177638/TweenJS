/*
 * @license RotationPlugin
 * Visit http://createjs.com for documentation, updates and examples.
 *
 * Copyright (c) 2017 gskinner.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};



var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};





var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/*
* RotationPlugin
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
 * The RotationPlugin for TweenJS modifies tweens of rotation properties. These properties can be changed using the
 * `RotationPlugin.props` property. Install using:
 *
 * 	RotationPlugin.install();
 *
 * After installation, by default all rotation tweens will rotate in the shortest direction. For example, if you
 * tween from `rotation=15` to `rotation=330`, it will rotate counter-clockwise. You can modify this behaviour by
 * specifying a `rotationDir` tween value. A value of `-1` will force CCW rotation, `1` will force CW, and `0` will
 * disable the plugin effects for that portion of the tween.
 *
 * Note that the `rotationDir` value will persist until overridden in future `to` calls.
 *
 * 	// this tween will rotate: CCW, then CCW (persisted), then CW.
 * 	myTween.get(foo).to({rotation:30, rotationDir:-1}).to({rotation:60}).to({rotation:10, rotationDir:1});
 *
 * You can also disable the plugin completely for a tween by setting `tween.pluginData.Rotation_disabled=true`.
 *
 * @class RotationPlugin
 * @module TweenJS
 * @static
 */
var RotationPlugin = function () {

	// constructor:
	/**
  * @constructor
  */
	function RotationPlugin() {
		classCallCheck(this, RotationPlugin);

		throw "RotationPlugin is static and cannot be instantiated.";
	}

	// static methods:
	/**
  * Installs this plugin for use with TweenJS. Call this once after TweenJS is loaded to enable this plugin.
  * @method install
  * @static
  */


	RotationPlugin.install = function install(props) {};

	/**
  * Called by TweenJS when a new property initializes on a tween.
  * See {{#crossLink "SamplePlugin/init"}}{{/crossLink}} for more info.
  * @method init
  * @param {Tween} tween
  * @param {String} prop
  * @param {any} value
  * @return {any}
  * @static
  */


	RotationPlugin.init = function init(tween, prop, value) {
		if (RotationPlugin.props[prop] && !tween.pluginData.Rotation_disabled) {
			var data = tween.pluginData,
			    end = data.Rotation_end || (data.Rotation_end = {});
			end[prop] = value === undefined ? tween.target[prop] : value;
			tween._addPlugin(RotationPlugin);
		}
	};

	/**
  * Called when a new step is added to a tween (ie. a new "to" action is added to a tween).
  * See {{#crossLink "SamplePlugin/step"}}{{/crossLink}} for more info.
  * @method step
  * @param {Tween} tween
  * @param {TweenStep} step
  * @param {Object} prop
  * @return {any}
  * @static
  */


	RotationPlugin.step = function step(tween, _step, props) {
		for (var n in RotationPlugin.props) {
			if (props[n] === undefined) {
				continue;
			}

			var value = props[n];
			var dir = _step.props.rotationDir,
			    data = tween.pluginData;
			var end = data.Rotation_end,
			    start = _step.prev.props[n];

			if (dir === 0) {
				_step.props[n] = value - end[n] + start;
			} else {
				dir = dir || 0;
				var delta = (value - start) % 360;

				if (dir === 0 && delta > 180 || dir === -1 && delta > 0) {
					delta -= 360;
				} else if (dir === 0 && delta < -180 || dir === 1 && delta < 0) {
					delta += 360;
				}

				_step.props[n] = start + delta;
			}
			end[n] = value;
		}
	};

	/**
  * Called before a property is updated by the tween.
  * See {{#crossLink "SamplePlugin/change"}}{{/crossLink}} for more info.
  * @method change
  * @param {Tween} tween
  * @param {TweenStep} step
  * @param {String} prop
  * @param {any} value
  * @param {Number} ratio
  * @param {Boolean} end
  * @return {any}
  * @static
  */


	RotationPlugin.change = function change(tween, step, prop, value, ratio, end) {
		if (prop === "rotationDir") {
			return Tween.IGNORE;
		}
		if (end && s.props[prop]) {
			return tween.pluginData.Rotation_end;
		} // so it ends on the actual value
	};

	return RotationPlugin;
}();

RotationPlugin.props = { rotation: 1, rotationX: 1, rotationY: 1, rotationZ: 1 };

/**
 * A unique identifying string for this plugin. Used by TweenJS to ensure duplicate plugins are not installed on a tween.
 * @property ID
 * @type {String}
 * @static
 * @readonly
 */
RotationPlugin.ID = "Rotation";

exports.RotationPlugin = RotationPlugin;
