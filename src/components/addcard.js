import React, { PureComponent } from 'react';
import luhn from 'luhn';
import PropTypes from 'prop-types';

/**
 * Helper function to check empty strings.
 * @function isEmpty
 */
const isEmpty = (str) => (str === '' || str === null);

/**
 * Validate form object for values and errors
 * @function formValid
 */
const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    // validate form errors being empty
    Object.values(formErrors).forEach(val => { val.length > 0 && (valid = false) });
    // validate the form was filled out
    Object.values(rest).forEach(val => { val === null && (valid = false) });
    return valid;
};

/**
 * Add credit card
 * @class AddCard
 */
class AddCard extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            number: null,
            limit: null,
            formErrors: {
                name: '',
                number: '',
                limit: ''
            }
        };

        // validaiton rules
        this.rules = {
            name: /^([a-z]|[a-z]\s{0,1}[a-z])+$/i,
            number: luhn.validate,
            limit: /^[0-9]+$/,
        };
    }

    static defaultProps = {
        onAddCard: PropTypes.func.isRequired  
    };
    
    /**
     * Add new card
     * @function handleSubmit
     */
    handleSubmit = (e) => {
        e.preventDefault();

        if (formValid(this.state)) {
            const jsonData = JSON.stringify(this.state);
            /**
             * POST request with new card details
             * @funtion addItem
             */
            (async () => {
                const rawResponse = await fetch('http://localhost:5000/api/add', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: jsonData // data
                });

                const result = await rawResponse.json();
                
                if (result.success) {
                    this.props.onAddCard(result.cards);
                    this.myFormRef.reset();
                } else {
                    console.log('error adding card details', result.message);
                }

            })();
        }
    }

    /**
     * Validate fields on change
     * @function handleChange
     */
    handleChange = e => {
        const { name, value } = e.target;
        const { rules } = this;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'name':
                formErrors.name = !isEmpty(value) && rules.name.test(value) ? '' : 'Please enter valid name';
                break;
            case 'number':
                formErrors.number = value.length >= 15 && value.length <= 19 && rules.number(value) ? '' : 'Please enter valid card number';
                break;
            case 'limit':
                formErrors.limit = !isEmpty(value) && rules.limit.test(value) ? '' : 'Please enter valid limit';
                break;
            default:
                break;
        }

        // update state
        this.setState({
            formErrors,
            [name]: value
        });
    }

    /**
     * Render markup
     */
    render() {
            const {
                formErrors
            } = this.state;
            return (
                <div className="row text-left">
                    <h4 className="col-12"> Add Card</h4>
                    <hr className="mb-4" />
                    <form
                        className="col-8 my-4 text-left"
                        noValidate
                        onSubmit={ this.handleSubmit }
                        ref={(el) => this.myFormRef = el}
                        >
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className={ `form-control input-name ${!isEmpty(formErrors.name) ? 'error' : '' }` } id="name" name="name" placeholder="Name" onChange={ this.handleChange } />
                            {
                                !isEmpty(formErrors.name) && ( <span className="invalid-feeback name-error error"> { formErrors.name } </span>)
                            } 
                        </div>
                        <div className="form-group">
                            <label htmlFor="number">Card Number</label>
                            <input type="text" className={ `form-control input-number ${!isEmpty(formErrors.number) ? 'error' : '' }` } id="cardnumber" name="number" placeholder="Card number" onChange={ this.handleChange } />
                            {
                                !isEmpty(formErrors.number) && ( <span className="invalid-feeback error"> { formErrors.number } </span> ) 
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="limit"> Limit</label>
                            <input type="text" className={ `form-control input-limit ${!isEmpty(formErrors.limit) ? 'error' : '' }` } id="limit" name="limit" placeholder="0000" onChange={ this.handleChange } />
                            {
                                !isEmpty(formErrors.limit) && ( <span className="invalid-feeback error"> { formErrors.limit } </span> ) 
                            }
                        </div>
                        <div className="row p-3">
                            <button type="submit" className="btn btn-primary btn-md w-50"> Add </button>
                        </div>
                    </form>
                </ div>);
        }
};

export default AddCard;