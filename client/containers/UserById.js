import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import subscribe from '../decorators/subscribe'
import users from '../../common/read-models/users'
import '../styles/profile.css'

export const UserById = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div className="profile__content">
      <table>
        <tbody>
          <tr>
            <td>name:</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>created:</td>
            <td>{new Date(+user.createdAt).toLocaleString('en-US')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export const mapStateToProps = (
  { user, users },
  { match: { params: { userId } } }
) => ({
  user: userId ? users.find(({ id }) => id === userId) : user
})

export default subscribe(({ match: { params: { userId } } }) => ({
  graphQL: [
    {
      readModel: users,
      query:
        'query ($aggregateId: ID!) { users(aggregateId: $aggregateId) { id, name, createdAt } }',
      variables: {
        aggregateId: userId
      }
    }
  ]
}))(connect(mapStateToProps)(UserById))