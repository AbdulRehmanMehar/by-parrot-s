import { compose } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { createItem } from '../../store/actions/itemActions';
import { validateName, validatePhoto, validatePrice, validateAddress } from '../../store/actions/validationActions';

class Add extends Component{

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            photo: '',
            price: '',
            category: '',
            description: '',
            isEdit: false,
        };
    }

    componentDidMount() {
        if(this.props.id && this.props.items){
            let item = this.props.items.filter(item => item.id === this.props.id)[0];
            this.setState({ title: item.title });
            this.setState({ price: item.price });
            this.setState({ category: item.category });
            this.setState({ description: item.description });
            this.setState({ isEdit: true });
        }
    }

    setTitle(event) {
        let title = event.target.value;
        this.setState({ title: title });
        this.props.name(title);
    }

    setPhoto(event) {
        let photo = event.target.files[0];
        this.setState({ photo: photo });
        this.props.photo(photo);
    }

    setCategory(event) {
        let category = event.target.value;
        this.setState({ category: category });
    }

    setDescription(event) {
        let desc = event.target.value;
        this.setState({ description: desc });
        this.props.description(desc);
    }

    setPrice(event) {
        let price = event.target.value;
        this.setState({ price: price });
        this.props.price(price);
    }

    submit(event) {
        event.preventDefault();
        this.props.add(this.state);
        this.setState({ title: '' });
        this.setState({ price: '' });
        this.setState({ photo: '' });
        this.setState({ category: '' });
        this.setState({ description: '' });
    }

    render() {
        let options;
        if(this.props.categories)
            options = this.props.categories.map(cat => <option value={cat.id} key={cat.id}>{cat.name}</option>);
        return(
            <form onSubmit={this.submit.bind(this)}>
                <div className="form-row">
                    <div className="form-group col">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" placeholder="Child Raw" onChange={this.setTitle.bind(this)} value={this.state.title} />
                        <small className="form-text text-danger">{this.props.nameError}</small>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="customFile">Photo</label>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="customFile" accept="image/*" onChange={this.setPhoto.bind(this)} />
                            <label className="custom-file-label" id="customFileLabel" htmlFor="customFile">{this.state.photo.name || "Choose photo"}</label>
                        </div>
                        <small className="form-text text-muted">
                            {this.state.isEdit && !this.state.photo ? "Leave empty if not to change." : null}
                        </small>
                        <small className="form-text text-danger">{this.props.photoError}</small>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col">
                        <label htmlFor="category">Category</label>
                        <select className="form-control" id="category" onChange={this.setCategory.bind(this)} value={this.state.category}>
                            <option value="">Uncategorized</option>
                            { options }
                        </select>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" className="form-control" placeholder="10000 Pkr" onChange={this.setPrice.bind(this)} value={this.state.price} />
                        <small className="form-text text-danger">{this.props.priceError}</small>
                    </div> 
                </div> 
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" className="form-control" placeholder="Details..." onChange={this.setDescription.bind(this)} value={this.state.description}></textarea>
                    <small className="form-text text-danger">{this.props.descError}</small>
                </div>
                
                <small className="form-text text-success">{this.props.itemSuccess}</small>
                <small className="form-text text-danger">{this.props.itemError}</small>

                <button type="submit" className="btn btn-info" disabled={
                    !this.state.title ||
                    (!this.state.isEdit && !this.state.photo) ||
                    !this.state.price ||
                    !this.state.description ||
                    this.props.nameError ||
                    this.props.photoError ||
                    this.props.priceError ||
                    this.props.descError                
                }>{this.state.isEdit ? "Update" : "Add"}</button>
            </form>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        itemError: state.item.itemError,
        itemSuccess: state.item.itemSuccess,
        items: state.firestore.ordered.items,
        nameError: state.validator.nameError,
        photoError: state.validator.photoError,
        priceError: state.validator.priceError,
        descError: state.validator.addressError,
        categories: state.firestore.ordered.categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        add: (data) => dispatch(createItem(data)),
        name: (name) => dispatch(validateName(name)),
        price: (val) => dispatch(validatePrice(val)),
        photo: (photo) => dispatch(validatePhoto(photo)),
        description: (val) => dispatch(validateAddress(val)),
    };
};

export default compose(
    firestoreConnect(['categories', 'items']),
    connect(mapStateToProps, mapDispatchToProps),
)(Add);