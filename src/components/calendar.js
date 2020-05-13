import React, {useState, useEffect} from 'react'
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  WeekView,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
  ViewSwitcher
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';

export default function TrainingCalendar() {

    const [trainings, setTrainings] = useState([]);
    const currentDate = new Date();

    useEffect(() => {
        getTrainingsForCalendar();
    }, [])

    const getTrainingsForCalendar = () => {
        
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))

    }

    const data = trainings.map(event => (
        {
            startDate: moment(event.date).toDate(),
            endDate: moment(event.date).add(event.duration, "minutes").toDate(),
            title: event.activity + ", " + event.customer.firstname + " " + event.customer.lastname
        }
    ))

    return(
        <div>
            <Paper>
                <Scheduler
                    data={data}
                >
                    <ViewState
                        defaultCurrentDate={currentDate}
                    />
                    <MonthView />
                    <WeekView />
                    <DayView />
                    <Toolbar />
                    <DateNavigator />
                    <ViewSwitcher />
                    <TodayButton />
                    <Appointments />
                </Scheduler> 
            </Paper>
        </div>
    )
}