import React from 'react'
import {
	Link
} from 'react-router'
import {
	connect
} from 'react-redux'

import {
	mapStateToProps,
	mapDispatchToProps
} from '../redux/store'

class Index extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '首页'
		}
	}

	render() {
		return (
			<div className="m-index">
				<header>
						<h2 className="yo-header">{this.props.value}</h2>
				</header>
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