var H = window.H || function () {
	this.currentChat = new Chat();
	this.chats = [this.currentChat];
}

H.prototype.listen = function (em) {
	var target = $(em);
	target.keydown(function (event) {
		var code = event.which;
		if (code == '13') {
			target.trigger(":message:", { message: target.val() });
		}
	})

	return target;
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
	app.listen(".input").bind(":message:", function (event, data) {
		var message = data.message;
		if ($.trim(message) == "") {
			return;
		} else {
			var date = new Date;
			var formatDate = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
			message = '<span class="datetime">' + formatDate + "</span> <span class='nil'>recevied:</span> " + message;
			app.update(message);
		}
	})
})(this, jQuery);
