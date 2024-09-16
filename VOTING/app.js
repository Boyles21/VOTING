const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let votes = []; // Store votes, replace with DB later

// Endpoint to verify payment from Paystack
app.post('/verify-payment', async (req, res) => {
    const { reference } = req.body;

    // Verify transaction with Paystack
    try {
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer your-secret-key-here` // Replace with your Paystack secret key
            }
        });

        const data = response.data;
        if (data.status === true && data.data.status === 'success') {
            return res.status(200).json({ message: 'Payment verified', data: data.data });
        } else {
            return res.status(400).json({ message: 'Payment verification failed' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error verifying payment', error: error.message });
    }
});

// Endpoint to submit vote
app.post('/submit-vote', (req, res) => {
    const { candidate } = req.body;

    if (!candidate) {
        return res.status(400).send('Candidate is required.');
    }

    // Store vote (replace with database logic)
    votes.push({ candidate });

    res.status(200).send('Vote submitted.');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
