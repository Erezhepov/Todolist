import React, {useEffect, useState} from 'react';
import axios from "axios";

export interface IUser {
    id: number
    name: string
}

const Users = () => {

    const [users, setUsers] = useState<IUser[]>([])

    const loadUsers = async () => {
        const newUsers = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUsers(newUsers.data)
    }

    useEffect(() => {
        loadUsers()
    }, [users]);

    return (
        <div>
            {users.map(user => <div data-testid={'user'} key={user.id}>{user.name}</div>)}
        </div>
    );
};

export default Users;