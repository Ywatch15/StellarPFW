// FILE: src/components/cinematic/works/future/__tests__/FutureProjectField.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import FutureProjectField from '../FutureProjectField';
import FutureProjectHUD from '../FutureProjectHUD';

describe('FutureProjectField — Cinematic Future Projects Loading Sequence', () => {
  it('renders the future project container with deep space scan telemetry', () => {
    render(<FutureProjectField />);

    expect(screen.getByLabelText(/Future Project Signals & Deep Space Reservoir/i)).toBeInTheDocument();
    expect(screen.getByText(/SYSTEM DISCOVERY BUS · DEEP SCAN ACTIVE/i)).toBeInTheDocument();
    expect(screen.getByText(/SECTOR 0x7E → UNMAPPED CELESTIAL VECTORS/i)).toBeInTheDocument();
    expect(screen.getByText(/DEEP SPACE RESERVOIR · FUTURE SIGNALS ACTIVE/i)).toBeInTheDocument();
  });

  it('renders atmospheric HUD with restrained telemetry and NO generic spinners or cards', () => {
    render(<FutureProjectHUD progress={0.25} isMobile={false} />);

    // Signal 01 is active at progress 0.25
    expect(screen.getByText(/SIGNAL ACQUIRED \/\/ 0x7F/i)).toBeInTheDocument();
    expect(screen.getByText(/DEEP FIELD OBSERVATORY/i)).toBeInTheDocument();
    expect(screen.getByText(/STATUS: INITIALIZING/i)).toBeInTheDocument();

    // Verify absence of generic loader / spam patterns
    expect(screen.queryByText(/loading \d+%/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/coming soon!/i)).not.toBeInTheDocument();
  });

  it('transitions to sector reservoir standby at the end of the sequence', () => {
    render(<FutureProjectHUD progress={0.92} isMobile={false} />);

    expect(screen.getByText(/SECTOR RESERVOIR STABILIZED/i)).toBeInTheDocument();
    expect(screen.getByText(/Multiple Future Worlds In Standby/i)).toBeInTheDocument();
    expect(screen.getByText(/5 unidentified project signals actively synchronizing across deep space/i)).toBeInTheDocument();
  });
});
