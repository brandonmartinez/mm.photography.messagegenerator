var BaseMessageGenerator = require('./BaseMessageGenerator');

function GalleryDescriptionMessageGenerator(console, prompt, clipboard) {
    'use strict';

    var displayName = 'Gallery Description',
        schema = {
            properties: {
                galleryHasFreeDownload: {
                    description: 'Does this gallery offer a free download?',
                    type: 'string',
                    pattern: /^(?:y|n|yes|no)$/i,
                    message: 'Must be yes/no input',
                    required: true
                }
            }
        };

    BaseMessageGenerator.apply(this, [console, prompt, clipboard, displayName, schema]);
}

var baseMessageGeneratorParent = BaseMessageGenerator.extend(GalleryDescriptionMessageGenerator);

GalleryDescriptionMessageGenerator.prototype._generateMessageText = function (err, result, cb) {
    if (err) {
        return this.onError(err);
    }

    var galleryHasFreeDownload = result.galleryHasFreeDownload === 'yes' || result.galleryHasFreeDownload === 'y',
        message = '';

    message += 'Thank you for having us capture your session; we greatly appreciate your business and look forward to working with you again in the future.\n\n';
    message += 'This gallery contains all of the photos from your session. By using the “Buy Photos” button to the right you can order individual prints and merchandise, as well as order a digital download of all the photos you see here. We highly recommend doing this on a computer, not a mobile or tablet device. Please note, watermarks do *not* show up on prints, merchandise, or downloads.\n\n';

    if (galleryHasFreeDownload) {
        message += 'Your gallery includes a free download! You can download all of the photos in this gallery by using the down arrow next to the buy button. This option is only available from a desktop computer.\n\n';
    }

    message += 'If you’d like to share this gallery with family, friends, or even Facebook, just copy the URL in your browser and paste away.\n\n';
    message += 'If you have any questions, please don\'t hesitate to ask!';

    cb(message);
};

module.exports = GalleryDescriptionMessageGenerator;