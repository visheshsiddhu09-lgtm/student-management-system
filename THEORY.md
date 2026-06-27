# Student Management System - Theory Questions

1. What difficulty can appear when validating form input in React?

   Answer: Form validation requires checking every field before submission and providing user feedback when fields are empty. In this app, `useState` stores each input field and conditional rendering shows an error message if any required field is missing.

2. How can managing state updates be challenging when handling a list of records?

   Answer: Updating arrays in React state must be done immutably. This means creating a new array with spread syntax when adding a record and using `filter` to remove an item, instead of modifying the original array directly.

3. Why is passing props between components important in this project?

   Answer: Props allow the parent `App` component to pass student data and actions to child components like `StudentForm`, `StudentList`, and `StudentRow`. This keeps the UI modular and helps separate state management from presentation.
