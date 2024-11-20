import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [formData, setFormData] = useState({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        department: '',
    });

    const [userList, setUserList] = useState([]); // Store the fetched data
    const [editingId, setEditingId] = useState(null); // Track the ID of the user being edited
    const [editData, setEditData] = useState({}); // Track the editing data

    // Fetch data when the component mounts
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://api.example.com/users'); 
                const data = await response.json();
                setUserList(data); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    // Handle input changes for adding a new user
    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // Add a new user
    async function addUser() {
        if (
            !formData.id ||
            !formData.firstname ||
            !formData.lastname ||
            !formData.email ||
            !formData.department
        ) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newUser = await response.json();
                setUserList([...userList, newUser]); 
                setFormData({
                    id: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    department: '',
                }); 
            } else {
                console.error('Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }

    // Delete a user
    async function deleteUser(id) {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, { 
                method: 'DELETE',
            });

            if (response.ok) {
                setUserList(userList.filter(user => user.id !== id));
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    // Start editing a user
    function startEditing(user) {
        setEditingId(user.id); 
        setEditData({ ...user }); 
    }

    // Handle input changes for editing
    function handleEditInputChange(e) {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    }

    // Save the edited user
    async function saveEdit(id) {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, { // Replace with your API URL
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUserList(
                    userList.map(user => (user.id === id ? updatedUser : user)) // Update the user in the state
                );
                setEditingId(null); // Clear editing state
            } else {
                console.error('Failed to save changes');
            }
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    }

    return (
        <>
       
        <div className="container">
        <h3 className="text-center">User Details Management</h3>
            <div className="row ">
                {['id', 'firstname', 'lastname', 'email', 'department'].map(field => (
                    <div className="col-md-4" key={field}>
                        <input
                            className="form-control"
                            type="text"
                            name={field}
                            placeholder={`Enter ${field}`}
                            value={formData[field]}
                            onChange={handleInputChange}
                        />
                    </div>
                ))}
                <div className="col-md-12 text-center">
                    <button onClick={addUser} className="btn">
                        Add User
                    </button>
                </div>
            </div>
            <ul className="list-group">
                {userList.map(user => (
                    <li
                        key={user.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        {editingId === user.id ? (
                            <div className="w-100">
                                {['firstname', 'lastname', 'email', 'department'].map(field => (
                                    <input
                                        key={field}
                                        className="form-control form-control1"
                                        type="text"
                                        name={field}
                                        value={editData[field]}
                                        onChange={handleEditInputChange}
                                    />
                                ))}
                                <button
                                    onClick={() => saveEdit(user.id)}
                                    className="btn btn2"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditingId(null)}
                                    className="btn btn3"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex justify-content-between w-100 align-items-center">
                                <p className="list-item">
                                    <strong>ID:</strong> {user.id} | <strong>Name:</strong>{' '}
                                    {user.firstname} {user.lastname} | <strong>Email:</strong>{' '}
                                    {user.email} | <strong>Department:</strong> {user.department}
                                </p>
                                <div>
                                    <button
                                        onClick={() => startEditing(user)}
                                        className="btn edit-btn"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="btn delete-btn"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default App;
