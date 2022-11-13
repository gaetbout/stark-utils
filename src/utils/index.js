import BN from "bn.js";
import { hash } from "starknet";

// TODO possible to update here using latest starknetjs func
function asciiToHex(str) {
  let arr1 = ["0x"];
  for (var n = 0; n < str.length; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join("");
}

function toSelector(val) {
  if (!val) {
    return { hexy: "", inty: "" };
  }
  const hexBN = new BN(removeHexPrefix(hash.getSelectorFromName(val)), 16);
  return { inty: hexBN.toString(10), hexy: hash.getSelectorFromName(val) };
}

function toBN(val) {
  if (BN.isBN(val)) {
    return val;
  }
  if (!val) {
    return "";
  }
  if (val.startsWith("0x") && isHex(removeHexPrefix(val))) {
    return new BN(removeHexPrefix(val), 16);
  }
  if (isDecimal(val)) {
    return new BN(val, 10);
  }
  const ascHex = asciiToHex(val);
  return new BN(removeHexPrefix(ascHex), 16);
}

function toHex(val) {
  if (!val) {
    return "";
  }
  if (val.startsWith("0x") && isHex(removeHexPrefix(val))) {
    return val;
  }
  if (isDecimal(val)) {
    const nbn = new BN(val, 10);
    return addHexPrefix(nbn.toString(16));
  }
  return asciiToHex(val);
}

function to256(val) {
  if (!val) {
    return { low: "", high: "" };
  }
  let mask = new BN(2);
  mask = mask.pow(new BN(128));
  mask = mask.sub(new BN(1));

  let bigIn = toBN(val);

  return { low: bigIn.and(mask), high: bigIn.shrn(128) };
}

function toBig3(val) {
  if (!val) {
    return { D0: "", D1: "", D2: "" };
  }
  let mask = new BN(2);
  mask = mask.pow(new BN(86));
  mask = mask.sub(new BN(1));
  let bigIn = toBN(val);

  let D0 = bigIn.and(mask);
  bigIn = bigIn.shrn(86);

  let D1 = bigIn.and(mask);
  let D2 = bigIn.shrn(86);

  return { D0, D1, D2 };
}

function removeHexPrefix(hex) {
  let hexTrim = hex.replace(/^0x/, "");
  if (hexTrim.length % 2 === 1) {
    hexTrim = "0" + hexTrim;
  }
  return hexTrim;
}

function addHexPrefix(hex) {
  return `0x${removeHexPrefix(hex)}`;
}

function isHex(val) {
  const regexp = /^[0-9a-fA-F]+$/;
  return regexp.test(val);
}

function isDecimal(val) {
  var decimalRegex = /^[0-9]+$/;
  return decimalRegex.test(val);
}

export default {
  toBN,
  removeHexPrefix,
  addHexPrefix,
  to256,
  toBig3,
  isDecimal,
  toHex,
  toSelector,
  isHex,
};
