const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: "6c1d035956ff8ec5e4b8",
      clientSecret: "dd7e841192b1ae67feea20092ab919a82e19dd2d",
      callbackURL: "https://pushbox.glitch.me/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, { name: profile.username, id: profile.id });
    }
  )
);
