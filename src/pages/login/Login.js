import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col, Alert, Button, Form, FormGroup, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';

import Widget from '../../components/Widget';
import Footer from '../../components/Footer';

import s from './Login.scss';
import { getClientId, loginUser, logIn } from '../../actions/user';

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isFetching: PropTypes.bool,
    location: PropTypes.any,
    errorMessage: PropTypes.string,
  };

  static defaultProps = {
    isAuthenticated: false,
    isFetching: false,
    location: {},
    errorMessage: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(getClientId());
  }

  changeLogin = event => {
    this.setState({ login: event.target.value });
  };

  changePassword = event => {
    this.setState({ password: event.target.value });
  };

  doLogin = e => {
    this.props.dispatch(
      logIn(this.props.clientId, this.state.login, this.state.password),
    );
    e.preventDefault();
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/admin' },
    };

    if (this.props.isAuthenticated) {
      // cant access login page while logged in
      return <Redirect to={from} />;
    }

    return (
      <div className={s.root}>
        <Row>
          <Col
            xs={{ size: 10, offset: 1 }}
            sm={{ size: 6, offset: 3 }}
            lg={{ size: 4, offset: 4 }}
          >
            <p className="text-center">OPN - Admin Dashboard</p>
            <Widget className={s.widget}>
              <h4 className="mt-0">Login to OPN Admin Dashboard</h4>
              <p className="fs-sm text-muted">
                Use your <b>username</b> and <b>password</b> to sign in
              </p>
              <Form className="mt" onSubmit={this.doLogin}>
                {this.props.errorMessage && (
                  <Alert size="sm" color="danger">
                    {this.props.errorMessage}
                  </Alert>
                )}
                <FormGroup className="form-group">
                  <Input
                    className="no-border"
                    value={this.state.login}
                    onChange={this.changeLogin}
                    type="text"
                    required
                    name="username"
                    placeholder="Username"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    className="no-border"
                    value={this.state.password}
                    onChange={this.changePassword}
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                  />
                </FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <a href="#" className="fs-sm">
                    Trouble with account?
                  </a>{' '}
                  {/* eslint-disable-line */}
                  <div>
                    {/* <Button color="default" size="sm">
                      Create an account
                    </Button> */}
                    <Button color="success" size="sm" type="submit">
                      {this.props.isFetching ? 'Loading...' : 'Login'}
                    </Button>
                  </div>
                </div>
              </Form>
            </Widget>
          </Col>
        </Row>
        <Footer className="text-center" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clientId: state.auth.clientId,
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Login)));
