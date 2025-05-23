'use client';

import React from 'react';
import Button from './Button'; // Assuming Button is in the same directory
import { iconMap } from './icon-map'; // Assuming icon-map is in the same directory
import DebugHighlightWrapper from '../dev/DebugHighlightWrapper';

export function ButtonGroup({ wrapperClassName, buttons, isDebugMode }) {
  if (!buttons || buttons.length === 0) {
    return null;
  }

  const Wrapper = isDebugMode ? DebugHighlightWrapper : React.Fragment;

  return (
    <Wrapper {...(isDebugMode && { componentName: 'ButtonGroup' })}>
      <div className={wrapperClassName || 'flex flex-wrap gap-3 items-center'}>
        {buttons.map((button, index) => {
          const IconComponent = button.iconName ? iconMap[button.iconName] : null;
          return (
            <Button
              key={index}
              href={button.href}
              variant={button.variant || 'primary'}
              size={button.size}
              className={button.className}
              icon={IconComponent ? <IconComponent className="w-5 h-5" /> : null}
              iconPosition={button.iconPosition}
              isDebugMode={isDebugMode} // Pass down isDebugMode
            >
              {button.text || 'Button'}
            </Button>
          );
        })}
      </div>
    </Wrapper>
  );
}

export default ButtonGroup; 