import { formatDate, getKeyFromDate, getDateFromKey } from './baseUtils'

describe('basic utils unit tests', () => {
  it('formatDate', () => {
    expect(formatDate([1, 2020])).toEqual('Jan 2020')
    expect(formatDate([6, 2020])).toEqual('Jun 2020')
    expect(formatDate([12, 2020])).toEqual('Dec 2020')

    const err = () => { formatDate([0, 2020]) }
    expect(err).toThrow('Month is out of bounds: 0')
  })

  it('getKeyFromDate', () => {
    expect(getKeyFromDate([1, 2020])).toEqual('key_1_2020')
    expect(getKeyFromDate([12, 2020])).toEqual('key_12_2020')
  })

  it('getDateFromKey', () => {
    expect(getDateFromKey('key_1_2020')).toEqual([1, 2020])
    expect(getDateFromKey('key_12_2020')).toEqual([12, 2020])
  })
})
