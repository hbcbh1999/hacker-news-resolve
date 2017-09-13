import React from 'react'
import { connect } from 'react-redux'

import Comment from '../components/Comment'
import { NUMBER_OF_ITEMS_PER_PAGE } from '../../common/constants'
import Pagination from '../components/Pagination'
import subscribe from '../decorators/subscribe'
import comments from '../../common/read-models/comments'

export const CommentsByPage = ({ comments, match: { params: { page } } }) => (
  <div>
    {comments
      .slice(0, NUMBER_OF_ITEMS_PER_PAGE)
      .map(comment => <Comment key={comment.id} {...comment} />)}
    <Pagination
      page={page}
      hasNext={!!comments[NUMBER_OF_ITEMS_PER_PAGE]}
      location="/comments"
    />
  </div>
)

export const mapStateToProps = ({ comments }) => ({
  comments
})

export default subscribe(({ match: { params: { page } } }) => ({
  graphQL: [
    {
      readModel: comments,
      query:
        'query ($page: Int!) { comments(page: $page) { text, id, parentId, storyId, createdAt, createdBy, createdByName, replies } }',
      variables: {
        page: page || '1'
      }
    }
  ]
}))(connect(mapStateToProps)(CommentsByPage))