const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const routes = require('./routes/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {app, server} = require('./socket/socket')

dotenv.config();

const port = process.env.PORT || 3001;

app.use(express.json())
app.use(cors());
routes(app);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(cookieParser());

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(`${process.env.MONGO_DB}`);
		console.log("Connected to MongoDB successfully!");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

// mongoose
//     .connect(`${process.env.MONGO_DB}`)
//     .then(() => {
//         console.log('ket noi db thanh cong');
//     })
//     .catch((err) => {
//         console.log(err);
//     });

server.listen(port, () => {
    connectToMongoDB();
    console.log('port: ', +port);
});
