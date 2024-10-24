import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Paginado = ({ currentPage, totalPages, onPageChange }) => {
  const [inputPage, setInputPage] = useState(currentPage);

  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (isNaN(value) || value < 1 || value > totalPages) {
      return;
    }
    setInputPage(value);
  };

  const handleInputBlur = () => {
    let newPage = parseInt(inputPage, 10);
    if (isNaN(newPage) || newPage < 1) {
      newPage = 1;
    } else if (newPage > totalPages) {
      newPage = totalPages;
    }
    setInputPage(newPage);
    if (newPage !== currentPage) {
      onPageChange(newPage);
    }
  };

  const renderPaginationButtons = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxVisiblePages) {
      const leftOffset = Math.floor(maxVisiblePages / 2);
      const rightOffset = maxVisiblePages - leftOffset - 1;

      if (currentPage <= leftOffset) {
        endPage = maxVisiblePages;
      } else if (currentPage > totalPages - rightOffset) {
        startPage = totalPages - maxVisiblePages + 1;
      } else {
        startPage = currentPage - leftOffset;
        endPage = currentPage + rightOffset;
      }
    }

    // Add first page if not included in range
    if (startPage > 1) {
      pages.push(
        <PaginationButton
          key={1}
          onClick={() => onPageChange(1)}
          $active={currentPage === 1}
        >
          1
        </PaginationButton>
      );
      if (startPage > 2) {
        pages.push(<PaginationEllipsis key="ellipsis-1">...</PaginationEllipsis>);
      }
    }

    // Add pages in range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationButton
          key={i}
          onClick={() => onPageChange(i)}
          $active={currentPage === i}
        >
          {i}
        </PaginationButton>
      );
    }

    // Add last page if not included in range
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<PaginationEllipsis key="ellipsis-2">...</PaginationEllipsis>);
      }
      pages.push(
        <PaginationButton
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          $active={currentPage === totalPages}
        >
          {totalPages}
        </PaginationButton>
      );
    }

    return pages;
  };

  return (
    <PaginationContainer>
      <PaginationNav aria-label="Pagination">
        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1} // Deshabilitar pero seguir mostrando
          $isEdge
        >
          <ChevronLeft size={20} />
        </PaginationButton>

        {renderPaginationButtons()}

        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages} // Deshabilitar pero seguir mostrando
          $isEdge
        >
          <ChevronRight size={20} />
        </PaginationButton>
      </PaginationNav>

      <PageInputContainer>
        <PageText>Página</PageText>
        <PageInput
          type="number"
          min={1}
          max={totalPages}
          value={inputPage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyPress={(e) => e.key === 'Enter' && handleInputBlur()}
        />
        <PageText>de {totalPages}</PageText>
      </PageInputContainer>
    </PaginationContainer>
  );
};


const PaginationContainer = styled.div`
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #e5e7eb;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PaginationNav = styled.nav`
  display: inline-flex;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const PaginationButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: ${props => props.$isEdge ? '0.5rem' : '0.5rem 1rem'};
  border: 1px solid #e5e7eb;
  background-color: ${props => props.$active ? '#eef2ff' : 'white'};
  color: ${props => props.$active ? '#4f46e5' : '#6b7280'};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: -1px;

  &:first-child {
    margin-left: 0;
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
  }

  &:last-child {
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.$active ? '#eef2ff' : '#f9fafb'};
    z-index: 1;
  }

  &:disabled {
    background-color: #f9fafb;
    color: #d1d5db;
    cursor: not-allowed;
  }

  ${props => props.$active && `
    border-color: #4f46e5;
    z-index: 1;
  `}
`;

const PaginationEllipsis = styled.span`
  margin: 0 0.5rem;
  color: #9ca3af;
  font-size: 1rem;
  user-select: none;
`;

const PageInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PageText = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`;

const PageInput = styled.input`
  width: 3rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  text-align: center;
  font-size: 0.875rem;
  color: #374151;
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    margin: 0;
  }
`;