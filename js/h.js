var H = window.H || function () {
	this.currentChat = new Chat();
	this.chats = [this.currentChat];
}

H.prototype.listen = function (em) {
	var target = $(em);
	return new Promise(function (resolve, reject) {
		target.keydown(function (event) {
			var code = event.which;
			if (code == '13') {
				resolve(target.val());
			}
		})
	})
}

H.prototype.update = function (msg) {
	var chat = this.currentChat;
	chat.update(msg);
	$(".input").val('');
}

function Chat(iden) {
	this.container = iden == void 0 ? $('.chat-0') : $(iden);
}

Chat.prototype.update = function (msg) {
	$('.chat-content', this.container).append('<p class="message">' + msg + '</p>');
}

Chat.prototype.clear = function () {
	this.container.empty();
}

;(function (root, $, undefined) {
	var app = new H();
	app.listen(".input").then(function (text) {
		if (text.trim() === "") {
			// IE8 doesn't support trim
			return Promise.reject(Error("no content provided."));
		} else {
			text = "Received: " + text;
			return Promise.resolve(text);
		}
	}, function (err) {
		console.log(err);
	}).then(function (text) {
		app.update(text);
	}, function (err) {
		console.log(err);
	})
})(this, jQuery);