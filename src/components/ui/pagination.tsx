'use client'

import { ButtonGroup, IconButton, Pagination as ChakraPagination, Center } from '@chakra-ui/react'
import { useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

interface PaginationProps {
  /** The current page. */
  page: number,
  /** The total number of items. */
  count: number,
  /** The number of items per page. */
  pageSize: number,
  /** The function to set the page number. */
  setPage: (page: number) => void
}

/**
 * Displays a pagination component.
 * It displays the current page, the previous and next buttons,
 * the total number of pages 
 * and three pages between the first and last buttons.
 * @param page - The current page.
 * @param setPage - The function to set the page number.
 * @param count - The total number of items.
 * @param pageSize - The number of items per page.
 * @returns A Chakra UI Pagination component.
 */
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
