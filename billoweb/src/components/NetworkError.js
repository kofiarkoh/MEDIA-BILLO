import React, { Component } from 'react'
import errorImg from '../images/network-error.png'
class NetworkError extends Component {
    render() {
        return (
            <div className='networkError'>
                <div>
                <img src={errorImg}/>

                </div>
                   
            </div>

        )
    }
}

export default NetworkError
