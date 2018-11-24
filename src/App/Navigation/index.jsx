import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../../constants/routes';

import Button from '../../Button';
import Input from '../../Input';

import './style.css';
class Navigation extends Component {
  state = {
    organizationName: 'the-road-to-learn-react'
  };

  onOrganizationSearch = value => {
    this.setState({ organizationName: value });
  };

  render() {
    const {
      location: { pathname }
    } = this.props;

    return (
      <header className="Navigation">
        <div className="Navigation-Link">
          <Link to={routes.PROFILE}>Profile</Link>
        </div>
        <div className="Navigation-link">
          <Link to={routes.ORGANIZATION}>Organization</Link>
        </div>

        {pathname === routes.ORGANIZATION && (
          <OrganizationSearch
            organizationName={this.state.organizationName}
            onOrganizationSearch={this.onOrganizationSearch}
          />
        )}
      </header>
    );
  }
}

class OrganizationSearch extends Component {
  state = {
    value: this.props.organizationName
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onSubmit = e => {
    this.props.onOrganizationSearch(this.state.value);

    e.preventDefault();
  };

  render() {
    const { value } = this.state;

    return (
      <div className="Navigation-search">
        <form onSubmit={this.onSubmit}>
          <Input
            color={'white'}
            type="text"
            value={value}
            onChange={this.onChange}
          />{' '}
          <Button color={'white'} type="submit">
            Search
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(Navigation);
