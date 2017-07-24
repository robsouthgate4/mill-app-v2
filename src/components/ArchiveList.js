import React, { PropTypes } from 'react'
import {ArchiveListItem} from './ArchiveListItem'

export const ArchiveList = (props) => {
    const { archives, requesting, client } = props
    if (requesting) return <div>Loading archives...</div>
    return (
        <div className="flex-table archive-list">
            <div className="flex-table-header">
                <div className="flex-table-cell">On iPad</div>
				<div className="flex-table-cell">Thumbnail</div>
				<div className="flex-table-cell"><div className=""><a href="" title="Title">Title</a></div></div>
				<div className="flex-table-cell"><div className=""><a href="" title="Brand">Brand</a></div></div>
				<div className="flex-table-cell">Categories</div>
				<div className="flex-table-cell">Date added</div>
			</div>
            {
                archives.map((archive, i) => <ArchiveListItem
                    key={archive.id}
                    client={client}
                    onArchiveLoad={props.handle}
                    archive={archive} />)
            }
        </div>
    )
}

ArchiveList.propTypes = {
    archives: React.PropTypes.array.isRequired
}
