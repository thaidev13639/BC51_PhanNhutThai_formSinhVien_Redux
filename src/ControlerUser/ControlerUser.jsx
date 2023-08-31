import React, { Component } from 'react';
import FormStudent from './FormStudent';
import InfornationBoard from './InfornationBoard';

export default class ControlerUser extends Component {
    render() {
        return (
            <div className="w-75 mx-auto mt-5">
                
                <FormStudent/>
                
                <InfornationBoard/>
            </div>
        );
    }
}