import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';

export default function Showcustomer(props) {
    const [customer, setCustomer] = useState(
        {
            firstname: "", 
            lastname: "",
            address: "",
            postcode: "",
            city: "",
            email: "",
            phone: ""
        }
    );

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        fetch(props.customer.links[2].href)
        .then(response => response.json())
        .then(data => setCustomer(
            {
                firstname: data.firstname, 
                lastname: data.lastname,
                address: data.streetaddress,
                postcode: data.postcode,
                city: data.city,
                email: data.email,
                phone: data.phone
            }
        ))
        .catch(err => console.error(err))
    };

    return (
        <div style={{paddingLeft: "22vw", backgroundColor: "#d1d1d1", color: "black"}}>
            <table>
                <tr>
                    <td style={{paddingRight: "5vw"}}>Name: {customer.firstname} {customer.lastname}</td>
                    <td style={{paddingRight: "5vw"}}>Address: {customer.address}, {customer.postcode}, {customer.city}</td>
                    <td style={{paddingRight: "5vw"}}>Contact: {customer.email} {customer.phone}</td>
                </tr>
            </table>
        </div> 
    )


}