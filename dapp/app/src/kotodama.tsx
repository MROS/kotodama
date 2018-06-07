import * as React from "react";
import * as ReactDOM from "react-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/fontawesome-free-solid";
import { faStar as hollowStar } from "@fortawesome/fontawesome-free-regular";

const div_style = {
    display: "inline",
    borderRadius: "3px",
    padding: "7px",
    color: "white",
    userSelect: "none" as any
};

const star_style = {
    cursor: "pointer"
}

type KotodamaProps = {
    txt: string,
    setFav: (fav: boolean) => void,
    onDrag: (txt: string) => void,
    fav?: boolean,
    draggable?: boolean
};

export default class Kotodama extends React.Component<KotodamaProps, { dragging: boolean }> {
    constructor(props) {
        super(props);
        this.state = {
            dragging: false
        };
        this.onDrag = this.onDrag.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    onDrag(evt: React.DragEvent<HTMLDivElement>) {
        this.setState({ dragging: true });
        this.props.onDrag(this.props.txt);
    }
    
    onDragEnd(evt) {
        this.setState({ dragging: false });
    }
    render() {
        let _style = {
            backgroundColor: this.props.fav ? "#DA5872" : "rgb(70, 70, 70)",
            cursor: this.props.draggable ? "move" : "default",
            opacity: this.state.dragging ? 0 : 1 
        };
        return (
            <div draggable={this.props.draggable}
                style={{...div_style, ..._style }}
                onDrag={this.onDrag} onDragEnd={this.onDragEnd}>
                <FontAwesomeIcon style={star_style}
                    onClick={() => this.props.setFav(!this.props.fav)}
                    icon={this.props.fav ? faStar : hollowStar} />
                &nbsp;{this.props.txt}
            </div>
        );
    }
}
