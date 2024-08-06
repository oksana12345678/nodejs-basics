import multer from 'multer';
import { TEMPLATES_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, TEMPLATES_DIR);
  },
  filename: function (req, file, cd) {
    const uniqueSuffix = Date.now();
    cd(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
