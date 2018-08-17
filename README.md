# Petal Javascript Exercise

## Tech Pre-requirements:
You’ll need to have Node >= 6 on your local development machine

## Overview

We’ve provided a React starter app (if you would like to use a different framework or no framework, feel free to do so outside of this repo), and you may use any additional libraries/tools you'd like (or none at all)) to meet the project requirements. Please upload your project (a zipped folder) in Headlight.

This project is meant to simulate multiple "connections" that are updating in
real-time, such as if you are importing data from several banks at once. A "connection" is just a
representation of an `id`, a `status` (such as 'importing', 'connected' meaning the a successfully
finished connection), and `progress` for how close to done (such as '0.5' for halfway done) a
connection is.

In `App.js`, you are given a list of connections and possible statuses, and below are the requirements
for how to show this in the UI over time.

### Application Requirements
1. Display the list of un-started connection ids, and render a 'Start' button.
2. When the ‘Start’ button is clicked, each connection's progress should be visually represented (for example, as a growing progress bar) along with the text of their connection status (for example 'loading'), and the 'Start button' should change to be an un-clickable 'Running...' button.
3. As they complete, their final status text (‘connected’) is displayed, and they are moved to the bottom of the list. In-progress connections should be above finished connections. The final list should have the
first connections to finish at the bottom.
4. At any given point in time, there should be a count displayed of each connection by status. At the top of the page, there should be text of this format, but changed when tests status changes:

disconnected: 2

loading: 3

connecting: 5

etc...


6. When all tests have completed, display a 'Re-run' button that starts the tests over again.

Bonus:
When tests are running, show a 'Cancel' button that resets the tests to their initial state.

### Notes

Visual styling skills will not be assessed, beyond anything meeting requirements.

## Steps to start

Install the dependencies:

`npm i`

Start the build:

`npm start`
