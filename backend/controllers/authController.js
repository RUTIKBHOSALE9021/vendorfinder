const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { createUser, findUserByEmail } = require("../models/userModel");
require("dotenv").config();

// Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {

        // Check if user exists
        let user = await findUserByEmail(profile.emails[0].value);
        
        if (!user) {
          console.log("Creating new user from Google profile");
          // Create new user if doesn't exist
          user = await createUser(
            profile.displayName,
            profile.emails[0].value,
            null // No password for Google users
          );
          console.log("New user created:", user);
        } else {
          console.log("Existing user found:", user);
        }

        return done(null, user);
      } catch (error) {
        console.error("Error in Google Strategy:", error);
        return done(error, null);
      }
    }
  )
);

const signup = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    // Check if user exists
    if (await findUserByEmail(email)) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user to DB
    const user = await createUser(full_name, email, hashedPassword);

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check if this is a Google user
    if (user.password_hash === 'GOOGLE_AUTH_USER') {
      return res.status(400).json({ error: "Please use Google Sign-In for this account" });
    }

    if (!(await bcrypt.compare(password, user.password_hash))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: 'select_account',
  access_type: 'online'
});

const googleCallback = (req, res) => {
  passport.authenticate("google", async (err, user) => {
    if (err) {
      console.error("Google Auth Error:", err);
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=${encodeURIComponent(err.message)}`);
    }

    if (!user) {
      console.error("No user found after Google authentication");
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=User not found`);
    }

    try {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Redirect to frontend with token and user data
      res.redirect(
        `${process.env.FRONTEND_URL}/auth/callback?token=${token}&id=${user.id}&name=${encodeURIComponent(user.full_name)}&email=${encodeURIComponent(user.email)}`
      );
    } catch (error) {
      console.error("Token generation error:", error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=Token generation failed`);
    }
  })(req, res);
};

module.exports = { signup, login, googleAuth, googleCallback };
