const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/form', (req, res) => {
	nodemailer.createTestAccount((err, account) => {
		const htmlEmail = `
			<h3>Contact Details</h3>
			<ul>
				<li>Name: ${req.body.name}</li>
				<li>Email: ${req.body.email}</li>
			</ul>
			<h4>Message</h4>
			<p>${req.body.message}</p>
		`

		const transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
	        port: 587,
	        auth: {
	        	user: 'fiphf4qpxq4kcm43@ethereal.email',
	        	pass: 'KkjYxDT6dC334FF6Wu'
	        }
		})

		const mailOptions = {
			form: 'test@testaccount.com',
			to: 'fiphf4qpxq4kcm43@ethereal.email',
			replyTo: 'test@testaccount.com',
			subject: 'New message',
			text: req.body.message,
			html: htmlEmail
		}

		transporter.sendMail(mailOptions, (err, info) => {
			if(err) {
				return console.log(err)
			} else {
				console.log('message sent %s', info.messageId)
				console.log('message url %s', nodemailer.getTestMessageUrl(info));
			}
		})
	})
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
})