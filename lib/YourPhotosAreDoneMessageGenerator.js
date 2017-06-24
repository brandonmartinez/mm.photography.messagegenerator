var BaseMessageGenerator = require('./BaseMessageGenerator');

function YourPhotosAreDoneMessageGenerator(console, prompt, clipboard, urlOpener) {
    'use strict';

    var displayName = 'Your Photos Are Done',
        schema = {
            properties: {
                photosUploaded: {
                    description: 'Have the photos been fully uploaded?',
                    type: 'string',
                    pattern: /^(?:y|n|yes|no)$/i,
                    message: 'Must be yes/no input',
                    required: true
                },
                numberOfPhotos: {
                    description: 'How many photos in the gallery?',
                    type: 'integer',
                    message: 'Must enter number of photos.',
                    required: true
                },
                galleryUrl: {
                    description: 'Shortened Gallery URL?',
                    type: 'string',
                    format: 'url',
                    message: 'Must be a valid URL.',
                    required: true
                },
                contractUrl: {
                    description: 'Shortened Contract URL?',
                    type: 'string',
                    format: 'url',
                    message: 'Must be a valid URL.',
                    required: true
                }
            }
        };

    BaseMessageGenerator.apply(this, [console, prompt, clipboard, displayName, schema]);
    this.urlOpener = urlOpener;
}

var baseMessageGeneratorParent = BaseMessageGenerator.extend(YourPhotosAreDoneMessageGenerator);

YourPhotosAreDoneMessageGenerator.prototype._generateMessageText = function (err, result, cb) {
    if (err) {
        return this.onError(err);
    }

    var photosUploaded = result.photosUploaded === 'yes' || result.photosUploaded === 'y',
        message = '';

    if (photosUploaded) {
        message += 'Your photos are done! All ' + result.numberOfPhotos + ' photos are uploaded and available to view.';
    } else {
        message += 'Your photos are uploading! All ' + result.numberOfPhotos + ' photos should be fully uploaded within the next hour.';
    }

    message += ' You can access your private gallery from this URL: ' + result.galleryUrl + '\n\n';

    message += 'From that gallery you can browse the proofs from your session. Using the gallery’s shopping cart (via the “Buy” button), you can order professional-quality prints as well as a digital gallery download. We highly recommend using our site to order prints that you want to “show off” (e.g. frame or display).\n\n';
    message += 'Feel free to send that URL to friends, family, or some of our clients even share it right on their Facebook timeline for the world to see. Any of those options is your choice, just keep in mind that anyone with that link can browse and order prints at any time.\n\n';
    message += 'A copy of your session contract and model release can be found here: ' + result.contractUrl + '\n\n';
    message += 'Thanks again for having us do your photos!\n\n';
    message += 'Also, if you wouldn’t mind taking a moment to rate and/or review us, we’d really appreciate it. Thanks again! https://www.facebook.com/martinezmediaphotography/reviews';

    this.urlOpener.open(result.galleryUrl);
    this.urlOpener.open(result.contractUrl);

    cb(message);
};

module.exports = YourPhotosAreDoneMessageGenerator;