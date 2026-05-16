const express = require('express');
const passport = require('passport');
const router = express.Router();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

router.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${CLIENT_URL}/login?error=google_auth_failed`
  }),
  (req, res) => {
    const { user, token } = req.user;
    const isLocalhost = CLIENT_URL.includes('localhost');

    if (isLocalhost) {
      res.redirect(
        `${CLIENT_URL}/auth/google/success?token=${token}&userId=${user._id}`
      );
    } else {
      res.redirect(
        `${CLIENT_URL}/auth/google/success?token=${token}&userId=${user._id}`
      );
    }
  }
);

module.exports = router;
