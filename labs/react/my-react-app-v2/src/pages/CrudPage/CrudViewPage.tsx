import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { User } from "../../modal/User";

const CrudViewPage = () => {
  const { id } = useParams();

  let [user, setUser] = useState<User | null>(null);
  
  console.log("1. Rendering started");

  useEffect (() => {
      console.log("3. Fetching started...`");
      axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        const selectedUser = response.data.find((user: User) => user.id === parseInt(id || '0'));
        
        if (selectedUser) {
          setUser(selectedUser);  // Set the selected user data
        }
      }).catch((e) => {
          console.log(e);
      }).finally(() => {
          console.log('4. Fetching successful');
      });
  }, [id]);

  console.log("2. Rendering finished!");

  if (!user) {
    return <div>Loading or User not found...</div>;
  }

  return (
    <div className="text-center ps-5 pe-5">
        <h3 className="mb-4">View User</h3>

        <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Field</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Name</strong></td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td><strong>Username</strong></td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td><strong>Email</strong></td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td><strong>Phone</strong></td>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <td><strong>Website</strong></td>
            <td>{user.website}</td>
          </tr>
          <tr>
            <td><strong>City</strong></td>
            <td>{user.address.city}</td>
          </tr>
          <tr>
            <td><strong>Zipcode</strong></td>
            <td>{user.address.zipcode}</td>
          </tr>
          <tr>
            <td><strong>Company</strong></td>
            <td>{user.company.name} ({user.company.bs})</td>
          </tr>
        </tbody>
      </table>
      
      <div className="container-fluid">
        <div className="row justify-content-end">
          <div className="col-auto">
            <Link to={`/crud/${id}/edit`}>
              <button className="btn btn-primary">Edit</button>
            </Link>
          </div>
          <div className="col-auto ml-2">
            <Link to={`/crud/${id}/delete`}>
              <button className="btn btn-danger">Delete</button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CrudViewPage

