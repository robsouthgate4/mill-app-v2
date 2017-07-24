import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

export const ArchiveListItem = (props) => {
    const { archive, client } = props
    return <div className="flex-table-row">
        <Link to={`/archives/${archive.id}`}>
            <div className="flex-table-cell">
                <div>
                    <div className={`boolean-icon enabled_${archive.enabled || true}`}></div>
                </div>
            </div>
            <div className="flex-table-cell thumbnail-cell">
                <img alt="Stream" height="50" src={`${process.env.REACT_APP_API_URL}${archive._links.thumbnail.href}?token=${client.token}`} width="80"/>
            </div>
            <div className="flex-table-cell">
                {archive.name}
            </div>
            <div className="flex-table-cell">
                {archive.brand}
            </div>
            <div className="flex-table-cell">
                film, sport
            </div>
            <div className="flex-table-cell">
                {archive.created_at}
            </div>
        </Link>
    </div>
}
