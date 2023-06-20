/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from "multer";
import path from "path";
import {v4} from "uuid"

const documentStorage = multer.diskStorage({
	// Destination to store document
	destination: "public/documents",
	filename: (req: any, file: any, cb) => {
		const fileName =
			file.fieldname +
			"_" +
			v4() +
			path.extname(file.originalname);
		req.query.fileName = fileName;
		cb(null, fileName);
	},
});

export default documentStorage;