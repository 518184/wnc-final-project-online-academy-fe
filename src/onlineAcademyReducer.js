export default function reducer(state, action) {
    switch (action.type) {
      case 'loadCourses':
        return {
          query: action.payload.query,
          items: action.payload.items
        }
  
    //   case 'add_item':
    //     return {
    //       ...state,
    //       items: [...state.items, action.payload]
    //     }
  
    //   case 'update_query':
    //     return {
    //       ...state,
    //       query: action.payload.query
    //     }
  
    //   case 'finish_task':
    //     return {
    //       ...state,
    //       items: state.items.map(item => item.id === action.payload.id ? { ...item, complete: true } : item)
    //     }
  
    //   default:
    //     return state;
     }
  }