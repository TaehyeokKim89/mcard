/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { colors } from '../../styles/colorPalette'
import { forwardRef, SelectHTMLAttributes } from 'react'
import Flex from './Flex'
import Text from './Text'
import { Option } from '../../models/apply'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
  placeholder?: string
}

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.grey};
  border: none;
  border-radius: 16px;
  padding: 0 16px;
  cursor: pointer;

  &:required:invalid {
    color ${colors.blue};
  }
`

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({label, options, placeholder, value, ...props }, ref) {
    return (
      <Flex direction='column'>
        {label ? (
          <Text
            typography="t7"
            color="black"
            display="inline-bloc"
            style={{ marginBottom: 6 }}
          >
            {label}
          </Text>
        ) : null}
        <BaseSelect ref={ref} required={true} value={value} {...props}>
          <option disabled={true} hidden={true} value="">
            {placeholder}
          </option>
          {options.map(({label, value})=>(
            <option key ={label} value={value}>
              {label}
            </option>
          ))}
        </BaseSelect>
      </Flex>
    )
  },
)

export default Select
