export default function reducer(state, action) {
	switch (action.type) {
		// case 'initCategoriesList':
		//   return {
		//     ...state,
		//     categories: action.payload.categories
		//   }

		case 'initCoursesList':
			return {
				...state,
				courses: action.payload.courses,
				query: action.payload.query,
				mode: action.payload.mode,
			}

		case 'initCoursesList2':
			return {
				...state,
				courses2: action.payload.courses2,
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
				// courses: state.courses.map(course => course.id === action.payload.id ? { ...course, categoryId: action.payload.category } : course)
				categories: action.payload.categories,
				query: action.payload.query
			}

		case 'changeMode':
			return {
				...state,
				// courses: state.courses.map(course => course.id === action.payload.id ? { ...course, categoryId: action.payload.category } : course)
				mode: action.payload.mode,
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