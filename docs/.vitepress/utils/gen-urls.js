function removeRepeatSlash(str) {
  return str.replaceAll(/\/\//g, '/');
}

function space2underline(str) {
  return str.replaceAll(/\s/g, '_');
}

export function autoGenUrlWithPrefix(prefix, items, handler = null) {
  const urlHandlers = [
    // url item handlers
    removeRepeatSlash,
    space2underline,
  ];
  typeof handler === 'function' && urlHandlers.push(handler);
  return items.map((item) => {
    let link = item;

    urlHandlers.forEach((filter) => {
      link = filter(item);
    });

    link = prefix + link;

    return {
      text: item,
      link,
    };
  });
}
