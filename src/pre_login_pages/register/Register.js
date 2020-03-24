import React, { Component } from 'react'

import RegisterForm from './RegisterForm.js'

class Register extends Component {
    render() {
        return (
            <div class="container">
                <div class="row h-100 justify-content-center align-content-center">
                    <div class="col-12 col-sm-11 col-md-11 col-lg-10 col-xl-10">
                        <h1>Register</h1>
                        <RegisterForm></RegisterForm>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register