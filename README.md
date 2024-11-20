User Management App
This is a React.js application for managing user data with CRUD functionality (Create, Read, Update, Delete).
The app integrates with an API to fetch, add, edit, and delete user information.
It is designed to demonstrate React concepts, including state management, lifecycle methods, and API calls.

Features
View Users:
Fetches user data from the API and displays it in a list.
Add User:
Allows the addition of a new user with the following fields: ID, First Name, Last Name, Email, and Department.
Edit User:
Edit existing user details in an inline editing form.
Delete User:
Remove a user from the list and the backend.
Dynamic Validation:
Ensures all fields are filled in before submission.
Technologies Used
Frontend: React.js, HTML, CSS
Backend: JSON Server (Mock API)
Prerequisites
Node.js: Ensure Node.js is installed. Download it from Node.js official website.
npm: Comes with Node.js.
JSON Server: Install globally for a mock backend:
bash
Copy code
npm install -g json-server
Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/your-username/your-repository.git
cd your-repository
Install Dependencies:

bash
Copy code
npm install
Start the JSON Server: Ensure your db.json file contains user data. Start the server:

bash
Copy code
json-server --watch db.json --port 3001
Start the React App: Open a new terminal and run:

bash
Copy code
npm start
Open the app in your browser at http://localhost:3000.

API Endpoints
Base URL: http://localhost:3001/users
HTTP Method	Endpoint	Description
GET	/users	Fetch all users
POST	/users	Add a new user
PUT	/users/:id	Update a user
DELETE	/users/:id	Delete a user

How to Use
Adding a User:

Fill out the form fields at the top of the app.
Click Add User to add the user to the list.
Editing a User:

Click Edit next to a user entry.
Update the fields in the inline editor and click Save or Cancel.
Deleting a User:

Click the Delete button next to a user entry to remove the user.

Sample Data for db.json
Here’s a sample db.json file for the JSON Server:

json
Copy code
{
  "users": [
    {
      "id": 1,
      "firstname": "Jahshwanth",
      "lastname": "chennoori",
      "email": "jashwanth@gmail.com",
      "department": "Engineering"
    },
    {
      "id": 2,
      "firstname": "kranthi",
      "lastname": "chennoori",
      "email": "kranthi@gmail.com",
      "department": "Marketing"
    }
  ]
}
