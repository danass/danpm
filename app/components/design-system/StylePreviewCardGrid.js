'use client';

import React from 'react';
import StylePreviewCard from './StylePreviewCard'; // Assuming it's in the same directory
import DebugHighlightWrapper from '../dev/DebugHighlightWrapper';
import Paragraph from './Paragraph';

export function StylePreviewCardGrid({ wrapperClassName, styles, isDebugMode }) {
  if (!styles || styles.length === 0) {
    return (
        <DebugHighlightWrapper componentName="StylePreviewCardGrid_Empty" isDebugMode={isDebugMode}>
            <Paragraph>No styles to display in StylePreviewCardGrid.</Paragraph>
        </DebugHighlightWrapper>
    );
  }

  const Wrapper = isDebugMode ? DebugHighlightWrapper : React.Fragment;

  return (
    <Wrapper {...(isDebugMode && { componentName: 'StylePreviewCardGrid' })}>
      <div className={wrapperClassName || 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
        {styles.map((style, index) => (
          <StylePreviewCard
            key={index}
            {...style}
            isDebugMode={isDebugMode} // Pass down isDebugMode
          />
        ))}
      </div>
    </Wrapper>
  );
}

export default StylePreviewCardGrid; 