import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

export const ArchiveListItem = (props) => {
    const { archive } = props
    return <div className="flex-table-row">
        <Link to={`/archives/${archive.id}`}>
            <div className="flex-table-cell">
                <div>
                    <div className={`boolean-icon enabled_0`}></div>
                </div>
            </div>
            <div className="flex-table-cell thumbnail-cell">
                <img alt="Stream" height="50" src={`${process.env.REACT_APP_API_URL}${archive._links.thumbnail.href}`} width="80"/>
            </div>
            <div className="flex-table-cell">
                {archive.name}
            </div>
            <div className="flex-table-cell">
                <div>
                    <div>
                        The Mill
                    </div>
                </div>
            </div>
            <div className="flex-table-cell">
                <div>
                    film, sport
                </div>
            </div>
            <div className="flex-table-cell">
                <div>
                    11th Jul 17, 23:19
                </div>
                <div>
                    &nbsp;
                </div>
            </div>
        </Link>
    </div>
}
