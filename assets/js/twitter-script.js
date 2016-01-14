(function() {
	"use strict";

	window._TF = {

		consoleStyle: "color: white; background-color: #4cb3d6; padding: 3px;",
		logged: [],
		doneClass: "TF-done",
		
		initialize: function () {
			window.addEventListener("scroll", function () {
				this.filter();
			}.bind(this));

			this.filter();
		},

		filter: function () {
			this.promoted();
			this.media();
			this.wtf();
			this.trends();
		},

		media: function () {
			this.log('hiding media');
			this.iterate('.AdaptiveMedia-container', function (item) {
				if (item.classList.contains(this.doneClass)) return;
				
				var btn = this.getMediaToggle();
				
				btn.addEventListener('click', function (e) {
					if (item.style.display === 'none') {
						item.style.display = 'block';
						btn.classList.add('open');
					} else {
						item.style.display = 'none';
						btn.classList.remove('open');
					}
					
					e.preventDefault();
				}, false);

				item.style.display = 'none';
				item.parentNode.parentNode.appendChild(btn);
				item.classList.add(this.doneClass);

			}.bind(this));
		},

		wtf: function () {
			this.invoke('.WtfLargeCarouselStreamItem, .wtf-module', 'remove');
		},

		trends: function () {
			this.log("removed trends", true);
			this.invoke(".trends", 'remove');
		},

		promoted: function () {
			this.iterate('.promoted-tweet', function (item) {
				item.remove();
				this.log('removed promoted from: ' +  this.getHandle(item));
			}.bind(this));
		},

		log: function (str, once) {
			once = once == undefined ? false : once;

			if (once) {
				if (this.logged.indexOf(str) === -1) {
					this.logged.push(str);
				} else {
					return;
				}
			}

			str = "%c Twitter Filter Ext: " + str;
			console.log(str, this.consoleStyle);
		},

		iterate: function (selector, callback) {
			Array.from(document.querySelectorAll(selector)).forEach(callback);
		},

		invoke: function (selector, funct) {
			var elems = document.querySelectorAll(selector);
			Array.from(elems).forEach(function (el) {
				el[funct]();
			});
		},

		getHandle: function (tweet) {
			var matches = tweet.querySelector('.username').textContent.match(/@\S+/);
			return matches ? matches[0] : null;
		},

		getMediaToggle: function () {
			var btn = document.createElement("a");
			btn.href = "#";
			// btn.textContent = "Show Media";
			btn.className = "btn btn-sm btn-primary TF-media-toggle closed";
			return btn;
		}
	};
}());


window._TF.initialize();


