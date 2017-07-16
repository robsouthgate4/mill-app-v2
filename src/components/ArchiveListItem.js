import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export const ArchiveListItem = (props) => {
    return <div className="flex-table-row">
            <a href="/en/admin/archives/91137/edit">
                <div className="flex-table-cell">
                    <div>
                        <div className="boolean-icon enabled_0"></div>
                    </div>
                </div>
                <div className="flex-table-cell thumbnail-cell">
                    <img alt="Stream" height="50" src="https://mill-touch-api-dev.themill-dev.com/api/images/thumbnails/91137/stream" width="80"/>
                </div>
                <div className="flex-table-cell">
                    Move.Me Hoova Teaser
                    <input disabled="disabled" id="archives_0_metadata_title" name="archives[0][metadata][title]" type="hidden" value="Move.Me Hoova Teaser"/>
                    <div className="flex-table-cell">
                        <div>
                            <div>
                                The Mill
                                <input disabled="disabled" id="archives_0_metadata_brand" name="archives[0][metadata][brand]" type="hidden" value="The Mill"/>
                            </div>
                            <div className="flex-table-cell">
                                <div>
                                    <input disabled="disabled" id="archives_0_categories" name="archives[0][categories]" type="hidden" value=""/>
                                </div>
                            </div>
                            <div className="flex-table-cell">
                                <div>
                                    11th Jul 17, 23:19
                                    <input disabled="disabled" id="archives_0_metadata_created" name="archives[0][metadata][created]" type="hidden" value="11th Jul 17, 23:19"/>
                                </div>
                                <div>
                                    &nbsp;
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    }
