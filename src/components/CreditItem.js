import React, {PropTypes} from 'react';

export const CreditItem = ({credit}) => {
  return <li className="credit-item">
              <h3 className="section-title">{credit.name}</h3>
              <ul>
                  {credit.credit_details.map((creditDetail, index) => {
                      return <li key={index} className="credit-detail-item">
                              <h4>{creditDetail.name}</h4>
                              <p>{creditDetail.content}</p>
                          </li>
                  })}
              </ul>
         </li>
}

CreditItem.propTypes = {
    credit: React.PropTypes.object.isRequired
};
