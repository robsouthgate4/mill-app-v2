import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

import Img from 'react-image'

import { Spinner } from './'

export const ArchiveListItem = (props) => {

    const { archive, client } = props
    const image = `${process.env.REACT_APP_API_URL}${archive._links.thumbnail.href}?token=${client.token}`

    return <div className="flex-table-row">
        <Link to={`/archives/${archive.id}`}>
            <div className="flex-table-cell">
                <div>
                    <div className={`boolean-icon enabled_${archive.sync_to_device || false}`}></div>
                </div>
            </div>
            <div className="flex-table-cell thumbnail-cell">
                <Img
                    height="50"
                    width="80"
                    alt={archive.name}
                    src={[image, 'http://placehold.it/80x50']}
                    loader={<Spinner classes="visible mini-screen mini-loader" />}/>
            </div>
            <div className="flex-table-cell">
                {archive.name}
            </div>
            <div className="flex-table-cell">
                {archive.metadata.brand}
            </div>
            <div className="flex-table-cell">
                {archive.categories.map((category, index) =>
                    <span key={index}>{category.name}{ index !== archive.categories.length - 1 ? ', ' : ' '}&nbsp;</span>)
                }
            </div>
            <div className="flex-table-cell">
                {archive.created_at}
            </div>
        </Link>
    </div>
}
