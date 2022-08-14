import { createVars } from '../../helpers/createVars';
import { styled } from '../../stitches.config';

export interface SlotProps {
  area: string;
}

const StyledSlot = styled('div', {
  gridArea: 'var(--slot-area)',
});

export const Slot: React.FC<SlotProps> = ({ children, area}) => {
  return (
    <StyledSlot css={createVars({ 'slot-area': area })}>
      {children}
    </StyledSlot>
  );
};
