export default function ({
	statusCode,
	data,
	message,
}: MessageInterface): MessageInterface {
	return {
		statusCode,
		data,
		message,
	};
}
