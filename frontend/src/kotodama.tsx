import * as React from "react";
import * as ReactDOM from "react-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/fontawesome-free-solid";
import { faStar as hollowStar } from "@fortawesome/fontawesome-free-regular";

const div_style = {
    backgroundColor: "rgb(80, 80, 80)",
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
    onDrag: (evt: React.DragEvent<HTMLDivElement>) => void,
    onDrop: (evt: React.DragEvent<HTMLDivElement>) => void,
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
        this.onDrop = this.onDrop.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    onDrag(evt) {
        this.setState({ dragging: true });
        this.props.onDrag(evt);
    }
    onDrop(evt) {
        this.setState({ dragging: false });
        this.props.onDrop(evt);
    }
    onDragEnd(evt) {
        this.setState({ dragging: false });
    }
    render() {
        let opacity = (() => {
            if(this.state.dragging) {
                return 0;
            } else {
                return this.props.fav ? 1 : 0.7;
            }
        })();
        if(this.props.draggable) {
            div_style["cursor"] = "move";
        }
        return (
            <div draggable={this.props.draggable}
                style={{...div_style, opacity }}
                onDrag={this.onDrag} onDrop={this.onDrop} onDragEnd={this.onDragEnd}>
                <FontAwesomeIcon style={star_style}
                    onClick={() => this.props.setFav(!this.props.fav)}
                    icon={this.props.fav ? faStar : hollowStar} />
                &nbsp;{this.props.txt}
            </div>
        );
    }
}
