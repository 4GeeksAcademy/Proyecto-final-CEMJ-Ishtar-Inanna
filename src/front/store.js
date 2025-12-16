export const initialStore={
  login: false
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'login':
      return {
        ...store,
        login: !store.login
      };

    default:
      throw Error('Unknown action.');
  }    
}
