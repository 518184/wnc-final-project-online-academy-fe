export default function reducer(state, action) {
    switch (action.type) {
      // case 'initCategoriesList':
      //   return {
      //     ...state,
      //     categories: action.payload.categories
      //   }
      
      case 'initCoursesList':
        return {
          courses: action.payload.courses,
          query: action.payload.query
        }

      case 'update_query':
        return {
          ...state,
          query: action.payload.query
        }
      
      case 'getCategory':
        return {
          ...state,
          courses: state.courses.map(course => course.id === action.payload.id ? { ...course, categoryId: action.payload.category } : course)
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
  
      default:
        return state;
     }
  }