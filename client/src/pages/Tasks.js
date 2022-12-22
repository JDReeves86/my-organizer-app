import React from 'react'
import Auth from '../utils/auth'
import TaskForm from '../components/Forms/TaskForm'

function Tasks() {
    if (!Auth.loggedIn()) document.location.replace("/")
    return (
        <TaskForm />
    )
}

export default Tasks