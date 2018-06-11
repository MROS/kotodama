import * as React from "react";
import * as ReactDOM from "react-dom";
import { Web3 } from "web3";

import Kotodama from "./kotodama";
import LabelComponent from "./label_component";
import MatingWindow from "./mating_window";
import SellingWindow from "./selling_window";
import BuyingWindow from "./buying_window";
import { initContract, initWeb3 } from "./util";

const _style = {
    backgroundColor: "rgb(50, 50, 50)",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column" as any,
    overflow: "hidden" as any
};
const main_window_style = {
    width: "100%",
    backgroundColor: "rgb(30, 30, 30)",
    flex: 3,
    padding: "10px",
    overflowY: "auto" as any
};

const container_style = {
    display: "inline",
    margin: "15px",
    float: "left" as any
};

const bottom_window_style = {
	margin: 0,
	padding: 0,
    backgroundColor: "rgb(30, 30, 30)",
    display: "flex",
    flexDirection: "column" as any,
    width: "100%",
    transition: "all 0.4s"
};
const popup_bottom_style = {
    flex: 2,
};

enum MainWindowEnum { All, Fav };
enum BottomWindowEnum { Mating, Selling, Buying, None };
type MainState = {
    kotodama_list: Array<string>,
    fav_table: { [index: string]: boolean },
    bottom_window: BottomWindowEnum,
    main_window: MainWindowEnum,
    kotodama_state_table: { [index: string]: "selling"|"mating" },
    cur_dragging: string,
    mating_list: Array<[string, string]>,
};

