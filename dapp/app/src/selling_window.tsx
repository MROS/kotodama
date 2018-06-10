import * as React from "react";
import * as ReactDOM from "react-dom";

import Kotodama from "./kotodama";
import Button from "antd/lib/button";
import Input from "antd/lib/input";

let _style = {
    flex: 1,
};

const container_style = {
    margin: "15px",
};

type SellingProps = {
    onDrop: (evt: React.DragEvent<HTMLDivElement>) => string,
    setFav: (txt: string, fav: boolean) => void
    onDragKotodama: (txt: string) => void,
    fav_table: { [index: string]: boolean },
	kotodama_state_table: { [index: string]: "mating"|"selling" },
	active: boolean,
};

export default class SellingWindow extends React.Component<SellingProps, { prices: Array<string> }> {
	state = { prices: [] };
	
    allowDrop(evt) {
        evt.preventDefault();
    }
	setPrice(i, str_price) {
		if(str_price.match(/[^\d]/)) {
			return false;
		} else {
			let prices = this.state.prices.slice();
			prices[i] = str_price;
			this.setState({ prices });
		}
	}
    render() {
		if(!this.props.active) {
			return null;
		}
        return (
            <div style={_style} onDrop={this.props.onDrop} onDragOver={this.allowDrop}>
                <div>
                    {
                        Object.keys(this.props.kotodama_state_table).map((txt, i) => {
                            if (this.props.kotodama_state_table[txt] == "selling") {
                                return (
									<div style={container_style} key={i}>
										<Kotodama txt={txt} draggable={true}
											fav={this.props.fav_table[txt]}
											onDrag={txt => this.props.onDragKotodama(txt)}
											setFav={fav => this.props.setFav(txt, fav)} />
										<Input style={{ width: "30%", marginLeft: "15px" }}
											placeholder="請輸入欲售的價錢"
											value={this.state.prices[i]}
											onChange={e => this.setPrice(i, e.target.value)} />
									</div>
								);
							}
						})
					}
				</div>
				<Button type="primary" style={{ margin: "15px" }}>
					確認出售
                </Button>
			</div>
		);
	}
}