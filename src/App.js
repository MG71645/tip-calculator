import {useState} from 'react'

import styles from './App.module.sass'
import Field from './Components/Field'

const App = () => {
  const initialForm = {
    bill: '0',
    billValid: true,
    tip: '0',
    custom: '',
    customValid: true,
    people: '0',
    peopleValid: true
  }

  const [form, setForm] = useState(initialForm)

  const tip = +form.tip ? (+form.bill / 100 * +form.tip) : 0

  const formatTipAmount = n => {
    const [a, b = '00'] = n.toString().split('.')
    return a + '.' + b.substring(0, 2)
  }

  const formatDecimals = value => value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0')

  const formatNumbers = value => value.replace(/[^0-9]/g, '').replace(/^0[^.]/, '0')

  const handleBill = e => setForm(form => ({...form, bill: formatDecimals(e.target.value), billValid: true}))

  const handlePeople = e => setForm(form => ({...form, people: formatNumbers(e.target.value), peopleValid: true}))

  const handleCustomTip = e => {
    const value = formatDecimals(e.target.value)
    setForm(form => ({...form, tip: value, custom: value, customValid: true}))
  }

  const check = field => !(+form[field]) && setForm(form => ({...form, [field+'Valid']: false}))

  const Option = ({value}) => {
    const checked = value === form.tip

    return (
      <div className={styles.option} data-checked={checked}
           onClick={() => setForm(form => ({...form, tip: value, custom: '', customValid: true}))}>
        {value}%
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <img src="/images/logo.svg" alt="SPLITTER" className={styles.logo}/>
      <div className={styles.form}>
        <div className={styles.fields}>
          <Field name="bill" value={form.bill} onChange={handleBill} label="Bill" icon="dollar"
                 onBlur={() => check('bill')} valid={form.billValid}/>
          <div>
            <div className="spaceBetween">
              <div className="label">Select tip %</div>
              {!form.customValid &&
                <div className="error">Can't be zero</div>
              }
            </div>
            <div className={styles.options}>
              <Option value={5}/>
              <Option value={10}/>
              <Option value={15}/>
              <Option value={25}/>
              <Option value={50}/>
              <Field value={form.custom} onChange={handleCustomTip} placeholder="Custom" valid={form.customValid}
                     onBlur={() => form.custom && check('custom')}/>
            </div>
          </div>
          <Field name="people" value={form.people} onChange={handlePeople} label="Number of People" icon="person"
                 onBlur={() => check('people')} valid={form.peopleValid}/>
        </div>
        <div className={styles.summary}>
          <div className={styles.items}>
            <div className={styles.item}>
              <div>
                <div className={styles.name}>Tip Amount</div>
                <div className={styles.person}>/ person</div>
              </div>
              <div className={styles.price}>${+form.people ? formatTipAmount(tip / +form.people) : '0.00'}</div>
            </div>
            <div className={styles.item}>
              <div>
                <div className={styles.name}>Total</div>
                <div className={styles.person}>/ person</div>
              </div>
              <div className={styles.price}>
                ${(+form.people && +form.tip ? ((+form.bill + tip) / +form.people) : 0).toFixed(2)}
              </div>
            </div>
          </div>
          <button className={styles.button} onClick={() => setForm(initialForm)}
                  disabled={!(+form.bill) || !(+form.tip) || !(+form.people)}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
