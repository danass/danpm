'use client';

import React from 'react';
import CheckListCard from './CheckListCard'; // Assuming it's in the same directory
import DebugHighlightWrapper from '../dev/DebugHighlightWrapper';
import Paragraph from './Paragraph';

export function CheckListCardGrid({ wrapperClassName, cards, isDebugMode }) {
  if (!cards || cards.length === 0) {
     return (
        <DebugHighlightWrapper componentName="CheckListCardGrid_Empty" isDebugMode={isDebugMode}>
            <Paragraph>No cards to display in CheckListCardGrid.</Paragraph>
        </DebugHighlightWrapper>
    ); 
  }

  const Wrapper = isDebugMode ? DebugHighlightWrapper : React.Fragment;

  return (
    <Wrapper {...(isDebugMode && { componentName: 'CheckListCardGrid' })}>
      <div className={wrapperClassName || 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8'}>
        {cards.map((card, index) => (
          <CheckListCard
            key={index}
            {...card}
            isDebugMode={isDebugMode} // Pass down isDebugMode
          />
        ))}
      </div>
    </Wrapper>
  );
}

export default CheckListCardGrid; 