import React, {useState, useEffect } from 'react'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import { Button } from '@material-ui/core';
import Showtrainings from './showtrainings';
import Editcustomer from './editcustomer';
import Addcustomer from './addcustomer';

export default function Customers() {

    const [customers, setCustomers] = useState([]);
    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))

    }

    const deleteCustomer = (link) => {
        if (window.confirm("Are you sure you want to delete the customer?")) {
            fetch(link, {
                method: "DELETE"
            })
            .then(response => getCustomers())
            .then(_ => {
                setMsg("Customer deleted!");
                setOpen(true);
            })
            .catch(err => console.error(err))
        }
    }

    const addCustomer = (customer) => {
        fetch("https://customerrest.herokuapp.com/api/customers",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(customer)
        })
        .then(response => getCustomers())
        .then(_ => {
            setMsg("New Customer Added!");
            setOpen(true)
        })
        .catch(err => console.error(err))
    }

    const editCustomer = (link, customer) => {
        fetch(link,
        {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(customer)
        })
        .then(response => getCustomers())
        .then(_ => {
            setMsg("Customer data updated!");
            setOpen(true)
        })
        .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
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
                <Showtrainings trainings={row.original} refresh={getCustomers}/>
            )
        },
        {
            Cell: row => (<Editcustomer editCustomer={editCustomer} customer={row.original}/>)
        },
        {
            accessor: "links[0].href",
            Cell: row => (
                <Button color="secondary" size="small" style={{fontWeight: "bold"}} onClick={() => deleteCustomer(row.value)}>Delete</Button>
            )
        }
    ]

    return (
        <div>
            <Addcustomer addCustomer={addCustomer}/>
            <ReactTable filterable={true} defaultPageSize={15} data={customers} columns={columns}/>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={msg}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                style={{
                    backgroundColor: "orange"
                }}
            />
        </div>
    );
}