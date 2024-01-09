export default function reducer(state,action){
    switch(action.type){

        case "SET_STUDENTS":{
            return {...state,students:action.payload}
        }
        case "INSERT_RECORD":{
            return {...state,students:[...state.students,action.payload]}
        }
        case "DELETE_RECORD" : { 
            const newStudents = state.students.filter(ele=>{
                return ele.id!==action.payload
            })
            return {...state,students:newStudents}
        }
        case "OPEN_MODAL" : { 
            return {...state,modalOpen:true}
        }
        case "CLOSE_MODAL" : { 
            return {...state,modalOpen:false}
        }
        default : return {...state}
    }
}