# Lapor Diri Web App 📘🖊️

## 🤔 What is This?

A self-report web app (lapor diri is Indonesian for self-report) for Indonesians living in Germany (e.g: School, work, etc) to self-report their arrival to the Indonesian Embassy. **I am volunteering for the Embassy of the Republic of Indonesia in Berlin in creating this service.**

**This Web App (prototype) is live on:** https://quiet-cliffs-84098.herokuapp.com/

**A simple diagram of this web app's architecture can be found here:**

1. https://drive.google.com/file/d/1EAoLE_4ikoLBEwSdnODOtp0ojOjjRTjp/view?usp=sharing (png), or
2. https://drive.google.com/file/d/1WHwueMlizgpRZP98JxM-E1h_MEu1zfW5/view?usp=sharing (pdf)

**Table of Contents:**

1. <a href="#backend">Backend 📡 </a>
2. <a href="#frontend">Frontend 📱 </a>
3. <a href="#run">How to run this on a local machine: </a>
   1. <a href="#run-api">Backend 🏡 📡</a>
   2. <a href="#run-frontend">Frontend 🏡 📱</a>

<span id="backend"></span>

## 📡 Backend

### Authentication Strategy

⭐ This web allows its users to create an account, and also to sign in.

⭐ It uses the JWT, which expires every 15 minutes.

⭐ If the JWT included for a request to a protected route is expired, then it will simply "refreshes" the JWT, and new token will be generated. This happens really quickly and won't be noticable by the user.

⭐ More information on the auth method <a href="#authMethod">here.</a>

### REST API Server

⭐ This web app mainly uses REST API for backend-frontend interaction.

⭐ Its REST API services & server are built using NodeJS (Express).

⭐ This web app's REST API services & server are built using NodeJS (Express)

### Database

⭐ This web app usesa a non-relational database called MongoDB (<a href="https://cloud.mongodb.com" target="_blank">cloud.mongodb.com</a>) as its database for storing non-file data.

⭐ This NodeJS app (the backend system) uses an ORM to communicate to the database.

## 📱 Frontend

### Frontend JS Framework

⭐ This web app uses React for its main view "framework".

⭐ React version is 16.3, which regularly makes use of hooks and functional components.

⭐ React used for building (rendering of, state management of, etc) the UI, and making requests to the REST API (using axios).

### CSS Styling

⭐ This web app uses Bootstrap 4 CSS frontend framework, which was rebuilt for react called: <a href="https://react-bootstrap.github.io/" target="blank">React-Bootstrap</a>

⭐ For further styling of these Bootstrap components, <a href="https://styled-components.com/" target="_blank">styled components</a> is used.

### File system / storing

⭐ This web app allows its users to upload and store files.

⭐ These files are stored on <a href="https://firebase.google.com/docs/storage" target="_blank">Firebase Cloud Storage</a>, and uploaded **straight** from the client / frontend, thus it falls under the **frontend** section.

<span id="run"></span>

## Before You Run

⭐ Make sure to have `npm` (node package manager) installed and updated.

⭐ This repo consists of a backend directory, which is the `root` directory (this directory), and a frontend directory, that is under the `./client/` directory.

⭐ All commands should be run inside the `root` directory for backend, and `./client/` directory for frontend.

⭐ After every `pull` (or the initial `clone` / download) to this repo, please run `npm install` in both directories (just in case some new modules have been added), this is to make sure you have everything installed.

<span id="run-api"></span>

## 🚀 📡 Running the REST API (backend) Server

⭐ Make sure to read <a href="run">before you run</a> section before actually attempting the below.

⭐ Run `npm run start` to run the **REST API SERVER**.

⭐ Default hostname is `localhost`.

⭐ Default port is `5000`

<span id="run-frontend"></span>

## 🚀📱 Running the Frontend Server

⭐ Make sure to read <a href="run">before you run</a> section before actually attempting the below.

⭐ Run `npm run start` to run the **REST API SERVER**.

⭐ Default hostname is `localhost`.

⭐ Default port is `5000`

<span id="authMethod"></span>

## More about Authentication

User signs up by hitting the `/api/user/` (POST) endpoint. User is automatically authenticated (signed in) after this - OR - User signs in by hitting the `/api/auth/` (POST) endpoint. This returns (jwt) `token` and `userId`. Store these two in `localStorage`.

The reason for saving `userId` is because it is used on very few endpoints that does not require a fresh (not-expired) `token`. Read more on <a href="#authFlow">authentication flow</a>.

Following the best practices of JWT authentication method, the access token (what is saved locally in the frontend) has a short expiration time (15 minutes).

For testing/development purposes you may modify this expiration time to a different value - for seconds just put integer. E.g: 30 (this is 30 seconds).

To modify it, please modify the `expiresIn` property in `./routes/utilsgenerateAccessToken.js` file.

### <span id="authFlow">Authentication Flow</span>

When a token has expired and we created a request to an endpoint that requires a token (a private endpoint), this token will no longer be valid and `{msg: token_expired}` will be returned.

What is reccomended is to check any error. If error is equal to `jwt expired`, then hit the `/auth/refresh_token`. This will return the new `{token: "sometoken"}` (that will, again, in default expire in 15 minutes). Replace the old (expired) `token` on your frontend with this newly returned `token`.

After that, try to hit the endpoint that previously failed due to `jwt expired`. This time it should succeed.

On sign out, you should hit the sign out endpoint `/auth/logout/:userId` and then remove the `userId` and `token` that was saved locally in your application / client's device.
