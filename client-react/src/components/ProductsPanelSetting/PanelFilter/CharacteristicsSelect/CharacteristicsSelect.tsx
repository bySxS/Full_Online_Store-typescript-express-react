import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useGetAllCharacteristicsQuery } from 'store/myStore/myStoreCharacteristics.api'
import { useInfoLoading } from 'hooks/useInfoLoading'
import { useAppActions, useAppSelector } from 'hooks/useStore'
import selectProduct from 'store/product/product.selector'
import { useDebounce } from 'hooks/useDebounce'
import style from './CharacteristicsSelect.module.scss'

interface IShowCharacteristic {
  sectionId?: number
  show?: boolean
}

const CharacteristicsSelect = () => {
  const {
    isLoading, isSuccess, isError, data, error
  } = useGetAllCharacteristicsQuery({})
  useInfoLoading({ isLoading, isSuccess, isError, data, error })
  const [showSection, setShowSection] =
    useState<IShowCharacteristic[]>([{}])
  const filterState = useAppSelector(selectProduct.filterState)
  const [checkedValue, setCheckedValue] = useState<string[]>(filterState.filter?.split(',') || [])
  const checkedDelay = useDebounce(checkedValue, 1000)
  const { changeFilterState } = useAppActions()

  useEffect(() => {
    if (isSuccess && data.result) {
      setShowSection(data.result.map(sect => ({
        sectionId: sect.sectionId,
        show: false
      })))
    }
  }, [isSuccess])

  useEffect(() => {
    changeFilterState({
      filter: checkedDelay.join(',')
    })
  }, [checkedDelay])

  const checkShowSection = (sectionId: number) => {
    return showSection
      .filter(sect => sect.sectionId === sectionId)
      .map(sect => sect.show)[0] === true
  }

  const clickOpenCharacteristics = (e: React.MouseEvent, name: string, sectionId: number) => {
    e.preventDefault()
    e.currentTarget.innerHTML = (checkShowSection(sectionId)
      ? `<i class="bi bi-caret-up-fill"> ${name}</i>`
      : `<i class="bi bi-caret-down-fill"> ${name}</i>`)
    const newCharShow: IShowCharacteristic[] = showSection.map((sect) => {
      if (sect.sectionId === sectionId) {
        sect.show = !sect.show
      }
      return sect
    })
    setShowSection(newCharShow)
  }

  const changeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, checked } } = e
    if (!checked) {
      setCheckedValue(checkedValue.filter(value => value !== name))
    } else {
      setCheckedValue(checkedValue.concat(name))
    }
  }

  return (
    <div
      className={style.block}
    >
      {isSuccess && data.result?.map((sect) =>
        <>
        <div key={sect.sectionId}>
        <a
          href=""
          className={style.linkOpenContainer}
          onClick={(event) => {
            clickOpenCharacteristics(event, sect.sectionName, sect.sectionId)
          }}
        >
          <i className="bi bi-caret-up-fill"> {sect.sectionName}</i>
        </a>
        {checkShowSection(sect.sectionId) &&
        <div className={style.containerSection}>
        {sect.characteristics?.map((char) =>
          <div
            key={char.characteristicNameId}
            className={style.containerCategory}
          >
            <span className={style.nameChar}>
              {char.characteristicName}
            </span>
            {char.values?.map((charValue) =>
              <Form.Check
                key={charValue.characteristicValueId}
                className={style.valueChar}
                label={charValue.characteristicValue}
                onChange={changeCheckbox}
                defaultChecked={checkedValue.includes(charValue.characteristicValue)}
                name={charValue.characteristicValue}
                type={'checkbox'}
                id={'default-checkbox-all'}
              />
            )}
          </div>
        )}
        </div>
        }
      </div>
      <hr />
      </>
      )}
  </div>
  )
}

export default CharacteristicsSelect
