import React, { Component } from 'react';
import LeftMenu from './LeftMenu'
import { Drawer, Button } from 'antd';

class Navbar extends Component {
	state = {
		current: 'mail',
		visible: false
	}
	showDrawer = () => {
		this.setState({
			visible: true,
		});
	};

	onClose = () => {
		this.setState({
			visible: false,
		});
	};

	render() {
		return (
			<nav className="menuBar">
				<div className="logo">
					<img src="/logo.png" alt="image" width="60%" />
				</div>
				<div className="menuCon">
					<div className="leftMenu">
						<LeftMenu />
					</div>
					<Button className="barsMenu" type="primary" onClick={this.showDrawer}>
						<span className="barsBtn"></span>
					</Button>
					<Drawer
						placement="right"
						closable={false}
						onClose={this.onClose}
						visible={this.state.visible}
					>
					<LeftMenu />
					<p style={{padding : "25px" , marginTop : "0px" , color : 'red'}} onClick={this.onClose}>กลับหน้าแรก </p>
					</Drawer>
				</div>
			</nav>
		);
	}
}

export default Navbar;
