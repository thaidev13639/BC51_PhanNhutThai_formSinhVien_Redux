import { ADD_STUDENT, UPDATE_STUDENT, SELECTED_STUDENT, DELETE_STUDENT} from "../typeAction/typeAction"


export const addStudent = (data) => {
    return {
        type: ADD_STUDENT,
        payload: data,        
    }
}
export const selectedStudent = (data) => {
    return {
        type: SELECTED_STUDENT,
        payload: data,        
    }
}
export const updateStudent = (data) => {
    return {
        type: UPDATE_STUDENT,
        payload: data,        
    }
}
export const deleteStudent = (data) => {
    return {
        type: DELETE_STUDENT,
        payload: data,        
    }
}