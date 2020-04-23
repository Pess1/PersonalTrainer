import React, {useState, useEffect } from 'react'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Showtrainings from './showtrainings';

export default function Customers() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))

    }

    const columns = [
        {
            Header: "Firstname",
            accessor: "firstname"
        },
        {
            Header: "Lastname",
            accessor: "lastname"
        },
        {
            Header: "Address",
            accessor: "streetaddress"
        },
        {
            Header: "Postcode",
            accessor: "postcode"
        },
        {
            Header: "City",
            accessor: "city"
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Phone",
            accessor: "phone"
        },
        {
            Header: "Customer Trainings",
            Cell: row => (
                <Showtrainings trainings={row} />
            )
        }
    ]

    return (
        <div>
            <ReactTable filterable={true} defaultPageSize={15} data={customers} columns={columns}/>
        </div>
    );
}