export interface DummyState {
    data: string;
  }
  
  const initialState: DummyState = {
    data: 'Hello, Redux Thunk!',
  };
  
  const dummyReducer = (state = initialState, action: any): DummyState => {
    switch (action.type) {
      case 'SET_DATA':
        return { ...state, data: action.payload };
      default:
        return state;
    }
  };
  
  export default dummyReducer;
  