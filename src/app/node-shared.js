module.exports.getCritterLocation = function getCritterLocation(location) {
  if (!location) return 'unknown';
  switch (location.toLowerCase()) {
    // case 'pier':
    // return 'ocean';
    default:
      return location.toLowerCase();
  }
};
