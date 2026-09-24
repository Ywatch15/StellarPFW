// FILE: src/components/cinematic/CinematicStage.jsx
// Pinned or flow stage wrapper that bridges the DOM container with useVisibilityState.
import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import useVisibilityState from '../../hooks/useVisibilityState';
import '../../styles/cinematic-engine.css';

const CinematicStage = forwardRef(function CinematicStage(
  {
    as: Component = 'section',
    id,
    'aria-label': ariaLabel,
    className = '',
    children,
    visibilityOptions = {},
    style = {},
    ...props
  },
  forwardedRef,
) {
  // Bridge section container with section-level visibility lifecycle
  const { ref: stageRef, state: visibilityState, isActive, isVisible, isNearViewport } =
    useVisibilityState({
      nearMargin: '400px 0px',
      visibleMargin: '0px',
      threshold: 0.05,
      ...visibilityOptions,
    });

  // Allow consumer components to access container DOM node and visibility state
  useImperativeHandle(forwardedRef, () => ({
    node: stageRef.current,
    visibilityState,
    isActive,
    isVisible,
    isNearViewport,
  }));

  return (
    <Component
      ref={stageRef}
      id={id}
      aria-label={ariaLabel}
      className={`cinematic-stage ${className}`}
      data-visibility={visibilityState}
      style={style}
      {...props}
    >
      {typeof children === 'function'
        ? children({ visibilityState, isActive, isVisible, isNearViewport })
        : children}
    </Component>
  );
});

export default CinematicStage;
