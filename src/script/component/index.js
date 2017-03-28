import React from 'react'
<<<<<<< HEAD

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
=======
import {
	Link
} from 'react-router'
import {
	connect
} from 'react-redux'
import Header from './header'
import {
	mapStateToProps,
	mapDispatchToProps
} from '../redux/store'

class Index extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '首页',
			topHeader: <Header></Header>
		}
	}

	render() {
		return (
			<div className="m-index">
				{this.state.topHeader}
				<section>
					{this.props.children}
				</section>
				<footer>
					<ul>
						<li>
							<Link to="/home" activeClassName="active" >
								<i className="yo-ico">&#xe601;</i>
								<b>首页</b>
							</Link>
						</li>
						<li>
							<Link to="/kind" activeClassName="active">
								<i className="yo-ico">&#xe66f;</i>
								<b>分类</b>
							</Link>
						</li>
						<li>
							<Link to="/friends" activeClassName="active">
								<i className="yo-ico">&#xe608;</i>
								<b>乐妈圈</b>
							</Link>
						</li>
						<li>
							<Link to="/cart" activeClassName="active">
								<i className="yo-ico">&#xe654;</i>
								<b>购物车</b>
							</Link>
						</li>
						<li>
							<Link to="/my" activeClassName="active">
								<i className="yo-ico">&#xe60f;</i>
								<b>我的</b>
							</Link>
						</li>
					</ul>
				</footer>
			</div>
		)
	}
	componentDidMount() {}
	componentWillReceiveProps() {
		switch (this.props.routes[1].title) {
			case "2":
				this.setState({
					topHeader: <header><p className="leMa">乐妈圈<span className="yo-ico">&#xe655;</span><span className="yo-ico">&#xe64a;</span></p></header>
				});
				break;
			case "3":
				this.setState({
					topHeader: <header><p>购物车</p></header>
				});
				break;
			case "4":
				this.setState({
					topHeader: null
				});
				break;
			default:
				this.setState({
					topHeader: <Header></Header>
				});
				break;
		}
	}
	componentDidUpdate() {
		let title = this.props.routes[1].title;
		console.log(title);
		this.props.onChange({
			type: 'SETTITLE',
			title: title
		})
	}
}

//组件的改造，捏合
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Index)
>>>>>>> master
