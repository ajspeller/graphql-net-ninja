import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../queries/queries';

class AddBook extends Component {
  displayAuthors() {
    const data = this.props.data;
    if (data.loading) {
      return <option disabled>Loading Authors</option>;
    } else {
      return data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  submitHandler(e) {
    e.preventDefault();
    console.log(this.state);
  }
  changeHandler(e) {
    if (e.target.id === 'name') {
      this.setState({ name: e.target.value });
    }
    if (e.target.id === 'genre') {
      this.setState({ genre: e.target.value });
    }
  }
  render() {
    return (
      <form id='add-book' onSubmit={this.submitHandler}>
        <div className='field'>
          <label htmlFor=''>Book name:</label>
          <input onChange={this.changeHandler} type='text' id='name' />
        </div>
        <div className='field'>
          <label htmlFor=''>Genre:</label>
          <input onChange={this.changeHandler} type='text' id='genre' />
        </div>
        <div className='field'>
          <label htmlFor=''>Author:</label>
          <select>
            <option>Select author</option>
            {/* {this.displayAuthors()} */}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
