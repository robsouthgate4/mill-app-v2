import React, {PropTypes} from 'react';

export const CategoryListItem = (props) => {
    const { category } = props
    return <div className="flex-table-row">
                <div className="flex-table-cell">
                    <div className={`boolean-icon enabled_${category.enabled || true}`}></div>
                </div>
                <div className="flex-table-cell category-cell">{category.name}</div>
                <div className="flex-table-cell">{category.archive_count}</div>
            </div>
}

CategoryListItem.propTypes = {
    category: React.PropTypes.object.isRequired
};
