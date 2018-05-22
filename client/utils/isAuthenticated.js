import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * A middleware that ensure a user is authenticated to access certain routes
 * @param {object} ComposedComponent - ComposedComponent
 *
 * @return {void} - void
 */
export default (ComposedComponent) => {
  class isAuthenticated extends React.Component {
    /**
     * redirects the user to the dashboard page
     * if user is authenticated
     * @method componentDidMount
     *
     * @return {void}
     */
    componentWillMount() {
      if (this.props.isAuthenticated) {
        this.context.router.history.push('/file-list');
      }
    }
    /**
     * Updates the state on store change
     * @method componentWillReceiveProps
     * @param {object} nextProps
     *
     * @returns {void}
     */
    componentWillReceiveProps(nextProps) {
      if (nextProps.isAuthenticated) {
        this.context.router.history.push('/file-list');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  isAuthenticated.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

  isAuthenticated.contextTypes = {
    router: PropTypes.object.isRequired,
  };
  /**
   * maps the store state isAuthenticated to props
   * @param {object} state
   *
   * @returns {void}
   */
  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.authenticationReducer.isAuthenticated,
    };
  };

  return connect(mapStateToProps)(isAuthenticated);
};