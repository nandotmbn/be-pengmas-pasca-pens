import multer from 'multer';
import imageStorage from './disk-storage/image.storage';

const uploadImage = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(JPG|PNG|JPEG|SVG|png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload an correct image'));
    }
    cb(null, true);
  }
});

export { uploadImage };
