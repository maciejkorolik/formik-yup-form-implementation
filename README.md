# Hotree form implementation
> Author: **Maciej Korolik**

## Project setup
The project requires **node.js** installed.
To install all packages, go to main project directory and run:
### `npm install`
To run the project with development server, run this in main directory: (this command will run the project on **localhost:3000**)
### `npm start`
 <br>

To build the app for production, run:
### `npm run build`

## Project overview

![Screenshot](readme-media/screenshot.jpg)

### **Most important features of the project:**

* **Framework**  - [React.js](https://reactjs.org/) with standard create-react-app,
* **Styling** - [styled-components](https://www.styled-components.com/) were used for styling the app. Most common style values are stored in main theme and they are used across all components. Fonts are installed via npm with [typefaces](https://github.com/KyleAMathews/typefaces). The app is fully responsible.
* **Routing** - although the project now consists of only 2 views, if it was implemented in the full app, it would probably use router, so I decided to already implement it.
* **Form** - the form, which is the main function of the project was created using [Formik](https://jaredpalmer.com/formik/). Most of the functionality of it is inside FormView component. Formik handles form data, errors, conditional rendering of error messages, etc. All input components are native HTML inputs, customized to match the app look.
* **Validation** - for data validation I used [Yup](https://github.com/jquense/yup), which can be easily connected to the form made with Formik. Schema is stored in the separate file, it consists of some default Yup tests, as well as some custom validation needed for this specific form.

  <br>

During development, [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/) were used with [airbnb](https://www.npmjs.com/package/eslint-config-airbnb) config. To ensure that every commit is properly formatted and free of errors, [Husky](https://github.com/typicode/husky) was implemented with pre-commit hook.

