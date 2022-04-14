const fs = require('fs');
const UPLOADS_DIR = 'uploads';

module.exports = () => {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR);
  }
};
