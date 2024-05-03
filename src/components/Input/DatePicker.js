import './DatePicker.scss'

import React, { useEffect, useRef } from 'react'

import Flatpickr from 'react-flatpickr'
import { KeyCodeUtils } from '../../utils'
import moment from 'moment'

const DatePicker = ({ value, onChange, minDate, onClose, ...otherProps }) => {
  const flatpickrNode = useRef(null)

  useEffect(() => {
    const node = flatpickrNode.current

    const handleBlur = (event) => {
      const value = event.target.value
      event.preventDefault()
      const valueMoment = moment(value, 'DD/MM/YYYY')
      onChange([valueMoment.toDate(), valueMoment.toDate()])
    }

    const handlerKeyDown = (event) => {
      const keyCode = event.which || event.keyCode
      if (keyCode === KeyCodeUtils.ENTER) {
        event.preventDefault()
        const value = event.target.value
        const valueMoment = moment(value, 'DD/MM/YYYY')
        onChange([valueMoment.toDate(), valueMoment.toDate()])
      }
    }

    if (node) {
      node.addEventListener('blur', handleBlur)
      node.addEventListener('keydown', handlerKeyDown)
    }

    return () => {
      if (node) {
        node.removeEventListener('blur', handleBlur)
        node.removeEventListener('keydown', handlerKeyDown)
      }
    }
  }, [onChange])

  const onOpen = () => {
    if (flatpickrNode.current) {
      flatpickrNode.current.blur()
    }
  }

  const options = {
    dateFormat: 'd/m/Y',
    allowInput: true,
    disableMobile: true,
    onClose: onClose,
    onOpen: onOpen,
  }

  if (minDate) {
    options.minDate = minDate
  }

  return <Flatpickr ref={flatpickrNode} value={value} onChange={onChange} options={options} {...otherProps} />
}

export default DatePicker
