require('dotenv');

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
const charge = await stripe.charges.create({
    amount: 2000, // amount in cents
    currency: 'usd',
    source: token.id, // token from frontend
    description: 'Charge for test@example.com',
  });