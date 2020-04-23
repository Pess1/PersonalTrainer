import React, {useState, useEffect } from 'react'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Showcustomer from './showcustomer';

export default function Trainings() {

    const [trainings, setTrainings] = useState([]);
    const [customerName, setCustomerName] = useState("");

    useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))

    }

    const columns = [
        {
            Header: "Date",
            accessor: "date"
        },
        {
            Header: "Duration",
            accessor: "duration"
        },
        {
            Header: "Activity",
            accessor: "activity"
        },
        {
            Header: "Customer",
            Cell: row => (
                <Showcustomer customer={row} />
            )
        },
    ]

    return (
        <div>
            <ReactTable filterable={true} defaultPageSize={15} data={trainings} columns={columns}/>
        </div>
    );
}