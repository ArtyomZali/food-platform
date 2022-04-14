const multer = require('multer');
const { nanoid } = require('nanoid');
const path = require('path');
const imageMimetypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
function filterImageMimetypes(req, file, cb) {
    if (imageMimetypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            ApiError.validationError([
                {
                    msg: messages.format(messages.files.unknownFileType, { type: imageMimetypes.join(', ') }),
                    param: file.fieldname,
                    location: 'file',
                },
            ]),
            false
        );
    }
};

const storage = multer.diskStorage({
    destination: 'uploads/images',
    filename: function (req, file, cb) {
        const newFileName = `${nanoid()}${path.extname(file.originalname)}`;

        cb(null, newFileName);
    },
});

const upload = multer({
    storage,
    fileFilter: filterImageMimetypes,
    limits: {
        fileSize: 10000000,
    },
});

module.exports = upload;