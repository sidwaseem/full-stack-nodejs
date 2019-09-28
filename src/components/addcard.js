import React from 'react';

const AddCard = () => {
    return (
        <form>
            <div className="form-group">
                <label for="cardname">Name</label>
                <input type="text" className="form-control" id="cardname" placeholder="Name" />
            </div>
            <div className="form-group">
                <label for="cardname">Card Number</label>
                <input type="text" className="form-control" id="cardnuber" placeholder="Card number" />
            </div>
            <div className="form-group">
                <label for="cardname">Limit</label>
                <input type="text" className="form-control" id="limit" />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">Add</button>
            </div>
    </form>
    );
};

export default AddCard;
