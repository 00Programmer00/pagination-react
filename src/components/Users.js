import React, {Component} from 'react';
import axios from 'axios'
import BasicPagination from "./Pagination";
import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totalPages: 1,
      currentPage: 1,
      count: 1,
      limit: 10
    }
  }

  async componentDidMount() {
    await axios.get(`http://localhost:3003/users?page=${this.state.currentPage}&limit=${this.state.limit}`).then(response => {
      console.log(response)
      const { users, totalPages, currentPage, count } = response.data;
      this.setState({
        users,
        totalPages,
        currentPage,
        count
      })
    });
  }

  onChange = async (e, value) => {
    await axios.get(`http://localhost:3003/users?page=${value}&limit=${this.state.limit}`).then(response => {
      console.log(response)
      const { users, totalPages, currentPage, count } = response.data;
      this.setState({
        users,
        totalPages,
        currentPage,
        count
      })
    });
  }

  handleLimitChange = async (e) => {
    await axios.get(`http://localhost:3003/users?page=${this.state.page}&limit=${e.target.value}`).then(response => {
      console.log(response)
      const { users, totalPages, currentPage, count } = response.data;
      this.setState({
        users,
        totalPages,
        currentPage,
        count,
        limit: e.target.value
      })
    });
  }

  render() {
    const { users, totalPages, currentPage, count } = this.state;

    return (
        <div>
          {users.map(user => {
            return (
                <div>
                  <h1>{`${user.firstName} ${user.lastName}`}</h1>
                </div>
            )
          })}
          <BasicPagination change={this.onChange} totalPages={totalPages} />
          Set Users per page:
          <Select
            value={this.state.limit}
            onChange={this.handleLimitChange}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </div>
    );
  }
}

export default Users;