class MainPage extends React.Component<null, MainState> {
	private web3: Web3;
    constructor(props) {
        super(props);
        this.state = {
            kotodama_list: [],
            fav_table: {},
            bottom_window: BottomWindowEnum.None,
            main_window: MainWindowEnum.All,
            kotodama_state_table: {},
            cur_dragging: null,

            mating_list: [],
		};
		this.web3 = initWeb3();
    }
    componentDidMount() {
        let fav_table, list;
        try {
			let cookie_obj = JSON.parse(document.cookie);
			fav_table = cookie_obj.fav_table;
			list = cookie_obj.koto_list;
        } catch(e) {
            fav_table = {};
            list = [];
		}
		if(!fav_table || !list) {
			fav_table = {};
            list = [];
            document.cookie = JSON.stringify({ koto_list: list, fav_table });
		}
		this.setState({ fav_table, kotodama_list: list });
    }
    setFav(s: string, fav: boolean) {
        let fav_table = { ...this.state.fav_table };
        if(fav) {
            fav_table[s] = true;
        } else {
            delete fav_table[s];
        }
		this.setState({ fav_table });
		let cookie_obj = JSON.parse(document.cookie);
		cookie_obj.fav_table = fav_table;
        document.cookie = JSON.stringify(cookie_obj);
    }
    onMainLabelClick(index) {
        this.setState({ main_window: index });
    }
    onBottomLabelClick(index) {
        if(this.state.bottom_window == index) {
            this.setState({ bottom_window: BottomWindowEnum.None });
        } else {
            this.setState({ bottom_window: index });
        }
    }
    onDragKotodama(txt: string) {
        this.setState({ cur_dragging: txt });
    }
    onDropMain(ext: React.DragEvent<HTMLDivElement>) {
        let txt = this.state.cur_dragging;
        let table = { ...this.state.kotodama_state_table };
        delete table[txt];
        if(this.state.bottom_window == BottomWindowEnum.Mating) {
            let mating_list = this.cleanUpMatingList(this.state.mating_list, txt);
            this.setState({ mating_list });
        }
        this.setState({ kotodama_state_table: table, cur_dragging: null });
    }
    onDropSelling(ext: React.DragEvent<HTMLDivElement>) {
        let txt = this.state.cur_dragging;
        let table = { ...this.state.kotodama_state_table };
        table[txt] = "selling";
        this.setState({ kotodama_state_table: table, cur_dragging: null });
    }
    onDropMating(ext: React.DragEvent<HTMLDivElement>, y: number, x: number) {
        let txt = this.state.cur_dragging;
        let table = { ...this.state.kotodama_state_table };
        let mating_list = this.state.mating_list.slice();

        if(mating_list.length <= y) { // 好好操作的話應該不可能讓 y > 長度，最多等於
            mating_list[y] = [null, null];
        } else {
            mating_list[y] = (mating_list[y].slice() as [string, string]);
        }
        if(mating_list[y][x]) {
            // 趕走原本的傢伙
            delete table[mating_list[y][x]];
            this.setState({ kotodama_state_table: table });
        }
        if(table[txt] == "mating") {
            for(let i = 0; i < mating_list.length; i++) {
                if(mating_list[i][0] == txt) {
                    mating_list[i][0] = null;
                } else if(mating_list[i][1] == txt) {
                    mating_list[i][1] = null;
                }
            }
            mating_list[y][x] = txt;
            mating_list = this.cleanUpMatingList(mating_list);
        } else {
            mating_list[y][x] = txt;
        }
        table[txt] = "mating";
        this.setState({ mating_list, kotodama_state_table: table, cur_dragging: null });
    }
    // 砍掉空的配種欄
    cleanUpMatingList(list: Array<[string, string]>, txt?: string) {
        for(let i = 0; i < list.length; i++) {
            if(list[i][0] == txt) {
                list[i][0] = null;
            } else if(list[i][1] == txt) {
                list[i][1] = null;
            }
            if(!list[i][0] && !list[i][1]) {
                list = [...list.slice(0, i), ...list.slice(i+1)];
            }
        }
        return list;
    }
    render() {
        let i = 0;
        return (
            <div style={_style}>
                <LabelComponent labels={["顯示全部", "顯示最愛"]}
                    selected_index={this.state.main_window}
                    onClick={this.onMainLabelClick.bind(this)} />
                <div style={main_window_style} onDrop={this.onDropMain.bind(this)} onDragOver={evt => evt.preventDefault()}>
                    {
                        this.state.kotodama_list.map((txt, i) => {
                            if (this.state.main_window == MainWindowEnum.Fav && !this.state.fav_table[txt]) {
                                return;
                            } else if (this.state.kotodama_state_table[txt]) {
                                return;
                            }
                            return (
                                <div key={i} style={container_style}>
                                    <Kotodama txt={txt} fav={this.state.fav_table[txt]}
                                        draggable={this.state.bottom_window != BottomWindowEnum.None}
                                        onDrag={this.onDragKotodama.bind(this)}
                                        setFav={this.setFav.bind(this, txt)}/>
                                </div>
                            );
                        })
                    }
                </div>
                <div style={{
                    width: "100%", height: "1px", backgroundColor: "gray"
                }}></div>
                <div style={{ ...bottom_window_style, ...(this.state.bottom_window == BottomWindowEnum.None ? {} : popup_bottom_style) }}>
                    <LabelComponent labels={["配種", "出售", "購買"]}
						selected_index={this.state.bottom_window}
						onClick={this.onBottomLabelClick.bind(this)} />
					<MatingWindow
						active={this.state.bottom_window == BottomWindowEnum.Mating}
						fav_table={this.state.fav_table}
						mating_list={this.state.mating_list}
						setFav={this.setFav.bind(this)}
						onDragKotodama={this.onDragKotodama.bind(this)}
						onDrop={this.onDropMating.bind(this)} />
					<SellingWindow
						active={this.state.bottom_window == BottomWindowEnum.Selling}
						kotodama_state_table={this.state.kotodama_state_table}
						setFav={this.setFav.bind(this)}
						fav_table={this.state.fav_table}
						onDragKotodama={this.onDragKotodama.bind(this)}
						onDrop={this.onDropSelling.bind(this)} />
					<BuyingWindow
						active={this.state.bottom_window == BottomWindowEnum.Buying}/>
                </div>
			</div>
		);
	}
}

ReactDOM.render(<MainPage />, document.getElementById("main")
);