import React, { Component } from 'react'
import axios from 'axios';
import {
    Row,
    Col,
    Breadcrumb,
    BreadcrumbItem,
    Badge,
    Button,
    Table,
    Form,
    InputGroup,
  } from 'reactstrap';
import { Link } from 'react-router-dom';
import Widget from '../../components/Widget';
import { connect } from 'react-redux';
import EditCategoryName from './components/EditCategoryName';
/* Actions */
import { setCategory } from '../../actions/category';
import { logOut } from '../../actions/user';
/* Notifications */
import NotificationSystem from 'react-notification-system';
/* Api url */
const api_url = process.env.API_URL;

class CategorieEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      category: null,
      categoryName: "",
      categoryId: "",
      categoryChildren:  [],
      categoryParent: "",
      displayForm: false,
      showModal: false,
      newcatName: "",
      catType: false
    }
  }

  componentDidMount() {
    this.updateData();
  };
  
  createNotification = (type, message) => {
    this.refs.tariffNotification.addNotification({
      message: message,
      level: type,
    });
  };

  updateData = () => {
    const category = JSON.parse(localStorage.getItem('category'));
    //console.log(category)
    this.setState({
      category: category,
      categoryName: category.name || "",
      categoryId: category._id || "",
      categoryChildren: category.children || "",
      categoryParent: category.parent || "",
      showModal: false,
    }, () => this.getParentType(category));


  };

  onEditClick = (child) => {
    this.props.setCategory(child);
    this.updateData()
  }

  addKindCategory = () =>{
    let reqData = {
      clientId: localStorage.getItem('clientId'),
      access_token: localStorage.getItem('access_token'),
      name: this.state.newcatName,
      parent: this.state.category._id
    }
    console.log(reqData)
    axios.post(`${api_url}/category/insert/subcategory`, reqData)
    .then(res => {
        console.log(res);
        this.createNotification('success', 'Added successfully');
        this.getCategoryList();
        this.props.setCategory(this.state.category._id)
        this.setState({
          displayForm: false
        })
    })
    .catch(err => {
      if(err.response && err.response !== undefined){
        if(err.response.status === 400){
          this.createNotification('error', err.response.data.error_message); 
        }  
      }
    })
  }
  
  addSubCategory = () => {
    let reqData = {
      clientId: localStorage.getItem('clientId'),
      access_token: localStorage.getItem('access_token'),
      name: this.state.newcatName,
      parent: this.state.category._id
    }
    axios.post(`${api_url}/category/insert/category`, reqData)
    .then(res => {
        console.log(res);
        if(res.status === 200){
          this.createNotification('success', 'Added successfully');
          
          this.handleSetCategory(this.state.category._id)
          
        }
    })
    .catch(err => {
      if(err.response && err.response !== undefined){
        if(err.response.status === 400){
          this.createNotification('error', err.response.data.error_message); 
        }  
      }
    })
  }

  getParentType = (category) => {

    console.log('w')
    axios.post(`${api_url}/category/path`, {
      clientId: localStorage.getItem('clientId'),
      access_token: localStorage.getItem('access_token'),
      id: category._id
    })
    .then(res => {
      console.log(res)
      if(res.data.result.stringified.split('///').length === 1){
        this.setState({
          catType: true
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  deleteCategory = (id) => {
    let data = {
      clientId: localStorage.getItem('clientId'),
      access_token: localStorage.getItem('access_token'),
      id
    }
    let headers = {
      "Content-Type": "application/json"
    }
    fetch(`${api_url}/category/delete`, {
        method: "DELETE",
        headers: headers,
        body:  JSON.stringify(data)
    })
    .then(response => { 
      console.log(response)
      this.handleSetCategory(this.state.category._id)
      return response.json(); 
    })
    .then(data =>{ 
        this.createNotification('success', data.result);
        console.log(data)
    });
    
  }


  handleSetCategory = (id) => {
    console.log('handle')
    this.props.setCategory(id);
    this.setState({
      displayForm: false
    })  
    
  }

  showForm = () =>{
    this.setState({
      displayForm: !this.state.displayForm
    })
  }

  handleInputs = name => event => {
    this.setState({ [name]: event.target.value });
  };


  render() {
    const { 
      category, 
      categoryName, 
      categoryChildren, 
      displayForm,
      catType
     } = this.state;

    if(categoryChildren.length !== 0){
      return (
        <div>
          {console.log(catType)}
          {console.log(this.state.category.type)}
          <Breadcrumb>
            <BreadcrumbItem active>Edit category tree: </BreadcrumbItem>
          </Breadcrumb>
  
          <h2 className="page-title mb-lg">{categoryName}</h2>
  
          <Row>
            <Col sm={12}>
              <Widget settings close>
                  <div className="table-responsive">
                    <Table borderless className="table-hover mainTable">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>ID</th>
                          <th>Subcategories count</th>
                          <th>Parent name</th>
                          <th>Parent ID</th>
                          <th />
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                      {categoryChildren.map(child => (
                        <tr key={child._id}>
                          <td>
                            <div className="mb-0">
                              <small>
                                <span className="fw-semi-bold">ID:</span>
                                <p className="text-muted">{child._id}</p>
                              </small>
                            </div>
                          </td>

                          <td>
                            <div className="mb-0">
                              <small>
                                <span className="fw-semi-bold">Category name:</span>
                                <p className="text-muted">{child.name}</p>
                              </small>
                            </div>
                          </td>

                          <td>
                            <div className="mb-0">
                              <small>
                                <span className="fw-semi-bold">Category childs:</span>
                                <p className="text-muted">{child.children.length}</p>
                              </small>
                            </div>
                          </td>

                          <td>
                            <div className="mb-0">
                              <small>
                                <span className="fw-semi-bold">Parent category:</span>
                                <p className="text-muted">{categoryName}</p>
                              </small>
                            </div>
                          </td>

                          <td>
                            <div className="mb-0">
                              <small>
                                <span className="fw-semi-bold">Parent category ID:</span>
                                <p className="text-muted">{child.parent}</p>
                              </small>
                            </div>
                          </td>

                          <td>
                            <Link to={`/admin/category_edit/${child._id}`}>
                              {/* eslint-disable-line */}
                              <Button
                                color="primary"
                                className="width-100 mb-xs mr-xs"
                                onClick={() => this.onEditClick(child)}
                              >
                                Edit
                              </Button>
                            </Link>
                          </td>

                          <td>
                            <EditCategoryName 
                              id={child._id}
                            />
                          </td>    

                          <td>
                            <Button
                              color="danger"
                              className="width-100 mb-xs mr-xs"
                              onClick={() => this.deleteCategory(child._id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {
                    displayForm
                      ?(
                        <React.Fragment>
                          <label htmlFor="new_cat_name">Category name:</label>
                          <br />
                          <input
                            type="text"
                            id="new_cat_name"
                            onChange={this.handleInputs("newcatName")}
                          />
                          <br />
                          <br />
                          <Button
                            color="success"
                            className="width-100 mb-xs mr-xs"
                            onClick={this.addSubCategory}
                          >
                            Add new subcategory
                          </Button>
                        </React.Fragment>
                      )
                      :(
                        <Button
                          color="success"
                          className="width-100 mb-xs mr-xs"
                          onClick={this.showForm}
                        >
                          Add
                        </Button>
                      )
                  }
                  
                </div>
              </Widget>
            </Col>
          </Row>
          <NotificationSystem ref="tariffNotification" />
        </div>
      )
    } else {
      return(
        <div>
           <NotificationSystem ref="tariffNotification" />
          <p>This item has no subcatgories</p>
          {displayForm && category
            ? (
              <div>
                <label htmlFor="new_cat_name">Category name:</label>
                  <br />
                  <input
                    type="text"
                    id="new_cat_name"
                    onChange={this.handleInputs("newcatName")}
                  />
                  <br />
                  <br />
                  {catType 
                    ? <Button
                        color="success"
                        className="width-100 mb-xs mr-xs"
                        onClick={this.addSubCategory}
                      >
                        Add new category
                      </Button>
                    :
                      <Button
                          color="success"
                          className="width-100 mb-xs mr-xs"
                          onClick={this.addKindCategory}
                        >
                          Add new Subcategory
                        </Button> 
                  }
              </div>
            )
            : (
              <Button
              color="primary"
              className="width-100 mb-xs mr-xs"
              onClick={this.showForm}
            >
              Add 
            </Button>
            )
          }
         
         
        </div>  
      )
      
    }

   
  }
}
const mapDispatchToProps = dispatch => {
  return {
      setCategory: category => {
          dispatch(setCategory(category));
      },
      logOut: () => {
          dispatch(logOut());
      },
  };
};

export default connect(
null,
mapDispatchToProps,
)(CategorieEdit);