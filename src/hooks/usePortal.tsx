import React, {
  ReactNode,
  VFC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'

interface ParentContextValue {
  seqs: number[]
}

const ParentContext = createContext<ParentContextValue>({
  seqs: [],
})

let portalSeq = 0

export function usePortal() {
  const currentSeq = useMemo(() => ++portalSeq, [])
  const parent = useContext(ParentContext)
  const parentSeqs = parent.seqs.concat(currentSeq)

  const portalRoot = useMemo(() => {
    const element = document.createElement('div')
    element.dataset.portalChildOf = parentSeqs.join(',')
    return element
    // spread parentSeqs array for deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...parentSeqs])

  useEffect(() => {
    document.body.appendChild(portalRoot)
    return () => {
      document.body.removeChild(portalRoot)
    }
    // spread parentSeqs array for deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...parentSeqs, portalRoot])

  const isChildPortal = useCallback(
    (element: HTMLElement | null) => {
      return _isChildPortal(element, currentSeq)
    },
    [currentSeq],
  )

  const PortalParentProvider: VFC<{ children: ReactNode }> = useCallback(
    ({ children }) => {
      const value: ParentContextValue = {
        seqs: parentSeqs,
      }
      return <ParentContext.Provider value={value}>{children}</ParentContext.Provider>
    },
    // spread parentSeqs array for deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...parentSeqs],
  )

  return {
    portalRoot,
    isChildPortal,
    PortalParentProvider,
  }
}

function _isChildPortal(
  element: HTMLElement | SVGElement | null,
  parentPortalSeq: number,
): boolean {
  if (!element) return false
  const childOf = element.dataset?.portalChildOf || ''
  const includesSeq = childOf.split(',').includes(String(parentPortalSeq))
  const parent =
    element.parentElement ||
    (() => {
      // In IE11, parentElement is undefined for SVGEelement, whereas parentNode is defined
      const node = element.parentNode
      if (node instanceof HTMLElement || node instanceof SVGElement) {
        return node
      }
      return null
    })()
  return includesSeq || _isChildPortal(parent, parentPortalSeq)
}