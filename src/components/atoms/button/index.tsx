import Button from '@mui/material/Button';
import React, { memo } from 'react';
import { size, color, variant } from 'src/types/common';

type Position = 'end' | 'start';
type Icon = {
  position: Position;
  icon: React.ReactNode;
};
interface IButton {
  type: 'submit' | 'reset' | 'button';
  label?: string;
  onClickHandler?: () => void;
  disabled?: boolean;
  variant: variant;
  fullWidth?: boolean;
  className?: string;
  color?: color | 'inherit';
  isLoading?: boolean;
  id: string;
  isIconButton?: boolean;
  icon?: Icon;
  size?: size;
  sx?: any;
}
const MUIButton = (props: IButton, ref: any) => {
  const {
    type,
    label,
    onClickHandler,
    disabled,
    variant,
    className,
    fullWidth,
    icon,
    color,
    id,
    size = 'medium',
    sx,
  } = props;

  return (
    <Button
      type={type ?? 'button'}
      size={size}
      variant={variant ?? 'contained'}
      fullWidth={fullWidth}
      color={color}
      className={className}
      onClick={onClickHandler}
      disabled={disabled}
      startIcon={icon?.position && icon.position === 'start' && icon.icon}
      endIcon={icon?.position && icon.position === 'end' && icon.icon}
      disableElevation
      id={id}
      data-testId={id}
      sx={sx}
    >
      {label}
    </Button>
  );
};

export default memo(MUIButton);
