import React from 'react'
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
		console.log('init');
		this.state = {
			title: '首页',
			topHeader: ""
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
							<Link to="/user" activeClassName="active">
								<i className="yo-ico">&#xe60f;</i>
								<b>我的</b>
							</Link>
						</li>
					</ul>
				</footer>
			</div>
		)
	}
	switchRoutes() {
		// console.log("props", this.props.routes[1].title)
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
			case "5":
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
	componentWillReceiveProps() {
		this.switchRoutes()
	}
	componentDidMount() {
		let title = this.props.routes[1].title;
		// console.log('mount');
		this.props.onChange({
			type: 'SETTITLE',
			title: title
		})
		this.switchRoutes();
	}
	componentDidUpdate() {
		// console.log('update');
		let title = this.props.routes[1].title;
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