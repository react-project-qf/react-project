import React from 'react'
import Scroller from '../../component_dev/scroller/src/'
class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data.list,
			list: [<li></li>]
		}
	}
	render() {
		return (
			<div >
				<Scroller extraClass="yo-scroller-fullscreen kindLists">
				<div>
					<ul>
						{this.state.list}
					</ul>
				</div>
				</Scroller>
			</div>
		)
	}
	componentDidMount() {
		var elList = this.state.data.map(function(item, index) {
			return <li><img src={item.sub_category_image}/><p>{item.c_name}</p></li>
		})
		this.setState({
			list: elList
		})
	}
}
export default Product
