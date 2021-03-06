import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Col, Row, Input, Button, OverlayTrigger, Popover, Dropdown, Tooltip, MenuItem} from 'react-bootstrap';
import DaliIndexTitle from '../../carrousel/dali_index_title/DaliIndexTitle';
import i18n from 'i18next';
import {isSection} from './../../../utils';

require('./_navBar.scss');

export default class DaliNavBar extends Component {

    openPlugin(categoria) {
        this.props.setcat(categoria);
    }

    render() {

        let disablePlugins = (this.props.navItemsIds.length === 0 || this.props.navItemSelected === 0);
        let modalTitle = "";
        let modalShow = false;
        return (
            /* jshint ignore:start */
            <Col id="iconBar">
                <img src="images/icon.png"/>
                <div className="navBarSpace">
                    <DaliIndexTitle className="tituloCurso"
                                    title={this.props.title}
                                    onNameChanged={this.props.onTitleChanged}/>
                </div>

                <button
                    className={ this.props.hideTab == 'show' && this.props.categoria == 'text' ? 'navButtonPlug active':'navButtonPlug' }
                    title='Text' disabled={false /*disablePlugins*/}
                    onClick={() => {this.openPlugin('text')}}><i
                    className="material-icons">format_color_text</i><br/> <span
                    className="hideonresize">{i18n.t("Text")}</span></button>
                <button
                    className={ this.props.hideTab == 'show' && this.props.categoria == 'image' ? 'navButtonPlug active':'navButtonPlug' }
                    title='Images' disabled={false /*disablePlugins*/}
                    onClick={() => { this.openPlugin('image')}}><i className="material-icons">image</i><br/><span
                    className="hideonresize"> {i18n.t("Images")}</span></button>
                <button
                    className={ this.props.hideTab == 'show' && this.props.categoria == 'multimedia' ? 'navButtonPlug active':'navButtonPlug' }
                    title={i18n.t("Multimedia")} disabled={false /*disablePlugins*/}
                    onClick={() => {this.openPlugin('multimedia')}}><i className="material-icons">play_circle_filled</i><br/> <span
                    className="hideonresize">{i18n.t("Multimedia")}</span></button>
                <button
                    className={ this.props.hideTab == 'show' && this.props.categoria == 'animations' ? ' navButtonPlug active':'navButtonPlug' }
                    title={i18n.t("Animations")} disabled={false /*disablePlugins*/}
                    onClick={() => {this.openPlugin('animations')}}><i className="material-icons">toys</i><br/> <span
                    className="hideonresize">{i18n.t("Animations")}</span></button>
                <button
                    className={ this.props.hideTab == 'show' && this.props.categoria == 'exercises' ? 'navButtonPlug active':'navButtonPlug' }
                    title={i18n.t("Exercises")} disabled={false /*disablePlugins*/}
                    onClick={() => {this.openPlugin('exercises') }}><i className="material-icons">school</i><br/> <span
                    className="hideonresize">{i18n.t("Exercises")}</span></button>


                <Dropdown id="dropdown-menu" style={{float:'right'}}>
                    <Dropdown.Toggle noCaret className="navButton">
                        <i className="material-icons">more_vert</i><br/>
                        <span className="hideonresize" style={{fontSize: '12px'}}>Menu</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu id="topMenu" className="pageMenu  super-colors topMenu">
                        <MenuItem disabled={this.props.undoDisabled} eventKey="1">
                            <button className="dropdownButton" title={i18n.t('messages.export_to_HTML')}
                                    disabled={this.props.undoDisabled}
                                    onClick={() => this.props.export() }><i className="material-icons">file_download</i>
                                {i18n.t('messages.export_to_HTML')}
                            </button>
                        </MenuItem>
                        <MenuItem disabled={this.props.undoDisabled} eventKey="2">
                            <button className="dropdownButton" title={i18n.t('messages.export_to_SCORM')}
                                    disabled={this.props.undoDisabled}
                                    onClick={() => this.props.scorm() }><i className="material-icons">class</i>
                                {i18n.t('messages.export_to_SCORM')}
                            </button>
                        </MenuItem>
                        <MenuItem divider/>
                        <MenuItem eventKey="3">
                            <button className="dropdownButton" title={i18n.t('Open_Catalog')}
                                    onClick={() => {
                                        this.props.onVishCatalogToggled();
                                    }}><i className="material-icons">grid_on</i>
                    {i18n.t('Open_Catalog')}
                            </button>
                        </MenuItem>
                        <MenuItem divider/>
                        <MenuItem eventKey="4">
                            <button className="dropdownButton"
                                    onClick={(e) => {
                                        this.props.serverModalOpen()
                                        this.props.opens()
                               }}>
                                <i className="material-icons">folder_open</i>
                                {i18n.t('Open')}
                            </button>
                        </MenuItem>
                    </Dropdown.Menu>
                </Dropdown>

                <div className="navButtons">
                    <button className="navButton"
                            title="Undo"
                            disabled={this.props.undoDisabled}
                            onClick={() => this.props.undo()}>
                        <i className="material-icons">undo</i>
                        <br/>
                        <span className="hideonresize">{i18n.t('Undone')}</span>
                    </button>
                    <button className="navButton"
                            title="Redo"
                            disabled={this.props.redoDisabled}
                            onClick={() => this.props.redo()}>
                        <i className="material-icons">redo</i>
                        <br/>
                        <span className="hideonresize">{i18n.t('Redone')}</span>
                    </button>
                    <button className="navButton"
                            title={i18n.t('Save')}
                            disabled={this.props.undoDisabled }
                            onClick={() => {
                                    this.props.save();
                                    this.props.serverModalOpen();
                                }}>
                        <i className="material-icons">save</i>
                        <br/>
                        <span className="hideonresize">{i18n.t('Save')}</span>
                    </button>
                    <button className="navButton"
                            title={i18n.t('Preview')}
                            disabled={this.props.undoDisabled || (this.props.navItemSelected && isSection(this.props.navItemSelected))}
                            onClick={() =>this.props.visor()}><i className="material-icons">visibility</i>
                        <br/>
                        <span className="hideonresize">{i18n.t('Preview')}</span>
                    </button>
                </div>
            </Col>
            /* jshint ignore:end */
        );
    }
}
