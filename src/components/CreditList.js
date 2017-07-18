import React, {PropTypes} from 'react';
import { CreditItem } from './'

export const CreditList = ({credits}) => {
    const mappedCredits = credits.map((credit, index) => {
        return <CreditItem key={index} credit={credit}></CreditItem>
    });
    return <ul className="credits">
        {mappedCredits}
    </ul>
}

CreditList.propTypes = {
    credits: React.PropTypes.array.isRequired
};
