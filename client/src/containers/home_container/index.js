import React, {Component} from 'react'
import List from '../../components/Lists'
import './home.css'

class Home extends Component {
    render() {
        return (
            <div id={'home_wrapper'}>
                <List type={'TO-DO'}/>
                <List type={'DOING'}/>
                <List type={'DONE'}/>
            </div>
        )
    }
}

export default Home