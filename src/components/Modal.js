import React, {PropTypes} from 'react';

export const Modal = (props) => {
    const { classes, onCloseClick } = props
    return <div className={classes}>
                <div className="modal-inner">
                    <i onClick={() => onCloseClick()} className="close-modal mill-icons_close"></i>
                    {props.children}
                </div>
            </div>
}
