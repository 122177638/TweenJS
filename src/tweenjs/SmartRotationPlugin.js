/*
* SmartRotationPlugin
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

/*
	IMPORTANT: This class is not documented yet.

	The SmartRotationPlugin will ensure rotation tweens will always take the shortest path.
	Installing this plugin will currently add this behaviour to all tweens.
 */
this.createjs = this.createjs||{};

(function() {
	"use strict";

	function SmartRotationPlugin() {
		throw("SmartRotation plugin cannot be instantiated.")
	}
	var s = SmartRotationPlugin;
	
	s.props = {rotation:1, rotationX:1, rotationY:1, rotationZ:1};

	s.install = function() {
		createjs.Tween.installPlugin(SmartRotationPlugin);
	};

	s.init = function(tween, prop, value) {
		var data = tween.pluginData;
		if (s.props[prop] && !(data && data.SmartRotation_disabled)) { tween.addPlugin(s); }
		return value;
	};
	
	s.step = function(tween, step, prop, value, injectProps) {
		if (!s.props[prop]) { return; }
		var start = step.prev.props[prop];
		var delta = (value-start)%360;
		if (delta > 180) { delta -= 360; }
		else if (delta < -180) { delta += 360; }
		step.props[prop] = start+delta;
	};

	s.tween = function(tween, step, prop, value, ratio, end) {
		// do nothing.
		return value;
	};

	createjs.SmartRotationPlugin = SmartRotationPlugin;

}());
