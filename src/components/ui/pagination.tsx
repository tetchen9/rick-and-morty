'use client'

import { ButtonGroup, IconButton, Pagination as ChakraPagination, Center } from '@chakra-ui/react'
import { useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

interface PaginationProps {
  page: number,
  count: number,
  pageSize: number,
  setPage: (page: number) => void
}

const Pagination = ({ page, setPage, count, pageSize }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(page)
  return (
    <ChakraPagination.Root
      count={Math.ceil(count / pageSize)} // total pages
      pageSize={1}
      page={currentPage}
      mx="auto"
      mt={4}
      width="full"
      onPageChange={(e) => {
        setPage(e.page)
        setCurrentPage(e.page)
      }}
      role="navigation"
      aria-label="pagination"
    >
      <Center width="full">
        <ButtonGroup variant="ghost" size="sm" >
          <ChakraPagination.PrevTrigger asChild>
            <IconButton>
              <HiChevronLeft />
            </IconButton>
          </ChakraPagination.PrevTrigger>

          <ChakraPagination.Items
            render={(page) => (
              <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
                {page.value}
              </IconButton>
            )}
          />

          <ChakraPagination.NextTrigger asChild>
            <IconButton>
              <HiChevronRight />
            </IconButton>
          </ChakraPagination.NextTrigger>
        </ButtonGroup>
      </Center>
    </ChakraPagination.Root>
  )
}
export default Pagination
