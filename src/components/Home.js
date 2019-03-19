import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component{
    render(){
        let items = this.props.items.map(item => (
            <div id={`item-${item.id}`}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
            </div>
        ));
        return(
            <div className="container">
                <h1>Hello World!</h1>
                {items}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.item.items
    };
};

export default connect(mapStateToProps)(Home);