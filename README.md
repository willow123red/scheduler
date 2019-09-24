# Interview Scheduler

React application that allows users to book, cancel and edit 1-hour interview appointments. Users can select the day of the week from a navigation menu, create a new appointment, enter the client name and select an interviewer from a list of available interviewers for that day. The user can also see how many appointment spots are available on any given day.

## Tech Specs

*  React
*  Webpack, Babel
*  Axios, WebSockets
*  Axios
*  Storybook, Webpack Dev Server, Jest, Testing Library

The Scheduler client application is created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

To run this application locally, it is necessary to clone & install the api server. The repository & instructions are located [here](https://github.com/willow123red/scheduler-api).

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

npm start

## Running Jest Test Framework

npm test

## Running Storybook Visual Testbed

npm run storybook

## Behavioral Requirements

*  Interviews can be booked between Monday and Friday.
*  A user can switch between weekdays.
*  A user can book an interview in an empty appointment slot.
*  Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
*  A user can cancel an existing interview.
*  A user can edit the details of an existing interview.
*  The list of days informs the user how many slots are available for each day.
*  The expected day updates the number of spots available when an interview is booked or canceled.
*  A user is presented with a confirmation when they attempt to cancel an interview.
*  A user is shown an error if an interview cannot be saved or deleted.
*  A user is shown a status indicator while asynchronous operations are in progress.
*  When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
*  The application makes API requests to load and persist data. We do not lose data after a browser refresh.
*  Technical Specification

## Dev Dependencies

    "@babel/core": "^7.4.3",
    "@storybook/addon-actions": "^5.0.10",
    "@storybook/addon-backgrounds": "^5.0.10",
    "@storybook/addon-links": "^5.0.10",
    "@storybook/addons": "^5.0.10",
    "@storybook/react": "^5.0.10",
    "@testing-library/jest-dom": "^4.0.0",
    "@testing-library/react": "^8.0.7",
    "@testing-library/react-hooks": "^2.0.1",
    "babel-loader": "^8.0.5",
    "node-sass": "^4.11.0",
    "prop-types": "^15.7.2",
    "react-test-renderer": "^16.9.0"