export const megaByte = 1024 * 1024;
export const caption = '(MP4)';

export const enum ImageFormats {
  PNG = 'image/png',
  JPEG = 'image/jpeg',
  JPG = 'image/jpg',
  SVG = 'image/svg+xml',
}

export const enum ImageExtensions {
  PNG = '.png',
  JPEG = '.jpeg',
  JPG = '.jpg',
  SVG = '.svg',
}
export const imageFormats: string[] = [
  ImageFormats.PNG,
  ImageFormats.JPEG,
  ImageFormats.JPG,
  ImageFormats.SVG,
];

export const allowedImageSize: number = 3 * megaByte;
export const allowedVideoSize: number = 50 * megaByte;
