import React, {Component} from 'react'
import List from '../../components/Lists'
import Navbar from '../navbar_container';
import './home.css'

class Home extends Component {
    render() {
        return (
            <div id={'home_wrapper'}>
                <Navbar/>
                <div id={'list_wrapper'}>
                    <List type={'TO-DO'}/>
                    <List type={'DOING'}/>
                    <List type={'DONE'}/>
                </div>
            </div>
        )
    }
}

export default Home