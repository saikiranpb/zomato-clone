import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import '../../styles/Header.css'

import Mealtype from './mealtype'

export default class main extends Component {
    constructor(){
        super();
        this.state={
            mealtypes:[]
        }
    }

    componentDidMount(){
        fetch('https://zomato-sk-edureka.herokuapp.com/mealTypes',{method:'GET'})
        .then(response=>response.json())
        .then(data=>this.setState({mealtypes:data.data}))
    }

  render() {
    console.log(this.state.mealtypes)

    const mealtypeList=this.state.mealtypes.length && this.state.mealtypes.map( m => 
         <div className="card col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-3 mx-auto text-center">
            
            <Link to={`/filter/${m.name}`}  style={{textDecoration:"none"}}><Mealtype key={m._id} item={m}/></Link>
        </div>
                                                                            
                                                                             )
    return (
        <div className='cont'>

                <div className="container mb-5 ">
                <div className="quick-searches mt-5 ms-4">Quick Searches</div>
                <div className="qs-subtitle mt-2 ms-4">Discover restaurants by type of meal</div>
                <div className="row mt-3">
                    {mealtypeList}
                
                </div>
            </div>
        </div>
    )
  }
}

