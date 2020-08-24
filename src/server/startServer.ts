import http from 'http';
import dotenv from 'dotenv';
import express from 'express';

const PORT = process.env.PORT || 5000;

const start = () => {
	dotenv.config();

	const app = express();

	http.createServer(app).listen(PORT, () =>
		console.log(`Listening on ${PORT}`)
	);
};

export default start;
