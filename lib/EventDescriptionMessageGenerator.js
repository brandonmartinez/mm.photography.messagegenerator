var BaseMessageGenerator = require('./BaseMessageGenerator');

function EventDescriptionMessageGenerator(console, prompt, clipboard) {
    'use strict';

    var displayName = 'Event Description',
        schema = {
            properties: {
                sessionPrice: {
                    description: 'Price for session (blank to not show)?',
                    type: 'integer',
                    message: 'Must be an integer.',
                    required: false
                }
            }
        };

    BaseMessageGenerator.apply(this, [console, prompt, clipboard, displayName, schema]);
}

var baseMessageGeneratorParent = BaseMessageGenerator.extend(EventDescriptionMessageGenerator);

EventDescriptionMessageGenerator.prototype._generateMessageText = function (err, result, cb) {
    if (err) {
        return this.onError(err);
    }

    var message = '';

    message += 'Thank you for scheduling a session with us!';

    if (result.sessionPrice) {
        message += 'This session is priced at $' + result.sessionPrice + '.';
    }

    message += ' For more information regarding what\'s included in our standard sessions, please visit: http://photos.martinezmedia.net/Pricing\n\n';
    message += 'If you\'re doing an in-studio session, please take a look at our available backdrops and let us know which you\'d like to use: http://photos.martinezmedia.net/Backdrops\n\n';
    message += 'If you have any questions or concerns, definitely feel free to leave a comment here. For immediate response, please call 231-233-3976.\n\n';
    message += 'Thanks again for scheduling with us!';

    cb(message);
};

module.exports = EventDescriptionMessageGenerator;