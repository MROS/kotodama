import * as React from "react";
import * as ReactDOM from "react-dom";

import Kotodama from "./kotodama";
import Button from "antd/lib/button";
import Input from "antd/lib/input";

import { cheatMetaMaskXD } from "./util";

type BuyingProps = {
	active: boolean,
};
type BuyingState = {
	kotodama_list: Array<string>,
	price_list: Array<number>,
	buy_table: { [index: string]: boolean },
	cur_dragging: string
};

let _style = {
	flex: 1,
	display: "flex"
};
let left_style = {
	flex: 1,
	borderRightStyle: "solid" as any,
	borderRightWidth: "1px",
	borderRightColor: "gray",
	overflowY: "auto"
};
let right_style = {
	flex: 1,
	overflowY: "auto"
};
let container_style = {
	position: "relative" as any,
	display: "inline" as any
};
let label_style = {
	position: "absolute" as any,
	right: "-60px" as any,
	bottom: "3px"
};

export default class BuyingWindow extends React.Component<BuyingProps, BuyingState> {
	state = {
		kotodama_list: [],
		price_list: [],
		buy_table: {},
		cur_dragging: null
	};
	componentDidMount() {
		let kotodama_list = ["買我買我", "我超屌", "風", "林", "火", "山"];
		let price_list = [100, 200, 50, 30, 60, 40];
		this.setState({kotodama_list, price_list});
	}
	onDragKotodama(txt) {
		this.setState({ cur_dragging: txt });
	}
    allowDrop(evt) {
        evt.preventDefault();
	}
	onDropLeft() {
		let buy_table = { ...this.state.buy_table };
		if(buy_table[this.state.cur_dragging]) {
			delete buy_table[this.state.cur_dragging];
		}
		this.setState({ buy_table, cur_dragging: null });
	}
	onDropRight() {
		let buy_table = { ...this.state.buy_table };
		buy_table[this.state.cur_dragging] = true;
		this.setState({ buy_table, cur_dragging: null });
	}
	startBuying() {
		let cookie_obj = JSON.parse(document.cookie);
		cookie_obj.koto_list = [];
		Object.keys(this.state.buy_table).forEach(txt => cookie_obj.koto_list.push(txt));
		document.cookie = JSON.stringify(cookie_obj);
		cheatMetaMaskXD();
	}
	render() {
		if(!this.props.active) {
			return null;
		}
		return (
			<div style={_style}>
				<div style={left_style} onDragOver={this.allowDrop} onDrop={this.onDropLeft.bind(this)}>
					{
						this.state.kotodama_list.map((txt, i) => {
							if(this.state.buy_table[txt]) {
								return null;
							}
							return (
								<div style={{ margin: "25px" }} key={i}>
									<div style={container_style}>
										<Kotodama txt={txt}
											draggable={true}
											onDrag={this.onDragKotodama.bind(this, txt)}
											setFav={() => null} />
										<div style={label_style} className="label">
											<span>{this.state.price_list[i]} $</span>
										</div>
									</div>
								</div>
							);
						})
					}
				</div>
				<div style={right_style} onDragOver={this.allowDrop} onDrop={this.onDropRight.bind(this)}>
					{
						this.state.kotodama_list.map((txt, i) => {
							if (!this.state.buy_table[txt]) {
								return null;
							}
							return (
								<div style={{ margin: "25px" }} key={i}>
									<div style={container_style}>
										<Kotodama txt={txt}
											draggable={true}
											onDrag={this.onDragKotodama.bind(this, txt)}
											setFav={() => null} />
										<div style={label_style} className="label">
											<span>{this.state.price_list[i]} $</span>
										</div>
									</div>
								</div>
							);
						})
					}
					<Button type="primary" style={{ margin: "20px" }} onClick={this.startBuying.bind(this)}>
						確認購買
                	</Button>
				</div>
			</div>
		);
	}
}