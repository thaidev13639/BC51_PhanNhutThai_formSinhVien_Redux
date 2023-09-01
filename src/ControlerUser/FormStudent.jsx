import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { addStudent, updateStudent } from '../Store/actionReducer/actionReducer'

class FormStudent extends Component {
    state = {
        id: "",
        fullName: "",
        class: "",
        phone: "",
        email: "",
        type: "None",
    }

    errorID = createRef()
    errorfullName = createRef()
    errorClass = createRef()
    errorPhone = createRef()
    errorEmail = createRef()
    errorType = createRef()

    static getDerivedStateFromProps(nextProps, currentState) {
        console.log("getDerivedStateFromProps")

        if (nextProps.slectedStudent && nextProps.slectedStudent.id !== currentState.id ) {
            currentState = nextProps.slectedStudent;
        }

        return currentState;
    }

    handleChage = (event) => {

        // console.log(event.target.value)
        // console.log(event.target.name)

        this.setState({
            [event.target.name]: event.target.value,
        }, () => {
            // console.log(this.state)
        })

    }
    validationEmpty = (value, curent, mess) => {
        if (value) {
            curent.innerHTML = "";
            return true;
        };
        curent.innerHTML = mess;
        return false;
    };
    validationEmail = (value, curent, mess) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            curent.innerHTML = "";
            return true;
        };
        curent.innerHTML = mess;
        return false;
    }
    validationType = (value, curent, mess) => {

        if (value !== "None") {
            curent.innerHTML = "";
            return true
        };
        curent.innerHTML = mess;
        return false;
    }
    // validationID = (value, curent, mess) => {
    //     const indx = this.props.listUser.findIndex((element) => {
    //         return element.id === value;
    //     })
    //     // console.log(indx)

    //     if (indx !== -1) {
    //         curent.innerHTML = mess;
    //         return false;
    //     };
    //     curent.innerHTML = "";
    //     return true
    // }

    resetValue = () => {
        this.setState({
            id: "",
            fullName: "",
            class: "",
            phone: "",
            email: "",
            type: "None",
        })
        this.errorID.current.innerHTML = "";
        this.errorfullName.current.innerHTML = "";
        this.errorClass.current.innerHTML = "";
        this.errorPhone.current.innerHTML = "";
        this.errorEmail.current.innerHTML = "";
        this.errorType.current.innerHTML = "";
    }
    handleSubmit = (event) => {
        event.preventDefault();

        let isValid = true;


        isValid &= this.validationEmpty(this.state.id, this.errorID.current, "(*) ID can't empty") // && this.validationID(this.state.id, this.errorID.current, "(*) ID is avalible");
        isValid &= this.validationEmpty(this.state.fullName, this.errorfullName.current, "(*) Full Name can't empty");
        isValid &= this.validationEmpty(this.state.class, this.errorClass.current, "(*) Class can't empty");
        isValid &= this.validationEmpty(this.state.phone, this.errorPhone.current, "(*) Phone Number can't empty");
        isValid &= this.validationEmpty(this.state.email, this.errorEmail.current, "(*) Email can't empty") && this.validationEmail(this.state.email, this.errorEmail.current, "(*) Email error style @gmail.com");
        isValid &= this.validationType(this.state.type, this.errorType.current, "(*) Type can't empty");

        // debugger
        const indx = this.props.listUser.findIndex((element) => {
            return element.id === this.state.id;
        })
        // if (indx === -1) {
        // }

        if (isValid && indx === -1) {
            this.props.dispatch(addStudent(this.state))
        } else if (isValid && indx !== -1) {
            this.props.dispatch(updateStudent(this.state))

            this.resetValue()
        }
    }
    handleReset = () => {
        this.resetValue()
    }
    render() {
        // console.log(this.props.slectedStudent)
        return (
            <div className="card p-0">
                <div className="card-header bg-warning text-white font-weight-bold">
                    CONTROLER FORM STUDENTS
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-6">
                                <div className="form-group">
                                    <label>ID Student</label>
                                    <input value={this.state.id} name='id' onChange={this.handleChage} type="number" className="form-control" />
                                    <span ref={this.errorID} className="text-danger"></span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input value={this.state.phone} name='phone' onChange={this.handleChage} type="number" className="form-control" />
                                    <span ref={this.errorPhone} className="text-danger"></span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input value={this.state.fullName} name='fullName' onChange={this.handleChage} type="text" className="form-control" />
                                    <span ref={this.errorfullName} className="text-danger"></span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={this.state.email} name='email' onChange={this.handleChage} type="text" className="form-control" />
                                    <span ref={this.errorEmail} className="text-danger"></span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Class</label>
                                    <input value={this.state.class} name='class' onChange={this.handleChage} type="text" className="form-control" />
                                    <span ref={this.errorClass} className="text-danger"></span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label>Student Type</label>
                                    <select value={this.state.type} ref={this.inputType} name='type' onChange={this.handleChage} className="form-control">
                                        <option>None</option>
                                        <option>Excellent</option>
                                        <option>Good</option>
                                        <option>Bad</option>
                                    </select>
                                    <span ref={this.errorType} className="text-danger"></span>
                                </div>
                            </div>
                        </div>


                        <button className="btn btn-warning mr-2">SAVE</button>
                        <button onClick={this.handleReset} type='reset' className="btn btn-outline-dark">RESET</button>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listUser: state.studentReducer.listUser,
        slectedStudent: state.studentReducer.slectedStudent,
    }
}
export default connect(mapStateToProps)(FormStudent)