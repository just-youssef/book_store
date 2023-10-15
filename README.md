# Book Store
Helps you to find your book!

## How to run?
1. Make sure you have [NodeJS](https://nodejs.org/en) installed.
2. Don't forget to setup your [Kinde](https://kinde.com/) auth service setting.
2. Don't forget to setup your [MongoDB](https://www.mongodb.com/atlas) cluster setting.
4. Make sure you added your <code>.env.local</code> file. <br/>
  It should contain the following environment variables.
    * <code>KINDE_CLIENT_ID</code>
    * <code>KINDE_CLIENT_SECRET</code>
    * <code>KINDE_ISSUER_URL</code>
    * <code>KINDE_SITE_URL</code>
    * <code>KINDE_POST_LOGOUT_REDIRECT_URL</code>
    * <code>KINDE_POST_LOGIN_REDIRECT_URL</code>
    * <code>MONGODB_URI</code>
5. Open cmd in <code>book_store</code> dir.
6. Run <code>npm i</code>
7. Run <code>npm run dev</code>
