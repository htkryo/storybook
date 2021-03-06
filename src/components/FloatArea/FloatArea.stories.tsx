import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { FloatArea } from './FloatArea'
import { PrimaryButton, SecondaryButton } from '../Button'
import { FaExclamationTriangleIcon } from '../Icon'

storiesOf('FloatArea', module)
  .add('FloatArea', () => (
    <FloatArea
      primaryButton={<PrimaryButton>Submit</PrimaryButton>}
      secondaryButton={<SecondaryButton>Cancel</SecondaryButton>}
      tertiaryButton={<SecondaryButton>preview</SecondaryButton>}
      errorIcon={<FaExclamationTriangleIcon color="#e01e5a" />}
      errorText="This is the error text."
      width="80%"
      top={40}
    />
  ))