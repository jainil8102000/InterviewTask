import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Link, Switch, Navigate } from "react-router-dom";
import UserDetails from '../UserDetails/UserDetails';
const WebContext = createContext();

export default function UserList() {

    const [userlist, setUserList] = useState([]);
    const [singleUserData, SetSingleUserData] = useState([]);

    useEffect(() => {
        axios.get('https://dummyjson.com/users')
            .then((res) => {
                setUserList(res.data.users);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    function SearchFunctionality(e) {
        let value = e.target.value;
        console.log(e.target.value)
        const filteredData = userlist.filter((users, index) => {
            return users.firstName.toLowerCase().includes(value) || users.lastName.toLowerCase().includes(value) || users.email.toLowerCase().includes(value) || users.bloodGroup.toLowerCase().includes(value);
        });
        setUserList(filteredData)
    }

    const ViewDetails = (e, users, index) => {

        console.log(index)
        const filteredData = singleUserData.filter((item, i) => {
            console.log("itemIDD", item.id)
            console.log("index", index)

            return item.id.toString().includes(index);
        });


        if (filteredData.length <= 0) {
            axios.get(`https://dummyjson.com/users/${index}`)
                .then((res) => {
                    console.log(res.data)
                    singleUserData.push(res.data);
                    console.log(singleUserData);

                })
                .catch((err) => {
                    console.log(err);
                })
        }


        console.log(singleUserData);
        return false;





    }

    return (
        <>

            <WebContext.Provider value={singleUserData}>
                <UserDetails />
            </WebContext.Provider>
            <div className='container my-5'>
                <div className='search-area pb-4'>
                    <input type="search" className='form-control' onChange={SearchFunctionality} placeholder='Search here...' />
                </div>
                <div className='user-list-table'>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">User ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Age</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Blood Group</th>
                                <th scope="col">User Details</th>
                            </tr>
                        </thead>
                        <tbody>

                            {userlist.map((users, index) => {
                                return (
                                    <tr key={users.id}>
                                        <th scope="row">{users.id}</th>
                                        <td>{users.firstName} {users.lastName}</td>
                                        <td>{users.email}</td>
                                        <td>{users.age}</td>
                                        <td>{users.gender}</td>
                                        <td>{users.bloodGroup}</td>
                                        {/* <td><Link to={`/user-details/${users.id}`}>View Details</Link></td> */}
                                        <td><a onClick={(e) => ViewDetails(e, users, users.id)} >View Details</a></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}
export { WebContext }