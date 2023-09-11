import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteStudent, selectedStudent } from '../Store/actionReducer/actionReducer'
import { removeVietnameseTones } from '../Store/removeVietNamese/removeVietnamese'

class InfornationBoard extends Component {
    state = {
        keyWord: "",
        type: "",
    }
    handleChange = (event) => {
        // console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value,
        }, () => {

            // console.log(this.state)
        })
    }
    renderStudent = () => {
        const filterName = this.props.listUser.filter((element) => {
            // return element.fullName.trim().toLowerCase().indexOf(this.state.keyWord.trim().toLocaleLowerCase()) !== -1
            if (element.fullName) {
                const nameEle = element.fullName.trim().toLowerCase()
                const nameEleRMVN = removeVietnameseTones(nameEle)

                const nameState = this.state.keyWord.trim().toLowerCase()
                const nameKeyWord = removeVietnameseTones(nameState)

                const valible = nameEleRMVN.indexOf(nameKeyWord)

                if (valible) {
                    return nameEleRMVN.indexOf(nameKeyWord) !== -1
                } else {
                    return true;
                }
            }
            // console.log(valible)
            return true
        })

        const filterType = filterName.filter((element) => {
            const valible = element.type.trim().toLowerCase().indexOf(this.state.type.trim().toLowerCase())

            if (valible && this.state.type !== "All") {
                return element.type.trim().toLowerCase().indexOf(this.state.type.trim().toLowerCase()) !== -1;
            } else {
                return true
            }
        })

        return filterType.map((element, indx) => {
            // console.log(first)
            const className = indx % 2 === 0 ? "bg-light" : ""
            return <tr key={indx} className={className}>
                <td>{element.id}</td>
                <td>{element.fullName}</td>
                <td>{element.class}</td>
                <td>{element.phone}</td>
                <td>{element.email}</td>
                <td>{element.type}</td>
                <td>
                    <button onClick={() => this.props.dispatch(selectedStudent(element))} className="btn btn-info mr-2">EDIT</button>
                    <button onClick={() => this.props.dispatch(deleteStudent(element))} className="btn btn-danger">DELETE</button>
                </td>
            </tr>
        })
    }

    render() {
        // console.log(this.props.listUser)
        return (
            <div className="card p-0 mt-3">
                <div className="card-header bg-info text-white font-weight-bold">INFORMATION BOARD</div>
                <div className="row mt-4 px-3 ">
                    <div className="col-4">
                        <div className="form-group mb-0">
                            <input
                                name='keyWord'
                                onChange={this.handleChange}
                                type="text"
                                placeholder="Search by full name..."
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-3 ml-auto">
                        <div className="form-group mb-0">
                            <select name='type' onChange={this.handleChange} className="form-control">
                                <option>All</option>
                                <option>Excellent</option>
                                <option>Good</option>
                                <option>Bad</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Class</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderStudent()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listUser: state.studentReducer.listUser,
    }
}
export default connect(mapStateToProps)(InfornationBoard)