/**
 * Outreach plugin
 * Message Correct feature
 * Author: Ruslan Burakov
 * @see https://github.com/rburakov/openfire-outreach-plugin
 */

(function () {

	function MessageCorrect() {
		this.action = null;
		this.timestamp = null;
		this.stanzaId = null;
		this.body = null;
	}

	Strophe.addConnectionPlugin('messageCorrect', {
		_connection: null,
		_onCorrect: null,

		init: function (conn, onCorrect) {
			this._connection = conn;
			Strophe.addNamespace('CORRECT', 'jabber:iq:msg-correct');
			this._connection.addHandler(this._correctHandler.bind(this), Strophe.NS.CORRECT, 'iq');
		},

		onCorrect: function (onCorrect) {
			_onCorrect = onCorrect;
		},

		edit: function (sid, msg) {
			var id = this._connection.getUniqueId();
			var iq = $iq({type: 'set', id: id}).c('query', {xmlns: Strophe.NS.CORRECT, sid: sid, ma: 'edit'}).c("body").t(msg);
			this._connection.sendIQ(iq);
		},

		delete: function (sid) {
			var id = this._connection.getUniqueId();
			var iq = $iq({type: 'set', id: id}).c('query', {xmlns: Strophe.NS.CORRECT, sid: sid, ma: 'delete'});
			this._connection.sendIQ(iq);
		},

		_correctHandler: function (iq) {
			if (typeof _onCorrect !== "function")
				return true;

			var query = $(iq).find('query');
			var action = query.attr('ma');
			var timestamp = query.attr('ts');
			var stanzaId = query.attr('sid');
			var body = query.find('body').html();

			if (action && timestamp && stanzaId){

				var correct = new MessageCorrect();
				correct.action = action;
				correct.timestamp = timestamp;
				correct.stanzaId = stanzaId;
				correct.body = body;
				_onCorrect(correct);
			}
			return true;
		}
	});

})();