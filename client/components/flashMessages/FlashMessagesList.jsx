import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteFlashMessage } from '../../actions/flashMessages';

class FlashMessageList extends React.Component {
  render() {
    const signupToast = this.props.messages.map((message) => {
      const { text } = message;
      return Materialize.toast(`${text}`, 4000);
    },
    );
    return (
      <div>
      { signupToast }
      </div>
    );
  }
}

FlashMessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired,
};

export default connect(state => ({ messages: state.flashMessages }), {
  deleteFlashMessage })(FlashMessageList);
