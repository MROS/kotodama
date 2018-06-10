import * as React from "react";
import * as ReactDOM from "react-dom";
import Button from "antd/lib/button";

import Kotodama from "./kotodama";

let container_style = {
    display: "inline",
    height: "35px",
    margin: "15px",
    width: "20%",
    maxWidth: "300px",
    textAlign: "center" as any,
	position: "relative" as any,
};
type ContainerProps = {
    pos: [number, number],
    txt?: string,
    fav?: boolean,
    onDrop: (evt: React.DragEvent<HTMLDivElement>, x: number, y: number) => void,
    setFav: (txt: string, fav: boolean) => void
    onDrag: (txt: string) => void,
};
class MatingContainer extends React.Component<ContainerProps, { dragging: boolean }> {
	state = { dragging: false };
    onDrop(evt: React.DragEvent<HTMLDivElement>) {
		this.props.onDrop(evt, this.props.pos[0], this.props.pos[1]);
		this.setState({ dragging: false });
    }
    allowDrop(evt) {
		evt.preventDefault();
		this.setState({ dragging: true });
    }
    render() {
		let txt = this.props.txt;
		let box_shadow_style = {
			boxShadow: "inset 0px 0px 10px 3px gray"
		};
        return (
			<div style={{ ...container_style, ...(this.state.dragging ? box_shadow_style : {}) }}
				onDragLeave={() => this.setState({ dragging: false })}
                onDragOver={this.allowDrop.bind(this)}
                onDrop={this.onDrop.bind(this)}>
                {
                    (() => {
                        if(this.props.txt) {
                            return <Kotodama txt={txt} draggable={true}
                                fav={this.props.fav}
                                onDrag={this.props.onDrag}
                                setFav={fav => this.props.setFav(txt, fav)} />
                        } else {
                            return null;
                        }
                    })()
                }
                {
                    (() => {
                        if(this.props.txt) {
                            return null;
                        } else {
                            return <div style={{
                                width: "100%", height: "1px", backgroundColor: "gray",
                                position: "absolute", bottom: 0
                            }}></div>;
                        }
                    })()

                }
            </div>
        );
    }
}

let _style = {
    flex: 1,
    overflowY: "auto" as any
};
type MatingProps = {
    onDrop: (evt: React.DragEvent<HTMLDivElement>, x: number, y: number) => void,
    setFav: (txt: string, fav: boolean) => void
    onDragKotodama: (txt: string) => void,
    fav_table: { [index: string]: boolean },
	mating_list: Array<[string, string]>,
	active: boolean,
};
export default class MatingWindow extends React.Component<MatingProps, null> {
    renderCol(y: number, txt1: string, txt2: string, fav_table?: {[index:string]:boolean}) {
        return (
            <div key={y} style={{ display: "flex", alignItems: "center" }}>
                <MatingContainer pos={[y, 0]}
                    txt={txt1}
                    fav={txt1 ? fav_table[txt1] : false}
                    onDrop={this.props.onDrop}
                    setFav={this.props.setFav}
                    onDrag={this.props.onDragKotodama}/>
                <div style={{ color: "white" }}>+</div>
                <MatingContainer pos={[y, 1]}
                    txt={txt2}
                    fav={txt2 ? fav_table[txt2] : false}
                    onDrop={this.props.onDrop}
                    setFav={this.props.setFav}
                    onDrag={this.props.onDragKotodama}/>
            </div>
        );
    }
    render() {
		if(!this.props.active) {
			return null;
		}

        let len = this.props.mating_list.length;
        return (
            <div style={_style}>
                {
                    this.props.mating_list.map((mating, i) => {
                        return this.renderCol(i, mating[0], mating[1], this.props.fav_table);
                    })
                }
                {
                    this.renderCol(len, null, null)
                }
                <Button type="primary" style={{ margin: "15px" }}>
                    確認配種
                </Button>
            </div>
        );
    }
}