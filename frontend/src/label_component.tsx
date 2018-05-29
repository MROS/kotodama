import * as React from "react";

enum Dir { Left, Right };

const triangle_style = (dir: Dir, backgroundColor: string, size: number) => {
    let style = {
        position: "absolute" as any,
        borderStyle: "solid solid solid solid",
        height: 0,
        width: 0,
    };
    if(dir == Dir.Left) {
        return {
            ...style,
            left: `-${size}px`,
            borderWidth: `${size}px ${size}px 0px 0px`,
            borderColor: `transparent ${backgroundColor} transparent transparent`,
        };
    } else if(dir == Dir.Right) {
        return {
            ...style,
            right: `-${size}px`,
            borderWidth: `${size}px 0px 0px ${size}px`,
            borderColor: `transparent transparent transparent ${backgroundColor}`,
        };
    }
};

type LabelProp = {
    backgroundColor: string, color: string,
    height: number, txt: string,
    onClick: (evt: React.MouseEvent<HTMLDivElement>) => void
};

export default class LabelComponent extends React.Component<LabelProp, null> {
    render() {
        return (
            <div style={{
                position: "relative", width: "100%", height: `${this.props.height}px`,
                backgroundColor: this.props.backgroundColor,
                cursor: "pointer"
            }}
            onClick={this.props.onClick}>
                <div style={triangle_style(Dir.Left, this.props.backgroundColor, this.props.height)}></div>
                <div style={triangle_style(Dir.Right, this.props.backgroundColor, this.props.height)}></div>
                <p style={{
                    color: this.props.color,
                    position: "absolute", right: "50%", bottom: "-40%"
                }}>{this.props.txt}</p>
            </div>
        );
    }
}