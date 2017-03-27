import React from 'react'

import { Link } from 'react-router'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '榜单 « 电影 « 豆瓣'
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
              <Link to="/board" onClick={this.clickHandler.bind(this, '榜单 « 电影 « 豆瓣')} activeClassName="active">
                <i className="yo-ico">&#xe61d;</i>
                <b>榜单</b>
              </Link>
            </li>
            <li>
              <Link to="/search" onClick={this.clickHandler.bind(this, '电影 « 豆瓣')} activeClassName="active">
                <i className="yo-ico">&#xe603;</i>
                <b>搜索</b>
              </Link>
            </li>
            <li>
            <Link to="/my" onClick={this.clickHandler.bind(this, 'About me')} activeClassName="active">
              <i className="yo-ico">&#xe61a;</i>
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
}

export default Index
