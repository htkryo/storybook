import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'styled-components'

import { Base } from './Base'
import { DialogBase } from './DialogBase'

storiesOf('Base', module).add('Base', () => (
  <List>
    <li>
      <Base radius="s">
        <Txt>
          If radius props is specified as <Bold>s</Bold>, border-radius becomes <Bold>6px</Bold>.
        </Txt>
      </Base>
    </li>
    <li>
      <Base radius="m">
        <Txt>
          If radius props is specified as <Bold>m</Bold>, border-radius becomes <Bold>8px</Bold>.
        </Txt>
      </Base>
    </li>
  </List>
))

storiesOf('Base', module).add('DialogBase', () => (
  <List>
    <li>
      <DialogBase radius="s">
        <Txt>
          If radius props is specified as <Bold>s</Bold>, border-radius becomes <Bold>6px</Bold>.
        </Txt>
      </DialogBase>
    </li>
    <li>
      <DialogBase radius="m">
        <Txt>
          If radius props is specified as <Bold>m</Bold>, border-radius becomes <Bold>8px</Bold>.
        </Txt>
      </DialogBase>
    </li>
  </List>
))

const List = styled.ul`
  margin: 0;
  padding: 24px;
  background-color: #eee;
  list-style: none;
  & > li:not(:first-child) {
    margin-top: 24px;
  }
`
const Txt = styled.p`
  margin: 0;
  padding: 24px;
`
const Bold = styled.span`
  font-weight: bold;
`