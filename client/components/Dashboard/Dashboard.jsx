import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import moment from 'moment';

import * as userAction from '../../actions/userAction';

const Cell = ({ columnName, value }) => {
  switch (columnName) {
    case 'USER ID': {
      return (
        <div className="table_cell">
          <span>{value.id}</span>
        </div>
      );
    }
    case 'FULLNAME': {
      return (
        <div className="table_cell">
          <span>{value.fullname}</span>
        </div>
      );
    }
    case 'USERNAME': {
      return (
        <div className="table_cell">
          <span>{value.username}</span>
        </div>
      );
    }
    case 'EMAIL':
      return (
        <div className="table_cell">
          <span>{value.email}</span>
        </div>
      );
    case 'ROLE':
      return (
          <div className="table_cell">
            <span>{value.roleId === 1 ? 'Admin' : 'Customer'}</span>
          </div>
      );
    case 'CREATED AT':
      return (
        <div className="table_cel">
          <span>{moment(value.createdAt).format('DD-MMM-YYYY')}</span>
        </div>
      );
    case 'UPDATED AT':
      return (
        <div className="table_cel">
          <span>{moment(value.updatedAt).format('DD-MMM-YYYY')}</span>
        </div>
      );
    default:
      return null;
  }
};

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.loadAllUsers();
  }

  render() {
    const fields = ['USER ID', 'FULLNAME', 'USERNAME', 'EMAIL', 'ROLE', 'CREATED AT', 'UPDATED AT'];

    const columnMetadata = fields.map(columnName => ({
      Header:
      <span>
          {columnName}
        </span>,
      accessor: '',
      Cell: data => <Cell {...data} columnName={columnName} />,
      className: `tech-assessment-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
      headerClassName: `tech-assessment-${columnName.replace(' ', '-').toLocaleLowerCase()}`,
    }));

    const { allUsers: { users } } = this.props;
    return (
      <div>
        {users.length && <div>
          <br />
          <h3 className="dashboard-header">List of registered users </h3>
          <ReactTable
          data={users}
          columns={columnMetadata}
          noDataText="No users found"
          defaultPageSize={10}
        />
        </div>}
      </div>
    );
  }
}

Dashboard.propTypes = {
  loadAllUsers: PropTypes.func.isRequired,
  allUsers: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    loadAllUsers: (limit, offset) =>
      dispatch(userAction
        .loadAllUsers(limit, offset)),
  };
}

function mapStateToProps(state) {
  return {
    allUsers: state.user.allUsers,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

