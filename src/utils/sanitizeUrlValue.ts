const sanitizeUrlValue = (hash: string) => {
  // Remove non-alphanumeric characters and leading/trailing spaces
  const sanitizedHash = hash.replace(/[^a-zA-Z0-9]/g, '').trim();
  if (hash !== `#${sanitizedHash}`) {
    return sanitizedHash;
  }
  return hash;
};

export default sanitizeUrlValue;
