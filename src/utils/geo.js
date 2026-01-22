export const extractLatLng = (url) => {
  if (!url) return null;

  // 1) Check ?q=lat,lng format
  let match = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) {
    return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
  }

  // 2) Check @lat,lng format
  match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) {
    return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
  }

  // 3) Check !3dlat!4dlng format (common with place URLs)
  match = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
  if (match) {
    return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
  }

  return null;
};
