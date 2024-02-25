'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export const OrgControl = () => {
  const params = useParams()

  const [isActive, setActive] = useState(true)

  useEffect(() => {
    if (!isActive) return

    setActive(false)
  }, [isActive, params.organizationId])

  return null
}
