function isNumber(string) {
  if (parseInt(string)) {
    return true;
  }
}
function isBinaryCommand(text) {
  const cmdParts = text.split(" ");
  return cmdParts.length > 0 && cmdParts.length <= 2;
}
function isBinaryCommandWithNumberArg(text) {
  const cmdParts = text.split(" ");
  if (cmdParts.length > 0 && cmdParts.length <= 2) {
    if (cmdParts[1]) {
      return isNumber(cmdParts[1]);
    } else {
      return true;
    }
  }
}

function isBinaryCommandWithKey(key, text, isNumberArg) {
  if (isNumberArg === undefined) {
    isNumberArg = true;
  }
  if (key && text) {
    const isBinaryCommandRes = isNumberArg
      ? isBinaryCommandWithNumberArg(text)
      : isBinaryCommand(text);
    if (isBinaryCommandRes) {
      const cmdParts = text.split(" ");
      if (cmdParts[0] == key) {
        return true;
      }
    }
  }
  return false;
}

module.exports = {
  isBinaryCommandWithKey,
  isBinaryCommandWithNumberArg
};
