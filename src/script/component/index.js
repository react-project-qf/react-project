import React from 'react'
import { Link } from 'react-router'
class Index extends React.Component {
	constructor(props) {
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
						<h2 className="yo-header">{this.state.title}</h2>
				</header>
				<section>
					{this.props.children}
				</section>
				<footer>
					<ul>
						<li>
							<Link to="/home" onClick={this.clickHandler.bind(this, '首页')} activeClassName="active" >
								<i className="yo-ico">&#xe601;</i>
								<b>首页</b>
							</Link>
						</li>
						<li>
							<Link to="/kind" onClick={this.clickHandler.bind(this, '分类')} activeClassName="active">
								<i className="yo-ico">&#xe66f;</i>
								<b>分类</b>
							</Link>
						</li>
						<li>
							<Link to="/friends" onClick={this.clickHandler.bind(this, '乐妈圈')} activeClassName="active">
								<i className="yo-ico">&#xe608;</i>
								<b>乐妈圈</b>
							</Link>
						</li>
						<li>
							<Link to="/cart" onClick={this.clickHandler.bind(this, '购物车')} activeClassName="active">
								<i className="yo-ico">&#xe654;</i>
								<b>购物车</b>
							</Link>
						</li>
						<li>
							<Link to="/my" onClick={this.clickHandler.bind(this, '我的')} activeClassName="active">
								<i className="yo-ico">&#xe60f;</i>
								<b>我的</b>
							</Link>
						</li>
					</ul>
				</footer>
			</div>
		)
	}
	componentDidMount() {
		// fetch('/api/list.php')
		// 	.then(response => response.json())
		// 	.then(
		// 		res => {
		// 			console.log("aaaa");
		// 			console.log(res);
		// 			this.setState({
		// 				name: <div>{res.name}</div>
		// 			})
		// 		})
	}
}

export {
	Index as
	default
}
