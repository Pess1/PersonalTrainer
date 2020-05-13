import React, {useState, useEffect} from 'react'
import Paper from '@material-ui/core/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';
import _ from 'lodash';
import moment from 'moment';
import Gauge from 'react-svg-gauge';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Stats() {
    const [customers, setCustomers] = useState([])
    const [trainings, setTrainings] = useState([])
    const [month, setMonth] = useState(new Date().getMonth())

    useEffect(() => {
        getTrainData();
    }, [])

    const getTrainData = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }
    
    const amountOfTrainingsThisMonth = _.sumBy((trainings.filter(t => (moment(t.date).month()) === month)), function(o) { return o.duration; })
    const amountOfTrainingsLastMonth = _.sumBy((trainings.filter(t => (moment(t.date).month()) === month - 1)), function(o) { return o.duration; })

    console.log(amountOfTrainingsThisMonth)

    const data = _(trainings).groupBy('activity').map((trainingData, key) => ({
        'activity': key,
        'duration': _.sumBy(trainingData, 'duration')
    })).value();

    return(
        <div style={{height: "100vh"}}>
            <Paper>
                <h3>All Time Training Duration</h3>
                <Chart data={data}>
                    <ArgumentAxis />
                    <ValueAxis />
                    <BarSeries valueField="duration" argumentField="activity" />
                </Chart>
            </Paper>
            <div className="container">
                <div className="row" style={{marginTop: "5vh"}}></div>
                <div className="row">
                    <div className="col" style={{padding:"10px"}}>
                        <h3>Minutes Trained This Month</h3>
                        <Gauge 
                            value={amountOfTrainingsThisMonth}
                            label=""
                            max={Math.floor(amountOfTrainingsThisMonth * 1.3)}
                            height={200}
                            width={320}
                            valueFormatter={value => `${value}min`}
                            color="#749ddb"
                            backgroundColor="#d1dbeb"
                            valueLabelStyle={{fontSize:"30px"}}
                        />
                    </div>
                    <div className="col"></div>
                    <div className="col" style={{padding:"10px"}}>
                        <h3>Minutes Trained Last Month</h3>
                        <Gauge 
                            value={amountOfTrainingsLastMonth}
                            label=""
                            max={Math.floor(amountOfTrainingsThisMonth * 1.3)}
                            height={200}
                            width={320}
                            valueFormatter={value => `${value}min`}
                            color="#749ddb"
                            backgroundColor="#d1dbeb"
                            valueLabelStyle={{fontSize:"30px"}}
                        />
                    </div>
                </div>
            </div>
            
        </div>
    )
}