import React from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import { archiveRequestById } from '../archives/actions'

export class ArchiveDetail extends React.Component {

    constructor(props) {
        super(props)
        this.fetchById(props.match.params.id)
    }

    fetchById = (id) => {
        const {client, archiveRequestById} = this.props
        //if (client && client.token)
        this.props.archiveRequestById(client, id)
    }

    render() {
        const {
            archives:{
                archiveById,
                requesting,
                successful,
                messages,
                errors
            }
        } = this.props

        if(archiveById === null) return <div>Loading archive...</div>

        console.log(archiveById)

        return <div className="edit-archive-container preview">

            <div className="content">
                <div>
                    <div className="video-overlay thumbnail">
                        <span className="icon_camera"></span>
                        <span>Change thumbnail</span>
                    </div>

                    <div className="video-overlay video-play">
                        <span className="mill-icons_play"></span>
                    </div>

                    <img alt="Stream" className="archive-video-thumbnail" src={`${process.env.REACT_APP_API_URL + archiveById._links.thumbnail.href}`}/>
                </div>
                <div className="padding_top_5px padding_bottom_5px">
                    <div className="field">
                        <div className="clear"></div>
                    </div>
                    <div className="field">
                        <input className="medium left image-upload margin_left_10px" id="image" name="image" type="file"/>
                        <div className="clear"></div>
                    </div>
                </div>

                <div className="field">
                    <div className="left">
                        <label htmlFor="archive_metadata_title">Title</label>
                    </div>
                    <div className="left">

                        <input className="large content-edit" id="archive_metadata_title" name="archive[metadata][title]" type="text" value="Move.Me Hoova Teaser"/>
                        <p className="content-preview">Move.Me Hoova Teaser</p>

                    </div>
                    <div className="clear"></div>
                </div>

                <div className="field">
                    <div className="left">
                        <label htmlFor="archive_metadata_brand">Brand</label>
                    </div>
                    <div className="left">

                        <input className="large content-edit" id="archive_metadata_brand" name="archive[metadata][brand]" type="text" value="The Mill"/>
                        <p className="content-preview">The Mill</p>

                    </div>
                    <div className="clear"></div>
                </div>

                <div className="field">
                    <div className="left">
                        <label htmlFor="archive_metadata_intro">Intro</label>
                    </div>
                    <div className="left">
                        <textarea className="large content-edit" id="archive_metadata_intro" name="archive[metadata][intro]" rows="3"></textarea>
                        <p className="content-preview"></p>
                    </div>
                    <div className="clear"></div>
                </div>

                <div className="field">
                    <div className="left">
                        <label htmlFor="archive_metadata_summary">Summary</label>
                    </div>
                    <div className="left">
                        <textarea className="large content-edit" id="archive_metadata_summary" name="archive[metadata][summary]" rows="10"></textarea>
                        <p className="content-preview"></p>
                    </div>
                    <div className="clear"></div>
                </div>

                <div className="field">
                    <div className="left">
                        <label htmlFor="archive_metadata_created">Date</label>
                    </div>
                    <div className="left">
                        <input className="large content-edit" id="archive_metadata_created" name="archive[metadata][created]" type="text" value="11th Jul 17, 23:19"/>
                        <p className="content-preview">11th Jul 17, 23:19</p>
                    </div>
                    <div className="clear"></div>
                </div>

                <div className="field">
                    <label>Files</label>
                    <div>
                        <p>TheMill_MoveMeHoovaTeaser_129697658_1280.mp4 - video/mp4 - 10 MB</p>
                    </div>
                </div>

                <div className="field">
                    <label>Beam ID</label>
                    <p>129697658</p>
                </div>

            </div>

            <div className="sidebar">

                <div className="edit-button-container">
                    <button id="editArchiveBtn" className="default-btn white-btn cancel" type="button" name="button">Edit</button>
                    <input className="default-btn black-btn save" name="commit" type="submit" value="Save Changes"/>
                </div>

                <div className="ipad-push-container">

                    <h3 className="section-title">Available on iPad</h3>

                    <div className="boolean-icon enabled_0"></div>

                    <div className="toggleSwitch push-ipad">

                        <input id="archive_enabled" name="archive[enabled]" type="hidden" value="0"/>
                        <input className="syncVideo ipad-push-checkbox toggleSwitch-checkbox" id="archive_enabled" name="archive[enabled]" type="checkbox" value="1"/>
                        <label className="toggleSwitch-label push" htmlFor="">
                            <span className="toggleSwitch-inner"></span>
                            <span className="toggleSwitch-switch"></span>
                        </label>
                    </div>

                </div>

                <div className="url">

                    <h3 className="section-title">Share Url</h3>

                    <input className="large content-edit" id="archive_metadata_article_url" name="archive[metadata][article_url]" rows="10" type="text" value=""/>
                    <p className="content-preview"></p>

                </div>

                <div className="categories">

                    <h3 className="section-title">Categories</h3>

                    <input id="archive_categories" name="archive[categories]" type="text" value="" className="tagit-hidden-field"/>
                    <ul className="tagit ui-widget ui-widget-content ui-corner-all">
                        <li className="tagit-new"><input type="text" className="ui-widget-content ui-autocomplete-input" autoComplete="off"/></li>
                    </ul>
                </div>

                <div className="credit-container">
                    <div>
                        <div id="archive_credit_build">

                            <div className="nested_fields">

                                <fieldset className="fields">
                                    <input id="archive_archive_credits_attributes_clone_key__destroy" name="archive[archive_credits_attributes][clone_key][_destroy]" type="hidden" value="1"/>
                                    <span>Credits</span>

                                    <div className="actions">
                                        <a href="javascript:void(0)" title="Remove section">Remove section</a>
                                    </div>

                                    <input className="credit-heading-field" id="archive_archive_credits_attributes_clone_key_name" name="archive[archive_credits_attributes][clone_key][name]" type="text"/>
                                    <h3 className="section-title"></h3>

                                    <fieldset className="fields inner-fields">
                                        <div>

                                            <div id="archive_credit_detail_clone_key_build">
                                                <div className="nested_fields repeater">
                                                    <input id="archive_archive_credits_attributes_clone_key_archive_credit_details_attributes_clone_key__destroy" name="archive[archive_credits_attributes][clone_key][archive_credit_details_attributes][clone_key][_destroy]" type="hidden" value="1"/>
                                                    <div className="credit-repeater">
                                                        <div className="title">
                                                            <label htmlFor="archive_archive_credits_attributes_clone_key_archive_credit_details_attributes_clone_key_name">Credit title</label>
                                                            <input className="" id="archive_archive_credits_attributes_clone_key_archive_credit_details_attributes_clone_key_name" name="archive[archive_credits_attributes][clone_key][archive_credit_details_attributes][clone_key][name]" type="text"/>
                                                            <p></p>
                                                        </div>
                                                        <div className="content">
                                                            <label htmlFor="archive_archive_credits_attributes_clone_key_archive_credit_details_attributes_clone_key_content">Content</label>
                                                            <input className="" id="archive_archive_credits_attributes_clone_key_archive_credit_details_attributes_clone_key_content" name="archive[archive_credits_attributes][clone_key][archive_credit_details_attributes][clone_key][content]" type="text"/>
                                                            <p></p>
                                                        </div>
                                                        <div className="actions repeater-actions">
                                                            <a href="javascript:void(0)" title="">
                                                                <i className="mill-icons_circle-close"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="archive_credit_detail_clone_key_clone"></div>
                                        </div>
                                        <div className="archive_credit_detail_actions">
                                            <a href="javascript:void(0)" className="add-credit-btn" title="Add Credit">Add Credit</a>
                                        </div>
                                    </fieldset>

                                </fieldset>
                            </div>
                        </div>
                        <div id="archive_credit_clone"></div>

                    </div>
                    <div className="archive_credit_actions">
                        <a href="javascript:void(0)" className="default-btn grey-btn" title="Add Credits section">Add Credits section</a>
                    </div>
                </div>

            </div>

        </div>;
    }
}

// Pull in both the Client and the Archives state
const mapStateToProps = (state, ownProps) => ({
    archives: state.archives,
    archiveById: state.archives.archiveById
})

const connected = withRouter(connect(mapStateToProps, {archiveRequestById})(ArchiveDetail))

export default connected
