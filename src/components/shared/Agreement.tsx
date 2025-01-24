/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { MouseEvent } from 'react'
import Flex from './Flex'
import Text from './Text'
import styled from '@emotion/styled';
import { colors } from '../../styles/colorPalette';

function Agreement({ children }: { children: React.ReactNode }) {
  return (
    <Flex as="ul" direction="column" css={agreementContainerStyles}>
      {children}
    </Flex>
  )
}
function AgreementTitle({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
}) {
  return (
    <Flex as="li" onClick={(e) => onChange(e, !checked)}>
      <Flex align="center">{checked ? '✅' : '☑️'}</Flex>
      <Text bold={true}>{children}</Text>
    </Flex>
  )
}
function AgreementDescription({
  children,
  checked,
  onChange,
  link,
}: {
  children: React.ReactNode
  checked: boolean
  onChange: (e: MouseEvent<HTMLElement>, checked: boolean) => void
  link?: string
}) {
  return (
    <Flex as="li" justify='space-between'>
      <Flex
        onClick={(e) => {
          onChange(e, !checked)
        }}
      >
      <Flex align='center'>
        <IconChecked checked={checked}>{'V'}</IconChecked>
      </Flex>
        <Text typography='t6'>{children}</Text>
      </Flex>
      {link != null ? (
        <a href={link} target="_blank" rel='noreferrer'>
          <Text>링크</Text>
        </a>
      ) : null}
    </Flex>
  )
}

Agreement.Title = AgreementTitle
Agreement.Description = AgreementDescription

const agreementContainerStyles = css`
  padding: 24px;

  & li {
    cursor: pointer;
  }
`

interface IconCheckedProps {
  checked: boolean
}

const IconChecked = styled.div<IconCheckedProps>(({checked})=>({
  color: checked ? colors.red : colors.grey
}))

export default Agreement

/*
 *<Agreement>
 * <Agreement.Title> 약관에 모두 동의 </Agreement.Title>
 * <Agreement.Description> 약관 1</Agreement.Description>
 * <Agreement.Description> 약관 2</Agreement.Description>
 * </Agreement>
 */
