interface Obj {
  [key: string]: any;
}

const dotNotate = (obj: Obj, target: Obj = {}, prefix: string = ''): object => {
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'object') {
      dotNotate(value, target, prefix + key + '.');
    } else {
      return (target[prefix + key] = value);
    }
  }

  return target;
};

export default dotNotate;
