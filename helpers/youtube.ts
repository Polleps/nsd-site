export const getYTThumbnailUrl = (url: string) => {
  const id = url.match('[\\?&]v=([^&#]*)')?.[ 1 ]
    ?? url.match('https:\/\/([^&#]*)\/([^&#]*)')?.[ 2 ]
    ?? '';

  return `https://img.youtube.com/vi/${id}/0.jpg`;
};
