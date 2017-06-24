function BaseMessageGenerator(console, prompt, clipboard, name, schema) {
    this.console = console;
    this.prompt = prompt;
    this.clipboard = clipboard;
    this.name = name;
    this.schema = schema;
}

BaseMessageGenerator.prototype.onError = function (err) {
    this.console.error(err);
    return 1;
};


BaseMessageGenerator.prototype.generate = function (err) {
    var self = this;

    if (err) {
        return self.onError(err);
    }

    self.prompt.get(self.schema, function (err, result) {
        self._generateMessageText(err, result, function (message) {
            self.clipboard.writeSync(message);
            self.console.log('\n\nMessage to follow; it has been copied to your clipboard.');
            self.console.log('##########################################\n\n');
            self.console.log(message + '\n\n');
            self.console.log('##########################################\n\n');
        });
    });
};

BaseMessageGenerator.prototype._generateMessageText = function (err, result, cb) {
    if (err) {
        return this.onError(err);
    }

    cb('notImplemented');
};

BaseMessageGenerator.extend = function (destination) {
    // Based on: http://oli.me.uk/2013/06/01/prototypical-inheritance-done-right/
    destination.prototype = Object.create(BaseMessageGenerator.prototype);
    destination.prototype.constructor = destination;
    // TODO: can we assign the base to a "parent" property instead of relying on the return?
    return BaseMessageGenerator.prototype;
};

module.exports = BaseMessageGenerator;