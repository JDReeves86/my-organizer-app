import { gql } from '@apollo/client'

export const GET_MY_TASKS = gql`
    query getMyTasks {
        getMyTasks {
            tasks {
                _id
                taskText
                dueDate
            }
        }
    }
`