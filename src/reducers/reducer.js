export default function reducer(state,action){
    switch(action.type){

        case "SET_RECORDS":{
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
        case "UPDATE_RECORD" : { 
            const newStudents = state.students.map(ele=>{
                if(ele.id==action.payload.id){
                    return {...ele,...action.payload}
                }
                else{ 
                    return {...ele}
                }
            })
            return {...state,students:newStudents}
        }
        case "OPEN_MODAL" : { 
            return {...state,modalOpen:true}
        }
        case "CLOSE_MODAL" : { 
            return {...state,modalOpen:false,editItemId:0}
        }
        case "IS_EDIT_MODE":{
            return {...state,editItemId:action.payload}
        }
        default : return {...state}
    }
}