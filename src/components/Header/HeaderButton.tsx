import React, { ReactNode, VFC } from 'react'
import styled, { css } from 'styled-components'

import { ComponentProps as IconProps } from '../Icon/Icon'

import { Theme, useTheme } from '../../hooks/useTheme'

type Props = {
  icon: React.ComponentType<IconProps>
  children: ReactNode
  onClick?: () => void
  className?: string
}

export const HeaderButton: VFC<Props> = ({ icon: Icon, children, onClick, className }) => {
  const theme = useTheme()

  return (
    <Wrapper themes={theme} onClick={onClick} type="button" className={className}>
      <IconWrapper themes={theme} role="presentation">
        <Icon />
      </IconWrapper>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.button<{ themes: Theme }>`
  ${({ themes }) => {
    const { size, fontSize, interaction } = themes
    return css`
      display: inline-block;
      margin: 0;
      padding: 0 ${size.pxToRem(10)};
      border: none;
      background: none;
      color: #fff;
      font-size: ${fontSize.M};
      line-height: 50px;
      transition: background-color ${interaction.hover.animation};
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    `
  }}
`
const IconWrapper = styled.span<{ themes: Theme }>`
  ${({ themes: { spacingByChar } }) => {
    return css`
      display: inline-block;
      padding: 0;
      margin: 0 ${spacingByChar(0.5)} 0 0;
      vertical-align: middle;
    `
  }}
`