# strophe.message-correct.js

strophe.message-correct.js is a plugin to provide support for Openfire Outreach plugin Message Correct feature
( [Outreach Plugin]( https://github.com/rburakov/openfire-outreach-plugin ) ).

## Usage

### Handling message correct

`connection.messageCorrect.onCorrect(onMessageCorrect);`

`onMessageCorrect` is a function that gets called back when new message correct IQ is recieved. It has `correct` object as an argument:

	{
        // Message correct type
        action: 'edit' | 'delete',

        // Timestamp when message was corrected
        timestamp,

        // Message stanza ID
        stanzaId,

        // Edited message body
        body
	}

### Example

	function onConnected() {
        // ...
        connection.messageCorrect.onCorrect(onMessageCorrect);
	}

	function onMessageCorrect(correct) {

        if (correct.action == 'edit'){
            // Update view by editing a message (correct.stanzaId, correct.body)
        }
        else if (correct.action == 'delete'){
            // Remove a message from view (correct.stanzaId)
        }
	}

    // Send correct IQ to edit message
    connection.messageCorrect.edit(msgStanzaId, msgBody);

    // Send correct IQ to delete message
    connection.messageCorrect.delete(msgStanzaId);
