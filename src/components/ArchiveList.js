import React, { PropTypes } from 'react'
import {ArchiveListItem} from './ArchiveListItem'

export const ArchiveList = (props) => {
    return (
        <div className="flex-table archive-list">
            <ArchiveListItem {...props}></ArchiveListItem>
        </div>
    )
}
