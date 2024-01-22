const initialState = {
  images: [],
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_IMAGE":
      return {
        ...state,
        images: [...state.images, action.payload],
      };
    default:
      return state;
  }
};

export default imageReducer;
