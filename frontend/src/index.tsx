import * as React from "react";
import * as ReactDOM from "react-dom";

import Kotodama from "./kotodama";
import LabelComponent from "./label_component";

const container_style = {
    display: "inline",
    margin: "5px",
    float: "left" as any
};

enum BottomWindow { None, Breed, Sell };
type MainState = {
    dragable: boolean,
    kotodama_list: Array<string>,
    fav_list: Array<boolean>,
    bottom_window: BottomWindow
};


class MainPage extends React.Component<null, MainState> {
    constructor(props) {
        super(props);
        this.state = {
            dragable: true,
            kotodama_list: [],
            fav_list: [],
            bottom_window: BottomWindow.None
        };
    }
    componentWillMount() {
        this.setState({ kotodama_list: ["測試", "台灣中國一邊一國", "測試測試"] });
        this.setState({ fav_list: [false, false] });
    }
    setFav(i: number, fav: boolean) {
        let fav_list = this.state.fav_list.slice();
        fav_list[i] = fav;
        this.setState({ fav_list });
    }
    onDrag(i: number, evt: React.DragEvent<HTMLDivElement>) {

    }
    onDrop(i: number, evt: React.DragEvent<HTMLDivElement>) {
    }
    render() {
        let i = 0;
        return (
            <div>
                <div>
                    {
                        this.state.kotodama_list.map((txt, i) => {
                            return (
                                <div key={i} style={container_style}>
                                    <Kotodama txt={txt} fav={this.state.fav_list[i]}
                                        draggable={this.state.dragable}
                                    setFav={this.setFav.bind(this, i)}
                                    onDrag={this.onDrag.bind(this, i)}
                                    onDrop={this.onDrag.bind(this, i)} />
                                </div>
                            );
                        })
                    }
                    <div style={{ clear: "both" }}></div>
                </div>
                <div style={{ position: "fixed", bottom: 0, left: "10%", width: "30%" }}>
                    <LabelComponent height={30} txt="配種"
                        backgroundColor="rgb(80, 80, 80)" color="white"
                        onClick={() => this.setState({ bottom_window: BottomWindow.Breed })}/>
                </div>
                <div style={{ position: "fixed", bottom: 0, left: "43%", width: "30%" }}>
                    <LabelComponent height={30} txt="出售"
                        backgroundColor="rgb(80, 80, 80, 0.8)" color="white"
                        onClick={() => this.setState({ bottom_window: BottomWindow.Sell })}/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<MainPage />, document.getElementById("main")
);