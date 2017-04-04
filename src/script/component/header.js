import React from 'react'
class Header extends React.Component {
	toSearch() {
		window.location.href = "#/search"
	}
	render() {
		return (
			<header>
				<ul className="yo-header yo-header-a">
					<li><span className="regret yo-ico"><img src="./images/toolbar_qr_black.png" alt=""/></span></li>
					<li><form className="yo-search">
		            <label className="action">
		            	<span className="yo-ico">&#xf067;</span>
		            	<input type="text"  className="input"  placeholder="搜索乐友商品..." onClick={this.toSearch} />
		            </label>
		            </form></li>
					<li><span className="affirm yo-ico"><img src="./images/toolbar_message_black.png" alt="" /></span></li>
				</ul>
      </header>
		)
	}
}

export default Header