import React, { HTMLAttributes, useCallback, useContext } from 'react'

import { DialogContext } from './DialogWrapper'
import { DialogContentInner, DialogContentInnerProps } from './DialogContentInner'
import { ActionDialogContentInner, BaseProps } from './ActionDialogContentInner'

type Props = BaseProps & Pick<DialogContentInnerProps, 'top' | 'right' | 'bottom' | 'left' | 'id'>
type ElementProps = Omit<HTMLAttributes<HTMLDivElement>, keyof Props>

export const ActionDialogContent: React.VFC<Props & ElementProps> = ({
  children,
  title,
  closeText,
  actionText,
  actionTheme,
  onClickAction,
  actionDisabled = false,
  className = '',
  ...props
}) => {
  const { DialogContentRoot, onClickClose, active } = useContext(DialogContext)

  const handleClickClose = useCallback(() => {
    if (!active) {
      return
    }
    onClickClose()
  }, [active, onClickClose])

  const handleClickAction = useCallback(() => {
    if (!active) {
      return
    }
    onClickAction(onClickClose)
  }, [active, onClickAction, onClickClose])

  return (
    <DialogContentRoot>
      <DialogContentInner
        onClickOverlay={onClickClose}
        onPressEscape={onClickClose}
        isOpen={active}
        ariaLabel={title}
        className={className}
        {...props}
      >
        <ActionDialogContentInner
          title={title}
          closeText={closeText}
          actionText={actionText}
          actionTheme={actionTheme}
          onClickAction={handleClickAction}
          onClickClose={handleClickClose}
          actionDisabled={actionDisabled}
        >
          {children}
        </ActionDialogContentInner>
      </DialogContentInner>
    </DialogContentRoot>
  )
}