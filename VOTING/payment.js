document.getElementById('paystack-payment').addEventListener('click', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!name || !email) {
        alert('Please enter your name and email');
        return;
    }

    // Paystack inline payment
    let handler = PaystackPop.setup({
        key: 'your-public-key-here', // Replace with your Paystack public key
        email: email,
        amount: 50000, // Amount in kobo (50000 kobo = 500 NGN)
        currency: 'NGN', // Can be changed based on your country
        ref: 'vote_' + Math.floor((Math.random() * 1000000000) + 1), // Generate a random transaction reference
        metadata: {
            custom_fields: [
                {
                    display_name: "Full Name",
                    variable_name: "full_name",
                    value: name
                }
            ]
        },
        callback: function(response) {
            // Payment successful, show the voting section
            alert('Payment complete! Transaction reference: ' + response.reference);
            document.getElementById('registration-form').classList.add('hidden');
            document.getElementById('voting-section').classList.remove('hidden');
        },
        onClose: function() {
            alert('Payment canceled');
        }
    });

    handler.openIframe();
});

document.getElementById('voting-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const candidate = document.getElementById('candidate').value;

    // Submit vote
    const response = await fetch('/submit-vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate })
    });

    if (response.ok) {
        alert('Your vote has been successfully submitted!');
    } else {
        alert('Error submitting vote. Try again.');
    }
});
