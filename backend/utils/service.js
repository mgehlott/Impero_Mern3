const fs = require('fs');
const path = require('path');
exports.deleteImage = (image) => {
  console.log(image);
  const filePath = path.join(__baseurl, 'public', 'images', image);
  console.log(filePath);
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
    console.log('image deleted');
  });
};
