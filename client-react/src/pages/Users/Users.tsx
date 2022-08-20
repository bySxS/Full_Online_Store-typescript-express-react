import React, { FC } from 'react'
import UserProfile from 'components/UserProfile/UserProfile'
import { useAllUsersQuery } from 'store/myStore/myStoreUser.api'
import { Helmet } from 'react-helmet'
import { useInfoLoading } from 'hooks/useInfoLoading'
import style from './Users.module.scss'

interface UsersProps {
  name: string
}

const Users: FC<UsersProps> = ({ name }) => {
  const { isLoading, isSuccess, isError, data: users, error } =
    useAllUsersQuery({ limit: 10, page: 1 })
  useInfoLoading({ isLoading, isSuccess, isError, data: users, error })

  return (
    <div>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={name + ' все клиенты'} />
      </Helmet>
      {isSuccess && users &&
        <>
        {users.result?.results.map(user =>
        <div
          className={style.containerUser}
          key={user.id}>
          <UserProfile user={user} />
        </div>
        )}
        </>
      }
    </div>
  )
}

export default Users
