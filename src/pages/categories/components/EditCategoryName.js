import React, { Component } from 'react';
import axios from 'axios';
/* Notifications */
import NotificationSystem from 'react-notification-system';
/* Api url */
const api_url = process.env.API_URL;
import {
    Button,
  } from 'reactstrap';

export default class EditCategoryName extends Component {
constructor(props) {
  super(props)

  this.state = {
    showForm: "",
    inputValue: "",
  }
}
createNotification = (type, message) => {
    this.refs.tariffNotification.addNotification({
      message: message,
      level: type,
    });
};

changeCategory = (id) => {
    axios.put(`${api_url}/category/edit`, {
        clientId: localStorage.getItem('clientId'),
        access_token: localStorage.getItem('access_token'),
        name: this.state.inputValue,
        id
    })
    .then(res => {
        console.log(res)
        if(res.status === 200){
            this.setState({
                showForm: !this.state.showForm
            })
            this.createNotification('success', 'Updated successfully');
        }
    })
    .catch(err => {
        console.log(err)
    })
}

toggleForm = () => {
    this.setState({
        showForm: !this.state.showForm   
    })
}

handleInputs = name => event => {
    console.log(name, event.target.value)
    this.setState({ [name]: event.target.value });
};

  render() {
      const { id } = this.props;
      const { showForm, inputValue } = this.state
    return (
      <div>
        { !showForm
            ? 
                (<Button
                    color="info"
                    className="width-100 mb-xs mr-xs"
                    onClick={this.toggleForm}
                >
                    Edit this category
                </Button>)
            : (
                <div>
                    <label htmlFor="new_cat_name">Category name:</label>
                    <br />
                    <input
                        type="text"
                        id="new_cat_name"
                        onChange={this.handleInputs("inputValue")}
                    />
                    <br />
                    <br />
                    <Button
                        color="success"
                        className="width-100 mb-xs mr-xs"
                        onClick={() => this.changeCategory(id)}
                        >
                        Save
                    </Button>
                </div>    
            )
        }
        <NotificationSystem ref="tariffNotification" />
      </div>
    )
  }
}
