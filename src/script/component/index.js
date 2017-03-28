import React from 'react'

import { Link } from 'react-router'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '首页'
    }
  }

  clickHandler(type) {
    this.setState({
      title: type
    })
  }

  render() {
    return (
      <div className="m-index">
        <header>
          <div className="yo-header yo-header-a">
            <h2 className="title">{this.state.title}</h2>
            <span className="regret yo-ico">&#xe61f;</span>
          </div>
        </header>
        <section>
          {this.props.children}
        </section>
        <footer>
          <ul>
            <li className="active">
              <Link to="/board" onClick={this.clickHandler.bind(this, '首页')} activeClassName="active">
                <i className="yo-ico">&#xe612;</i>
                <b>首页</b>
              </Link>
            </li>
            <li>
              <Link to="/search" onClick={this.clickHandler.bind(this, '分类')} activeClassName="active">
                <i className="yo-ico">&#xe626;</i>
                <b>分类</b>
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={this.clickHandler.bind(this, '购物车')} activeClassName="active">
                <i className="yo-ico">&#xe61b;</i>
                <b>购物车</b>
              </Link>
            </li>
            <li>
            <Link to="/my" onClick={this.clickHandler.bind(this, '我的')} activeClassName="active">
              <i className="yo-ico">&#xe615;</i>
              <b>我的</b>
            </Link>
            </li>
          </ul>
        </footer>
      </div>
    )
  }

  componentDidMount() {
    // console.log(this.refs.board.props.title);
  }
   componentDidUpdate() {
    let title = this.props.routes[1].title
    this.props.onChange({
      type: 'SETTITLE',
      title: title
    })
  }
}

export default Index
