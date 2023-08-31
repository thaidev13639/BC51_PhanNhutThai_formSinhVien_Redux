import { ADD_STUDENT, DELETE_STUDENT, SELECTED_STUDENT, UPDATE_STUDENT } from "../typeAction/typeAction";

const DEAFAULT_STATE = {
    listUser: [],
    slectedStudent: [],
}

const stringify = localStorage.getItem("STUDENT_LIST");

if (stringify) {
    DEAFAULT_STATE.listUser = JSON.parse(stringify);
}

export const studentReducer = (state = DEAFAULT_STATE, action) => {
    console.log(action)


    switch (action.type) {

        case ADD_STUDENT: {
            state.listUser = [...state.listUser, action.payload];
            // console.log(state.listUser)
            localStorage.setItem("STUDENT_LIST", JSON.stringify(state.listUser))
            break
        };

        case SELECTED_STUDENT: {
            state.slectedStudent = action.payload;
            // console.log(state.slectedStudent)
            break
        }

        case UPDATE_STUDENT: {
            console.log("123")
            const data = [...state.listUser];

            const index = data.findIndex((element) => {
                return element.id === action.payload.id;
            });

            const isAnswer = window.confirm(`Are you want Update Student ${data[index].fullName} `);

            if (isAnswer && index !== -1) {

                data[index] = action.payload

                state.slectedStudent = null;
                state.listUser = data;
            }
            localStorage.setItem("STUDENT_LIST", JSON.stringify(state.listUser))

            break
        }

        case DELETE_STUDENT: {
            const data = [...state.listUser];

            const index = data.findIndex((element) => {
                return element.id === action.payload.id;
            });

            if (index !== -1) {
                const isAnwser = window.confirm("Are You Want Delete This Student");
                if (isAnwser) {
                    data.splice(index, 1)
                }
            }
            state.listUser = data
            localStorage.setItem("STUDENT_LIST", JSON.stringify(state.listUser))

            break
        };
    }


    return { ...state };
}