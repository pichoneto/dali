import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Input,Button, Tooltip, OverlayTrigger} from 'react-bootstrap';
import interact from 'interact.js';
 import {BOX_TYPES, ID_PREFIX_BOX, ID_PREFIX_PAGE, ID_PREFIX_SECTION, ID_PREFIX_SORTABLE_BOX, ID_PREFIX_SORTABLE_CONTAINER} from '../constants';

export default class DaliShortcuts extends Component {
    constructor(props) {
        super(props);
        recalculatePosition();
 
     }
    render() {
           
        let box = this.props.box;
        let toolbar = this.props.toolbar;
        if (box) {
            return  (
                <div id="daliBoxIcons" className="" style= {{display: (this.props.box  != -1 && this.props.box.type != "sortable")? 'block':'none'/*, width: 'auto'*/}}  >
                    <OverlayTrigger placement="top" overlay={ <Tooltip id="ajustaradocumento"> Ajustar a documento </Tooltip>}> 
                        <button className="daliTitleButton"
                            onClick={(e) => {
                                alert('No hace nada aún')
                                e.stopPropagation(); }} >
                            <i className="material-icons">code</i>
                        </button>
                    </OverlayTrigger>
                { (toolbar && toolbar.config && toolbar.config.needsTextEdition) ? (
                    <OverlayTrigger placement="top"  overlay={ <Tooltip id="editartexto" >Editar texto</Tooltip>}> 
                        <button className="daliTitleButton"
                            onClick={(e) => {
                                 this.props.onTextEditorToggled(toolbar.id, !toolbar.showTextEditor, (toolbar.showTextEditor) ? CKEDITOR.instances[toolbar.id].getData() : null)
                                e.stopPropagation(); }} >
                            <i className="material-icons">mode_edit</i>
                        </button>
                    </OverlayTrigger>
                    ):<br/> 
                } 
                </div> );

        } else {
            return (<br/>);
        }
    } 
    componentWillUpdate(){
        if (this.props.box && this.props.box.id){
            recalculatePosition(this.props.box.id);
        }   
    }
   
 

 }

 function recalculatePosition(id){
    let element = document.getElementById('box-' + id);
    let bar = document.getElementById('daliBoxIcons');
    if (element && bar){
        var rect = element.getBoundingClientRect();
        var main = document.getElementById('maincontent')
        var canvas = main.getBoundingClientRect();
        bar.style.left  = (rect.left - canvas.left) + 'px';
        bar.style.top  = (rect.top - canvas.top + main.scrollTop) + 'px';
        bar.style.width = element.clientWidth + 'px';
    } 
 }