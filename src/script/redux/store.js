import {
  createStore
} from 'redux'

function reducer(state = {
  title: "首页"
}, action) {
  switch (action.type) {
    case 'SETTITLE':
      return {
        title: action.title
      }
    default:
      return state
  }
}
//将 Redux state 转换成 组件的 props
function mapStateToProps(state) {
  return {
    value: state.title
  }
}
//将 Redux actions 转换成 组件的 props
function mapDispatchToProps(dispatch) {
  return {
    onChange: (action) => dispatch(action)
  }
}

var store = createStore(reducer)

export {
  mapStateToProps,
  mapDispatchToProps,
  store
}