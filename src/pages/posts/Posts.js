import React from 'react';
import { Switch, Route, withRouter } from 'react-router';

import PostList from './list/PostList';
import PostNew from './new/PostNew';

class Posts extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/admin/posts" exact component={PostList} />
        <Route path="/admin/posts/new" exact component={PostNew} />
      </Switch>
    );
  }
}

export default withRouter(Posts);
