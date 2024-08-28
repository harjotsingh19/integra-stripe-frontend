import {
  Box,
  Stack,
  Typography,
  Avatar,
  styled,
  ListItem,
  ListItemText,
  List,
} from '@mui/material';
import { FC, useState } from 'react';
import { Accept, DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SvgIcon from '@mui/material/SvgIcon';
import Camera from 'public/assets/images/solar--camera-add-bold.svg';

interface IAccept {
  [key: string]: string[] | any;
}

interface FileDropzoneProps {
  accept: IAccept;
  caption: string;
  name: string;
  fileName: File | File[];
  onDrop: (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => void;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: any;
  isImageView?: boolean;
  multiple?: boolean;
  error?: boolean;
}

export const FileUploader: FC<FileDropzoneProps> = (props) => {
  const {
    caption,
    placeholder,
    isImageView,
    fileName,
    multiple,
    disabled = false,
    onDrop,
    error,
    ...other
  } = props;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...other,
    disabled: disabled,
    onDrop: onDrop,
    multiple,
    accept: { 'image/jpg': [], 'image/jpeg': [], 'image/png': [] },
  });
  const sxProps = !isImageView ? { width: { sm: '250px', md: '250px' } } : {};
  return (
    <Box sx={sxProps}>
      <StyledBoxContainer
        sx={
          disabled
            ? {
                backgroundColor: 'action.hover',
                cursor: 'not-allowed',
              }
            : {
                ...(isDragActive && {
                  backgroundColor: 'action.active',
                }),
                '&:hover': {
                  backgroundColor: 'action.hover',
                  cursor: 'pointer',
                },
              }
        }
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Stack
          alignItems="center"
          direction="column"
          spacing={2}
        >
          {fileName && !Array.isArray(fileName) ? (
            <Box sx={{ border: '1px dashed #d5d3d3', borderRadius: '50%', padding: '10px' }}>
              <Avatar
                sx={{ height: 120, width: 120, flexDirection: 'column' }}
                // src={URL.createObjectURL(fileName)}
                src={fileName instanceof File ? URL.createObjectURL(fileName) : fileName || ''}
                alt="Uploaded file"
              />
            </Box>
          ) : (
            <Box sx={{ border: '1px dashed #d5d3d3', borderRadius: '50%', padding: '10px' }}>
              <Avatar sx={{ height: 120, width: 120, flexDirection: 'column' }}>
                <SvgIcon sx={{ width: '32px', height: '32px', color: 'grey' }}>
                  <Camera />
                </SvgIcon>

                <Box pt={1}>
                  <Typography
                    variant="body2"
                    sx={{ color: 'grey' }}
                  >
                    Upload photo
                  </Typography>
                </Box>
              </Avatar>
            </Box>
          )}
          <Stack spacing={1}>
            <Typography
              sx={{
                color: 'grey',
              }}
              textAlign="center"
              variant="body2"
            >
              {placeholder}
            </Typography>
            {caption && (
              <Typography
                color="text.secondary"
                variant="body2"
                textAlign="center"
                sx={{ opacity: 0.5 }}
              >
                {caption}
              </Typography>
            )}
          </Stack>
        </Stack>
      </StyledBoxContainer>

      {Array.isArray(fileName) ? (
        fileName.map((item: File, index: number) => (
          <Box
            sx={{ mt: 2 }}
            key={index}
          >
            {!isImageView && (
              <Stack spacing={1}>
                <ListItem key={index}>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{ variant: 'subtitle2' }}
                  />
                </ListItem>
              </Stack>
            )}
          </Box>
        ))
      ) : (
        <Box>
          <Stack spacing={1}>
            <ListItem>
              <ListItemText
                primary={fileName.name}
                primaryTypographyProps={{ variant: 'subtitle2' }}
              />
            </ListItem>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

const StyledBoxContainer = styled(Box)({
  alignItems: 'center',
  border: 1,
  borderRadius: 14,
  borderStyle: 'dashed',
  borderColor: 'grey',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  outline: 'none',
  paddingTop: '1.5rem',
  paddingBottom: '1rem',
  paddingRight: '2rem',
  paddingLeft: '2rem',
  // opacity: 0.7,
});
