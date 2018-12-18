## Description

This React app has been built as part of the online React Course **React 16 - The Complete Guide** by **Maximilian Schwarzmüller**.

Note that I have coded along with the instructions: it is a pure copy of the 'Burger Builder' project in session 8 of the course.

*I have learned how to:*

### Section 8 - React project set-up

- Plan the structure of a React App: layout, component structure and state management
- Decide to implement stateful or stateless components and where to use state and props
- Use different components and media-queries in CSS files to account for mobile and desktop version
- Implement methods and use these in other components via props
- Implement click handlers
- Use JSX
- Decide for a function syntax (i.e. arrow functions or not) according to a method's implementation
- Use CSS Modules (i.e. scope the CSS files to specific Components)
- Implement navigational components (like a Toolbar, and a SideDrawer for mobile)
- Implement higher-order components
- Implement images into the project
- ETC.

### Section 10 - Connect to back-end (firebase)

- Create a Firebase Project
- Create an Axios instance
- Send a POST request to the firebase database
- Retrieve data from the backend (the firebase database) and use it in the state
- Use Interceptors

### Section 12 - Routing

- Set up Routing & Routes with the react-router-dom package
- Implement components from react-router-dom such as:
  - BrowserRouter, Route, Link, NavLink, withRouter
- Inject the special History, Location and Match properties with the withRouter component
- Use methods on the history prop (such as .push, .goBack(), .replace('/'))
- Pass on and extract data from and to the URL via QueryParams, URLSearchParams and encodeURIComponent.

### Section 13 - Form and form validation

- Create a custom dynamic input component
- Dynamically create inputs based on JS config
- Handle user input, dropdown components, and form submission
- Add form validation and form validation feedback to user

### Section 15 - Redux

- Set up Redux
- Manage state through Redux
- Decide whether to use the local state or Redux state
- Use mapStateToProps and mapDispatchToProps

### Section 17 - Redux advanced
- Handle async code with action creators
- Apply middleware (thunk)
- Refactor reducers

### Section 18 - Authentication
- Get a token from the backend (Firebase)
- How to store the token 
- Log users in and out
- Map orders to a given user
- Redirect the user when he visits unauthorized pages (guarded routes)
- Redirect the user to a log-in form after creating a burger according to log-in (authorization) status
- Use Local Storage to keep user logged in

### Section 20 - Testing
- Think about tests: what to test and what not to test with React and Redux
- Use the test Runner **Jest** (e.g. applying the *expect()* method)
- Use the test utility **Enzyme** to simulate mounting react app components and dig into the DOM (e.g. applying the *.find()* and *.contains()* method)
- Do some simple unit testing with methods like *.toEqual* and *.toHaveLength*

### Section 21 - Deploying (to Firebase)

- Deployed app: https://react-marleins-burger.firebaseapp.com