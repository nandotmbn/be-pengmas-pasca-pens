import multer from 'multer';
import documentStorage from './disk-storage/document.storage';

const uploadDocument = multer({
  storage: documentStorage,
  limits: {
    fileSize: 10000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|pdf|docx)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a document'));
    }
    cb(null, true);
  }
});

export { uploadDocument };
