# Intercom Excerise

## Install dependencies

- Install `node` and `npm`. 
- Install JS dependencies from npm: `npm install`.

## How to start
```
1: npm install
2: cd to root directory of project
3: npm start (will run gulp and then launch the application)
4: server located on localhost:9000
```

## Build

*TBA*

## Code Structure

- Source code for the backend is located in the `server` folder
- Routes are declared in the `index.js` file inside the root folder
- Folders are arranged by their functionality - helpers and routes and therefore in the same folder
- Front end source code in the `public` folder - includes js files, html files and scss file

## Running Tests and Script

- In order to run the test, run `npm test` from the root directory
- Provided in the codebase is also a script that will display the customers within 100km from the Dublin office in the terminal through a node commande. Simply go to `server/filter.script.js` and run the file using `node filter.script.js`

## Features

- You can change the distance filter to show the different customers within any distance range