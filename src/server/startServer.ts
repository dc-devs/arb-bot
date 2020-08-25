import http from 'http';
import express from 'express';

const PORT = process.env.PORT || 5000;

const start = () => {
	const app = express();

	http.createServer(app).listen(PORT, () =>
		console.log(`Listening on ${PORT}`)
	);
};

export default start;
