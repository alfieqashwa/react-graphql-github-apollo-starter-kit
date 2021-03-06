import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { ADD_COMMENT } from './mutations';

import TextArea from '../../TextArea';
import Button from '../../Button';
import ErrorMessage from '../../Error';

class CommentAdd extends Component {
  state = {
    value: ''
  };

  onChange = value => {
    this.setState({ value });
  };

  onSubmit = (e, addComment) => {
    addComment().then(() => this.setState({ value: '' }));

    e.preventDefault();
  };

  render() {
    const { IssueId } = this.props;
    const { value } = this.state;

    return (
      <Mutation
        mutation={ADD_COMMENT}
        variables={{ body: value, subjectId: IssueId }}
      >
        {(addComment, { data, loading, error }) => (
          <div>
            {error && <ErrorMessage error={error} />}

            <form onSubmit={e => this.onSubmit(e, addComment)}>
              <TextArea
                value={value}
                onChange={e => this.onChange(e.target.value)}
                placeholder="Leave a comment"
              />
              <Button type="submit">Comment</Button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CommentAdd;
