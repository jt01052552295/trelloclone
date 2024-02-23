'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { NavItem, Organization } from './nav-item'

interface SidebarProps {
  storageKey?: string
}

const Sidebar = ({ storageKey = 't-sidebar-state' }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})

  const [isLoaded, setIsLoaded] = useState(false)

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc: string[], key: string) => {
    if (expanded[key]) {
      acc.push(key)
    }
    return acc
  }, [])
  // {"123":true} => ['123']

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }))
  }

  useEffect(() => {
    // setIsLoaded(false)
    console.log(defaultAccordionValue)
  }, [defaultAccordionValue])

  const organizations: Organization[] = [
    {
      id: 'organization-1',
      slug: 'or1',
      imageUrl: '/logo.svg',
      name: 'workspace 1',
    },
    {
      id: 'organization-2',
      slug: 'or2',
      imageUrl: '/logo.svg',
      name: 'workspace 2',
    },
    {
      id: 'organization-3',
      slug: 'or3',
      imageUrl: '/logo.svg',
      name: 'workspace 3',
    },
    {
      id: 'organization-4',
      slug: 'or4',
      imageUrl: '/logo.svg',
      name: 'workspace 4',
    },
  ]

  if (isLoaded) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Workspaces</span>
        <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion type="multiple" className="space-y-2">
        {organizations.map((organization) => (
          <NavItem
            key={organization.id}
            isActive={'organization-1' === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  )
}

export default Sidebar
