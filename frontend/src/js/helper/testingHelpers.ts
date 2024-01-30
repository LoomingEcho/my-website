/**
 * Convert multiple elements (or array of elements) to NodeList of elements
 * @param {Element[]} elements
 *
 * @returns {NodeListOf<Element>}
 */
export const toNodeList = (...elements: Element[] | Element[][]): NodeListOf<Element> => {
  let elArr;
  if (elements.length === 1 && Array.isArray(elements[0])) {
    elArr = elements[0] as Element[];
  } else {
    elArr = elements as Element[];
  }

  const fragment = document.createDocumentFragment();
  elArr.forEach(function (el) {
    fragment.appendChild(el);
  });
  return fragment.childNodes as NodeListOf<Element>;
};
