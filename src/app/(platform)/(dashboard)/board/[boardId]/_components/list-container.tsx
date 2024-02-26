'use client'

import { toast } from 'sonner'
import { useEffect, useState } from 'react'
// import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { ListWithCards } from '@/types'
import { useAction } from '@/hooks/use-action'
// import { updateListOrder } from "@/actions/update-list-order";
// import { updateCardOrder } from "@/actions/update-card-order";
import { ListForm } from './list-form'
import { ListItem } from './list-item'

interface ListContainerProps {
  data: ListWithCards[]
  boardId: string
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data)

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData.map((list, index) => {
        return <ListItem key={list.id} index={index} data={list} />
      })}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  )
}
