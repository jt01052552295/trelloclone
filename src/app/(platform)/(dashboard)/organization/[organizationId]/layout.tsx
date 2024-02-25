import React from 'react'
import { startCase } from 'lodash'
import { OrgControl } from './_components/org-control'

export async function generateMetadata() {
  const orgSlug = 'organization-1'

  return {
    title: startCase(orgSlug || 'organization'),
  }
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <OrgControl />
      {children}
    </div>
  )
}

export default OrganizationIdLayout
