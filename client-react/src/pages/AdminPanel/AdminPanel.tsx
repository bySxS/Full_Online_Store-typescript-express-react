import React, { FC, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router-dom'
import { RoutePath } from 'AppRouter'
import { useBreadcrumb } from 'context/BreadcrumbContext'
import { useAppActions } from 'hooks/useStore'
import style from './AdminPanel.module.scss'

interface AdminPanelProps {
  name: string
}

const AdminPanel: FC<AdminPanelProps> = ({ name }) => {
  const { setBreadcrumb } = useBreadcrumb()
  const { changeFilterState } = useAppActions()
  useEffect(() => {
    setBreadcrumb({})
    changeFilterState({})
  }, [])
  return (
    <>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="{name}" />
      </Helmet>
      <div className={style.block}>
        <div className={style.blockContent}>
          <NavLink to={RoutePath.USERS}><i className="bi bi-people-fill text-2xl pr-1.5"/> Редактировать категории</NavLink>
        </div>
        <div className={style.blockContent}>
          <NavLink to={RoutePath.USERS}><i className="bi bi-people-fill text-2xl pr-1.5"/> Редактировать пользователей</NavLink>
        </div>
        <div className={style.blockContent}>
          <NavLink to={RoutePath.USERS}><i className="bi bi-people-fill text-2xl pr-1.5"/> Редактировать типы цен</NavLink>
        </div>
        <div className={style.blockContent}>
          <NavLink to={RoutePath.USERS}><i className="bi bi-people-fill text-2xl pr-1.5"/> Редактировать названия характеристик категорий</NavLink>
        </div>
        <div className={style.blockContent}>
          <NavLink to={RoutePath.USERS}><i className="bi bi-people-fill text-2xl pr-1.5"/> Редактировать продукты и характеристики к ним</NavLink>
        </div>
        <div className={style.blockContent}>
          <NavLink to={RoutePath.USERS}><i className="bi bi-people-fill text-2xl pr-1.5"/> Обработка заказов</NavLink>
        </div>
      </div>
    </>
  )
}

export default AdminPanel
