import React from 'react'
import { connect } from 'react-redux'

import ChildrenComments from '../components/ChildrenComments'
import Comment from '../components/Comment'
import subscribe from '../decorators/subscribe'
import comments from '../../common/read-models/comments'

export const CommentById = ({ comments, comment }) => {
  if (!comment) {
    return null
  }

  return (
    <Comment {...comment} showReply>
      <ChildrenComments replies={comment.replies} comments={comments} />
    </Comment>
  )
}

export const mapStateToProps = (
  { comments },
  { match: { params: { commentId } } }
) => ({
  comments,
  comment: comments.find(({ id }) => id === commentId)
})

export default subscribe(({ match: { params: { storyId, commentId } } }) => ({
  graphQL: [
    {
      readModel: comments,
      query:
        'query ($aggregateId: String!, $commentId: String!) { comments(aggregateId: $aggregateId, commentId: $commentId) { text, id, parentId, storyId, createdAt, createdBy, createdByName, replies } }',
      variables: {
        aggregateId: storyId,
        commentId: commentId
      }
    }
  ]
}))(connect(mapStateToProps)(CommentById))