import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { validateName } from '../../store/actions/validationActions';
import { createCategory, updateCategory } from '../../store/actions/itemActions';


class Add extends Component{
    constructor() {
        super();
        this.state = {
            name: '',
            parent: '',
            isEdit: false
        };
    }

    componentDidMount() {
        if (this.props.id && this.props.categories){
            let category = this.props.categories.filter(cat => cat.id === this.props.id)[0];
            this.setState({ id: this.props.id });
            this.setState({ name: category.name });
            this.setState({ parent: category.parent });
            this.setState({ isEdit: true });
        }
    }

    setName(event) {
        let name = event.target.value;
        this.setState({ name: name });
        this.props.name(name);
    }

    setParent(event) {
        let parent = event.target.value;
        this.setState({ parent: parent });
    }

    submit(event) {
        event.preventDefault();
        if(this.state.isEdit){
            this.props.update(this.state);
        }else{
            this.props.create(this.state);
        }
        setTimeout(() => {
            this.setState({ name: '' });
            this.setState({ parent: '' });
        }, 1000);
    }

    render() {
        let options;
        if(this.props.categories !== undefined)
            options = this.props.categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>);
        return (
            <form onSubmit={this.submit.bind(this)}>
                <div className="form-group">
                    <label htmlFor="name">Category Name</label>
                    <input type="text" id="name" className="form-control" placeholder="Red Eyes" onChange={this.setName.bind(this)} value={this.state.name} />
                    <small className="form-text text-danger">
                        {this.props.nameError || this.props.categoryError}
                    </small>
                    <small className="form-text text-success">
                        {this.props.categorySuccess}
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="parent">Parent Category</label>
                    <select id="parent" className="form-control" placeholder="Australian Parrots" onChange={this.setParent.bind(this)} value={this.state.parent}>
                        <option value="">None</option>
                        {options}
                    </select>
                </div>
                <button type="submit" className="btn btn-info" disabled={
                    !this.state.name ||
                    this.props.nameError
                }>{this.state.isEdit ? "Update" : "Add" }</button>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        nameError: state.validator.nameError,
        categoryError: state.item.categoryError,
        categorySuccess: state.item.categorySuccess,
        categories: state.firestore.ordered.categories
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        name: (name) => dispatch(validateName(name)),
        create: (category) => dispatch(createCategory(category)),
        update: (category) => dispatch(updateCategory(category))
    }
};

export default compose(
    firestoreConnect(['categories']),
    connect(mapStateToProps, mapDispatchToProps),
)(Add);