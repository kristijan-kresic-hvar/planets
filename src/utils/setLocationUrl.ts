const setLocationUrl = (hash: string, option: string) => {
  const formattedHash = hash.replace(/^#/, '');
  const newUrl = `${window.location.origin}#${formattedHash}?option=${option}`;
  window.history.replaceState(null, '', newUrl);
};

export default setLocationUrl;
