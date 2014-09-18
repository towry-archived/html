function bind(e, t, cb) {
	e['addEventListener'] ? e['addEventListener'](t, cb) :
	e['attachEvent']("on" + t, cb);
}

if (typeof String.prototype.trim !== "function") {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, '');
	}
}

function get(s, p) {
	if (p) {
		doc = p;
	} else {
		doc = document;
	}

	s = s.trim();
	if (s.length == 0) return [];
	if (s[0] == ".") {
		if (typeof doc['getElementsByClassName'] != "function") {
			return doc.querySelectorAll(s);
		} else {
			return doc.getElementsByClassName(s.slice(1));
		}
	} else if (s[0] == "#") {
		return doc.getElementById(s.slice(1));
	} else {
		return doc.getElementsByTagName(s);
	}
}

!function () {
	this.console = this.console || function (s) {};
}.call(this), function () {
	var sliderId = "#slides";
	var slideTopKlass = ".slide-top";
	var slideCtrlKlass = ".slide-control";
	var slider, sliderTop, slideCtrl, slideCtrlSpan;
	var slidePerHeight = 240;
	var curr, index = 0;

	slider = get(sliderId);
	sliderTop = get(slideTopKlass)[0];
	slideCtrl = get(slideCtrlKlass)[0];
	slideCtrlSpan = get('span', slideCtrl);

	if (!slider || !sliderTop || !slideCtrl) {
		return false;
	}

	bind(slideCtrl, 'click', function (e) {
		var e = e || window.event;
		var self = e.target || e.srcElement;
		
		if (self.tagName.toLowerCase() === "span") {
			if (curr != void 0) {
				curr.className = "";
			}
			curr = self;

			curr.className = "curr";
			index = parseInt(curr.innerText) -1;
			if (isNaN(index)) {
				throw new Error("Can't parse text to int.");
			}

			var height = index * slidePerHeight * -1;
			sliderTop.style.top = height + "px";
		}
	});

	setInterval(function () {
		var height;

		height = index * slidePerHeight * -1;

		sliderTop.style.top = height + "px";
		var span = slideCtrlSpan[index];

		if (span === void 0) {
			throw new Error("index error.");
		}
		if (curr != void 0) {
			curr.className = "";
		}
		curr = span;
		curr.className = "curr";

		index ++;
		if (index >= slideCtrlSpan.length) {
			index = 0;
		}
	}, 2500);

}.call(this);