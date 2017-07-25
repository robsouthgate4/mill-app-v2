import React, { PropTypes } from 'react'
import { ArchiveListItem } from './ArchiveListItem'
import ReactPaginate from 'react-paginate';

import { Spinner, ScrollToTopOnMount } from './'

export const ArchiveList = (props) => {

    const { archives,
            requesting,
            client,
            onPageClick,
            page,
            totalArchives,
            limit} = props

    const pageCount = Math.ceil(totalArchives / limit) //TODO: update to actual totals.

    return (

        <div className="archive-list-container">

            {requesting && <ScrollToTopOnMount/>}

            <Spinner classes={`spinner-screen ${requesting ? 'visible' : ''}`} />

            <div className={`flex-table archive-list ${requesting ? 'hidden-with-opacity' : ''}`}>
                <div className="flex-table-header">
                    <div className="flex-table-cell">On iPad</div>
    				<div className="flex-table-cell">Thumbnail</div>
    				<div className="flex-table-cell"><div className=""><a href="" title="Title">Title</a></div></div>
    				<div className="flex-table-cell"><div className=""><a href="" title="Brand">Brand</a></div></div>
    				<div className="flex-table-cell">Categories</div>
    				<div className="flex-table-cell">Date added</div>
    			</div>
                {
                    archives.map((archive, i) =>
                        <ArchiveListItem
                            key={archive.id}
                            client={client}
                            onArchiveLoad={props.handle}
                            archive={archive} />)
                }
            </div>
            <ReactPaginate
                previousLabel={""}
                initialPage={page}
                forcePage={page}
                nextLabel={""}
                breakLabel={<a href="">...</a>}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={onPageClick}
                containerClassName={"archive-pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
        </div>
    )
}

ArchiveList.propTypes = {
    archives: React.PropTypes.array.isRequired
}
