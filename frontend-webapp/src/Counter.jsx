const increament ="increament"
const decreament = "decreament"

export const action_increament = ()=>{
    type:increament
}
export const action_decreament = ()=>{
    type:decreament
}

initialize={
    count:0
}
export const CounterReducer = (state = initialize,action){
    switch(action.type){
        case increament:return{
            ...state,
            count:state.count+1
        }
        case decreament:return {
            ...state,
            count:state.count=0? state.count : state.count+1
        }
        default :return state
    }
}

const store = CreateStore(CounterReducer)
export default store
