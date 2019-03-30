import { connect } from 'react-redux';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Add from './Add';
import View from './View';

class Item extends Component {
    render() {
        let header,
            component;
        let params = new URLSearchParams(this.props.location.search);
        if (!this.props.auth.uid) return <Redirect to="/login" />;
        if (this.props.profile.admin !== undefined && !this.props.profile.admin) 
            return <Redirect to="/dashboard" />;
        if (params.get('section') === null) {
            header = 'Manage Items';
        }else{
            header = <span>
                <Link to="/manage-items">
                    Manage Items
                </Link> /
                <span style={{textTransform: 'capitalize'}}> {params.get('section')}</span>
            </span>;
        }

        if(params.get('section') === 'add'){
            component = <Add />
        }else if(params.get('section') === 'edit'){
            component = <Add id={params.get('id')} />
        }else if(params.get('section') === 'view'){
            component = <View />
        }else{
            component = <div>
                <p>
                    In this section, you'll be creating, modifying or deleting Items.
                </p>
                <Link to="/manage-items?section=add" className="btn btn-info mr-2">
                    Add Item
                </Link>
                <Link to="/manage-items?section=view" className="btn btn-info mr-2">
                    View Items
                </Link>
            </div>;
        }

        return (
            <div className="container mt-4">
                <div className="card" style={{ maxWidth: 70 + '%', margin: '0 auto' }}>
                    <div className="card-header">{header}</div>
                    <div className="card-body">{component}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    };
};

export default connect(mapStateToProps)(Item);