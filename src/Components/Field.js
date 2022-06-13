import {useRef} from 'react'

import styles from './Field.module.sass'

const Field = ({label, icon, placeholder, valid = true, ...props}) => {
  const input = useRef()

  const handleClick = () => props.value === '0' && input.current.select()

  return (
    <div>
      {label &&
        <div className={styles.header}>
          <div className="label">{label}</div>
          {!valid &&
            <div className="error">Can't be zero</div>
          }
        </div>
      }
      <div className={styles.container}>
        <input className={styles.input} data-valid={valid} {...props} onClick={handleClick} ref={input}/>
        {placeholder && props.value === '' &&
          <div className={styles.placeholder}>{placeholder}</div>
        }
        <div className={styles.icon} style={{backgroundImage: `url(/images/icon-${icon}.svg)`}}/>
      </div>
    </div>
  )
}

export default Field
