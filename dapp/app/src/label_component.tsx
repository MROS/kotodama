import * as React from "react";

type LabelProp = {
    labels: Array<string>,
    selected_index: number,
    onClick: (index: number) => void
};

let _style = {
    width: "100px",
    maxWidth: "30%",
    float: "left" as any,
    padding: "5px",
    paddingLeft: "10px",
    color: "gray",
    cursor: "pointer"
};
let selected_style = {
    color: "white",
    backgroundColor: "rgb(30, 30, 30)",
    textDecoration: "underline",
	textDecorationColor: "white",
};

export default class LabelComponent extends React.Component<LabelProp, null> {
    render() {
        return (
            <div>
                {
                    this.props.labels.map((txt, i) => {
                        return (
							<div key={i}
								onClick={() => this.props.onClick(i)}
                                style={{
                                    ..._style,
                                    ...(this.props.selected_index == i ? selected_style : {})
                                }}>
                                {txt}
                            </div>
                        );
                    })
                }
                <div style={{ clear: "both" }}></div>
            </div>
        );
    }
}