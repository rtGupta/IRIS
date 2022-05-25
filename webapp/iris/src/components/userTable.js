import React from "react";
import APIHelper from "../apis/APIHelper";
import { slideDown, slideUp } from '../pages/anim';
import { withRouter } from "../utils/withRouter";
import { connect } from "react-redux";
import { editUser as editUserAction } from "../redux/actions/user-actions";

function refreshPage() {
    window.location.reload(false);
}

function capitalize(str) {  
    // console.log('here');
    return str.split(' ').map(s => {
        return s.charAt(0).toUpperCase() + s.substr(1);
    }).join(' ');
};

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (userObj) => dispatch(editUserAction(userObj))
    };
}

class UserTableRow extends React.Component {
    
    state = { expanded: false }
    
    handleEdit = (user) => {
        this.props.editUser(user);
        this.props.navigate("/signUp");
    }

    handleDelete = (user) => {
        // console.log(user)
        APIHelper.deleteUser(user).then((data) => {
            console.log(data);
        });
        refreshPage();

    };

    toggleExpander = (e) => {
        if (e.target.type === 'checkbox') return;

        if (!this.state.expanded) {
            this.setState(
                { expanded: true },
                () => {
                    if (this.refs.expanderBody) {
                        slideDown(this.refs.expanderBody);
                    }
                }
            );
        } else {
            slideUp(this.refs.expanderBody, {
                onComplete: () => { this.setState({ expanded: false }); }
            });
        }
    }

    render() {
        console.log(this.props.user);
        const user = this.props.user;
        return [
            <tr key="main">
                <td className="uk-text-nowrap">{this.props.index}.</td>
                <td><img className="uk-preserve-width uk-border-circle" src="../assets/user.jpg" width={48} alt="avatar" /></td>
                <td>{capitalize(user.firstName + ' ' + user.lastName)}<br /><small>{user.emailID}</small></td>
                <td>{capitalize(user.role)}</td>
                <td><button className="drop-down" onClick={this.toggleExpander}>
                {/* <FontAwesomeIcon className="fa-thin fa-angle-down" /> */}
                <i className="fa-solid fa-angle-down"></i>
                    </button>
                <button className="edit-btn" onClick={this.handleEdit.bind(user, user)}>
                    <i className='fa-solid fa-edit'></i>
                </button>
                <button className="trash-btn" onClick={this.handleDelete.bind(user, user)}>
                <i className="fa-solid fa-trash"></i>
                </button></td>
            </tr>,
            this.state.expanded && (
                <tr className="expandable" key="tr-expander">
                    <td className="uk-background-muted" colSpan={6}>
                        <div ref="expanderBody" className="inner uk-grid">
                            <div className="uk-width-1-4 uk-text-center">
                                <img className="uk-preserve-width uk-border-circle" width={190} src="../assets/user.jpg" alt="avatar" />
                            </div>
                            <div className="uk-width-3-4">
                                <h3>{capitalize(user.firstName + ' ' + user.lastName)}</h3>
                                <p>
                                    Address:<br />
                                    <i>
                                        {capitalize(user.address)}<br />
                                    </i>
                                </p>
                                <p>
                                    E-mail: <br />
                                    <i>
                                        {user.emailID}<br />
                                    </i>
                                </p>
                                <p>
                                    Phone: <br />
                                    <i>
                                        {user.phoneNumber}<br />
                                    </i>
                                </p>
                                <p>
                                    Role: <br />
                                    <i>
                                        {user.role}<br />
                                    </i>
                                </p>
                                <p>
                                    ZipCode Min : <br />
                                    <i>
                                        {user.zipCodeMin}<br />
                                    </i>
                                </p>
                                <p>
                                    ZipCode Max : <br />
                                    <i>
                                        {user.zipCodeMax}<br />
                                    </i>
                                </p>
                            </div>
                        </div>
                    </td>
                </tr >
            )
        ];
    }
}

export default connect(null, mapDispatchToProps)(withRouter(UserTableRow));
