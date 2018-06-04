import * as React from "react";
import * as ReactDOM from "react-dom";
import { Web3 } from "web3";

import Kotodama from "./kotodama";
import LabelComponent from "./label_component";
import { BottomWindow, BottomWindowEnum } from "./bottom_window";
import { initContract, initWeb3, getKotodamaList, KotodamaContract } from "./util";

const _style = {
    backgroundColor: "rgb(50, 50, 50)",
    height: "100%",
    width: "100%",
    overflow: "hidden" as any
};
const body_window_style = {
    backgroundColor: "rgb(30, 30, 30)",
    height: "100%",
    width: "100%",
}
const main_window_style = {
    height: "100%",
    width: "100%",
    padding: "10px"
};
const popup_main_style = {
    height: "60%",
};

const container_style = {
    display: "inline",
    margin: "5px",
    float: "left" as any
};

const bottom_window_style = {
    position: "fixed" as any,
    width: "100%",
    bottom: 0
};
const popup_bottom_style = {
    bottom: "30%",
};

type MainState = {
    kotodama_list: Array<string>,
    fav_list: Array<boolean>,
    bottom_window: BottomWindowEnum,
    main_window: MainWindowEnum
};
enum MainWindowEnum { All, Fav };

class MainPage extends React.Component<null, MainState> {
	private web3: Web3;
	private kotodamaContract: KotodamaContract;
    constructor(props) {
        super(props);
        this.state = {
            kotodama_list: [],
            fav_list: [],
            bottom_window: BottomWindowEnum.None,
            main_window: MainWindowEnum.All
		};
		this.web3 = initWeb3();
		this.kotodamaContract = initContract(this.web3);
    }
    async componentWillMount() {
		let list = await getKotodamaList(this.kotodamaContract);
        this.setState({ kotodama_list: list });
		this.setState({ fav_list: Array(list.length).fill(false) });
    }
    setFav(i: number, fav: boolean) {
        let fav_list = this.state.fav_list.slice();
        fav_list[i] = fav;
        this.setState({ fav_list });
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
    onDrag(i: number, evt: React.DragEvent<HTMLDivElement>) {

    }
    onDrop(i: number, evt: React.DragEvent<HTMLDivElement>) {
    }
    render() {
        let i = 0;
        return (
            <div style={_style}>
                <LabelComponent labels={["顯示全部", "顯示最愛"]}
                    selected_index={this.state.main_window}
                    onClick={this.onMainLabelClick.bind(this)}/>
				<div style={body_window_style}>
					<div style={{ ...main_window_style, ...(this.state.bottom_window == BottomWindowEnum.None ? {} : popup_main_style) }}>
						{
							this.state.kotodama_list.map((txt, i) => {
								if (this.state.main_window == MainWindowEnum.Fav && !this.state.fav_list[i]) {
									return;
								}
								return (
									<div key={i} style={container_style}>
										<Kotodama txt={txt} fav={this.state.fav_list[i]}
											draggable={this.state.bottom_window != BottomWindowEnum.None}
											setFav={this.setFav.bind(this, i)}
											onDrag={this.onDrag.bind(this, i)}
											onDrop={this.onDrag.bind(this, i)} />
									</div>
								);
							})
						}
					</div>
					<div style={{ ...bottom_window_style, ...(this.state.bottom_window == BottomWindowEnum.None ? {} : popup_bottom_style) }}>
						<div style={{
							width: "100%", height: "1px", backgroundColor: "gray"
						}}></div>
						<LabelComponent labels={["配種", "出售"]}
							selected_index={this.state.bottom_window}
							onClick={this.onBottomLabelClick.bind(this)} />
						<BottomWindow />
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<MainPage />, document.getElementById("main")
);