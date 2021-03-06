import React, {Component} from 'react';
import {Modal, Button, Tabs, Tab, Col} from 'react-bootstrap';
import interact from 'interact.js';
import Dali from './../../../core/main';
import {isSortableBox} from './../../../utils';

require('./_pluginRibbon.scss');

export default class PluginRibbon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: []
        };
    }

    render() {
        return (
            /* jshint ignore:start */
            <Col id="ribbon"
                 md={12}
                 xs={12}
                 style={{
                    height: this.props.ribbonHeight,
                    overflowY:'hidden'
                }}>
                <div id="insideribbon" className="row">
                    <div id="ribbonList">
                        {this.state.buttons.map((item, index) => {
                            let button = this.state.buttons[index];
                            if (button.category === this.props.category || this.props.category == 'all') {
                                var clase = "" + button.icon;
                                return (<div key={index} className="buttonPlace">
                                    <Button className={"rib " + (button.allowFloatingBox ? "floatingDaliBox" : "")}
                                            disabled={this.props.disabled}
                                            key={index}
                                            name={item.name}
                                            bsSize="large"
                                            draggable="false">
                                        <i className="material-icons">{clase}</i> {button.displayName}
                                    </Button>
                                </div>);
                            }
                        })}
                    </div>
                </div>
                <div className="mainButtons">

                    <button className="ribShortcut"
                            title="Copy"
                            disabled={!this.props.boxSelected || (this.props.boxSelected && isSortableBox(this.props.boxSelected.id))}
                            onClick={() => {
                                this.props.onBoxDuplicated(this.props.boxSelected.id, this.props.boxSelected.parent, this.props.boxSelected.container);
                                this.stopPropagation();
                            }}>
                        <i className="material-icons">content_copy</i>
                    </button>
                    <button className="ribShortcut"
                            title="Paste"
                            disabled={!this.props.boxSelected}
                            onClick={() => alert('Aún no hace nada')}>
                        <i className="material-icons">content_paste</i>
                    </button>
                </div>
            </Col>
            /* jshint ignore:end */
        );
    }

    componentDidMount() {
        Dali.API_Private.listenEmission(Dali.API_Private.events.addMenuButtons, e => {
            this.setState({buttons: this.state.buttons.concat(e.detail)});
        });

        interact(".rib")
            .draggable({
                autoScroll: false,
                onstart: function (event) {
                    changeOverflow(true);
                    let original = event.target;
                    let parent = original.parentNode;
                    let dw = original.offsetWidth;
                    let clone = original.cloneNode(true),
                        x = (parseFloat(original.getAttribute('data-x') - dw) || 0),
                        y = (parseFloat(original.getAttribute('data-y')) || 0);
                    clone.setAttribute("id", "clone");
                    clone.setAttribute('data-x', x);
                    clone.setAttribute('data-y', y);
                    parent.appendChild(clone);
                    // translate the element
                    clone.style.webkitTransform =
                        clone.style.transform =
                            'translate(' + (x) + 'px, ' + (y) + 'px)';
                },
                onmove: (event) => {
                    let target = document.getElementById('clone'),
                    // keep the dragged position in the data-x/data-y attributes
                        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    // translate the element
                    target.style.webkitTransform =
                        target.style.transform =
                            'translate(' + (x) + 'px, ' + (y) + 'px)';
                    target.style.zIndex = '9999';
                    target.classList.add('ribdrag');

                    // update the position attributes
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                },
                onend: (event) => {
                    changeOverflow(false);
                    let original = event.target;
                    let parent = original.parentNode;
                    let dw = original.offsetWidth;
                    let clone = document.getElementById('clone');


                    var target = clone,
                        x = 0,
                        y = 0;
                    target.style.webkitTransform =
                        target.style.transform =
                            'translate(' + (x) + 'px, ' + y + 'px)';

                    target.style.zIndex = '9999';
                    target.style.position = 'relative';
                    target.classList.remove('ribdrag');

                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);

                    parent.removeChild(clone);
                    event.stopPropagation();
                }
            });
    }
}


function changeOverflow(bool) {
    document.getElementById('ribbonRow').style.overflowX = bool ? 'visible' : 'auto';
    document.getElementById('ribbon').style.overflowX = bool ? 'visible' : 'hidden';
    document.getElementById('ribbon').style.overflowY = bool ? 'visible' : 'hidden';
    document.getElementById('insideribbon').style.overflowY = bool ? 'visible' : 'hidden';
    document.getElementById('ribbonList').style.overflowY = bool ? 'visible' : 'hidden';
    document.getElementById('ribbonRow').style.overflowY = bool ? 'visible' : 'hidden';
    document.getElementById('canvas').style.zIndex = bool ? '-1' : '0';
    document.getElementById('containedCanvas').style.zIndex = bool ? '-1' : '0';
}
