import React, { Fragment } from 'react';

/**
 * Render cards list
 * @function List
 */
function List(props) {

    /**
     * Render JSX
     */
    return (
        <Fragment>
            <hr className="mb-4" />
            <h4 className="my-5">Existing Cards</h4>
            <div className="row">
                <table className="table cards-wrapper">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Card Number</th>
                            <th scope="col">Balance</th>
                            <th scope="col">Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            props.cards ? (
                                props.cards.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.number}</td>
                                            <td>&pound; {item.balance}</td>
                                            <td>{item.limit}</td>
                                        </tr>);
                                })    
                            )
                            :
                            (<tr><td colSpan="4">No Records found.</td></tr>)
                        }
                    </tbody>
                </table>
            </div>
        </Fragment>);
}

export default List;
