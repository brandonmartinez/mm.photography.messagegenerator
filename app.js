var prompt = require('prompt'),
    clipboardy = require('clipboardy'),
    openurl = require('openurl'),
    YourPhotosAreDoneMessageGenerator = require('./lib/YourPhotosAreDoneMessageGenerator'),
    GalleryDescriptionMessageGenerator = require('./lib/GalleryDescriptionMessageGenerator'),
    EventDescriptionMessageGenerator = require('./lib/EventDescriptionMessageGenerator'),
    generators = [
        {
            generate: function () {
                return 0;
            },
            name: 'Exit'
        },
        new YourPhotosAreDoneMessageGenerator(console, prompt, clipboardy, openurl),
        new GalleryDescriptionMessageGenerator(console, prompt, clipboardy),
        new EventDescriptionMessageGenerator(console, prompt, clipboardy)
    ];

function init() {
    // For more info on prompt, https://github.com/flatiron/prompt
    prompt.message = '';
    prompt.delimiter = ':';
    prompt.start();

    console.log('Which message would you like to generate?');

    for (var index = 0; index < generators.length; index++) {
        var generator = generators[index];
        console.log(index, generator.name);
    }

    prompt.get({
        properties: {
            message: {
                description: 'Message number?',
                type: 'integer',
                required: true
            }
        }
    }, function (err, result) {
        if (err) {
            return console.error(err);
        }

        var generator = generators[result.message];
        generator.generate();
    });
}

init();