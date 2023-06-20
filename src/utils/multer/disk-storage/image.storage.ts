/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from "multer";
import path from "path";
import {v4} from "uuid"

const imageStorage = multer.diskStorage({
	// Destination to store image
	destination: "public/images",
	filename: (req: any, file: Express.Multer.File, cb) => {
		const fileName =
			file.fieldname +
			"_" +
			v4() +
			path.extname(file.originalname);
		req.query.fileName = fileName;
		cb(null, fileName);
	},
});

export default imageStorage;