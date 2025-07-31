'use client'

import { ButtonGroup, IconButton, Pagination as ChakraPagination, Center } from '@chakra-ui/react'
import { useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

type PaginationProps = {
  /** the current page. */
  page: number,
  /** the total number of items. */
  count: number,
  /** the number of items per page. */
  pageSize: number,
  /** the function to set the page number. */
  setPage: (page: number) => void
}

/**
 * Displays a pagination component.
 * It displays the current page, the previous and next buttons,
 * the total number of pages 
 * and three pages between the first and last buttons.
 * @param page - the current page.
 * @param setPage - the function to set the page number.
 * @param count - the total number of items.
 * @param pageSize - the number of items per page.
 * @returns a Chakra UI Pagination component.
 */
const Pagination = ({ page, setPage, count, pageSize }: PaginationProps): React.JSX.Element => {
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
