import axios from "axios";
import { useEffect, useState } from "react";
import UserTitleCard from "../../components/UserTitleCard/UserTitleCard";
import { User } from "../../modal/User";
import { Link } from "react-router-dom";

const CrudListPage = () => {
    // make use of useEffect to fetch the data from server using axios
    let [users, setUsers] = useState<User[]>([]);

    console.log("1. Rendering started");

    useEffect (() => {
        console.log("3. Fetching started...`");
        axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
            console.log(response.data);
            setUsers(response.data);
        }).catch((e) => {
            console.log(e);
        }).finally(() => {
            console.log('4. Fetching successful');
        });
    }, []);

    console.log("2. Rendering finished!");
    
    
    return (
        <div>
            <h3 className="text-center">Users</h3>
            <Link to='/crud/add' className="ps-5">
                <button className="btn btn-primary">Add User</button>
            </Link>
            <ul>
                <div className="container-fluid">
                    <div className="row">
                        {users.map((u) => (
                            <div key={u.id} className="col-lg-4 col-md-6 col-sm-12">
                                    <UserTitleCard user={u}/>
                            </div>
                        ))}
                    </div>
                </div>
            </ul>
        </div>
    )
}

export default CrudListPage
