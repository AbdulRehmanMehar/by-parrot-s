import { compose } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';


class Home extends Component{
    render(){
        let items = 'No Item was found';
        if (this.props.items !== undefined && this.props.categories !== undefined){
            items = this.props.items.map(item => {
                let category = this.props.categories.filter(cat => cat.id === item.category)[0];
                return (
                    <div className="m-1" id={`item-${item.id}`} key={item.id}>
                        <img className="mr-3 d-block" src={item.photo} width="200" alt={item.name} style={{ float: 'left' }} />
                        <div>
                            <h3>{item.title}</h3>
                            <span class="badge badge-light">{ category ? category.name : 'Uncategorized'}</span>
                            <br />
                            Price: <b>{item.price}</b>
                            <p>{item.description}</p>
                        </div>
                        <div style={{ clear: 'both' }}></div>
                        <hr />
                    </div>
                )
            });
        }
        return(
            <div className="container">
                <h2>Authentication &amp; CRUD using React and Firebase</h2>
                <p>Register or Login to create or remove Items. This is for testing purposes only.</p>
                <hr />
                {items}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.firestore.ordered.items,
        categories: state.firestore.ordered.categories,    
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(['items', 'categories'])
)(Home);