import * as React from "react";
import * as ReactDOM from "react-dom";

import Kotodama from "./kotodama";
import Button from "antd/lib/button";
import Input from "antd/lib/input";

let _style = {
    flex: 1,
};

const container_style = {
    display: "inline",
    margin: "15px",
    float: "left" as any,
};

type SellingProps = {
    onDrop: (evt: React.DragEvent<HTMLDivElement>) => string,
    setFav: (txt: string, fav: boolean) => void
    onDragKotodama: (txt: string) => void,
    fav_table: { [index: string]: boolean },
    kotodama_state_table: { [index: string]: "mating"|"selling" },
};

export default class SellingWindow extends React.Component<SellingProps, { buyers_addr: string }> {
    state = { buyers_addr: "" };
    allowDrop(evt) {
        evt.preventDefault();
    }
    startSelling() {
        console.log(this.state.buyers_addr);
    }
    render() {
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
                                    </div>
                                );
                            }
                        })
                    }
                <div style={{ clear: "both" }}></div>
                </div>
                <Input style={{ width: "50%", margin: "15px" }}
                    placeholder="請輸入買家的地址"
                    value={this.state.buyers_addr}
                    onChange={e => this.setState({ buyers_addr: e.target.value })}/>
                <Button type="primary" style={{ margin: "15px" }} onClick={this.startSelling.bind(this)}>
                    確認出售
                </Button>
            </div>
        );
    }
}