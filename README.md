# The Time Tracker
## An app to help you find where your time goes, and (hopefully) be able to plan better in the future.

[CLICK HERE TO SEE THE DEMO](https://sams-time-tracker.herokuapp.com)

## Getting Started
To run this app as is on your local machine, simply... 
1. Install the dependencies with `npm i` while in the project dir
2. Run `npm build` to compile the Production React App
3. Run `npm run production-start` to start the server!

## App Overview
This App uses... 
1. React to power it's UI, 
2. Redux to manage it's state, 
3. Express to host it's API (as well as the production react app),
4. PostgreSQL to store it's data,
5. and Heroku to host the demo.


## Developing
If you are looking to get a development setup running you will need nodemon installed. Once you have that it should be as simple as...
1. In you project dir, run `npm run start-server` to start your backend API on port 5000
2. In another terminal (also in your project dir) run `npm start` to start up te react dev environment on port 3000. 

Now, you can make updates to your react App and view them instantly at port 3000. This react app will be set up to use the API on port 5000 which (thanks to nodemon) automatically refreshes when you make changes to your server files. 


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run start-server`

Runs the server hosting the latest build of you're react App as well as the latest save of your server (thanks nodemon) on port 5000.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The server will reload if you make edits.\
You can use this with another terminal running `npm start` to see updates as you save on port 3000.

### `npm run production-start`

Runs the server hosting the latest build of you're react App on port 5000.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

You will have to exit and restart to see edits to your server
You will have to rebuild to see edits to your react app


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
