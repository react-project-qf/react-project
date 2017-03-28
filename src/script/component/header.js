import React from 'react'

class Header extends React.Component {
	render() {
		return (
			<header>
				<ul className="yo-header yo-header-a">
					<li><span className="regret yo-ico">&#xe655;</span></li>
					<li><form className="yo-search">
		            <label className="action">
		            	<span className="yo-ico">&#xf067;</span>
		            	<input type="text" className="input" placeholder="搜索乐友商品..."/>
		            </label>
		            <span className="cancel">取消</span>
		            </form></li>
					<li><span className="affirm yo-ico">&#xe61c;</span></li>
				</ul>
      </header>
		)
	}
}

export default Header
