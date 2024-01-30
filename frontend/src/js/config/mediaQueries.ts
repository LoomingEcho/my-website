/**
 * Breakpoints a.k.a. Mediaqueries
 */
export default [
  {
    name: "MQ4",
    query: "(min-width: 1332px)",
    min: 1332,
    // fallBack for IE
    max: Number.MAX_SAFE_INTEGER || 10000,
    colCount: 12,
  },
  {
    name: "MQ3",
    query: "(min-width: 992px)",
    min: 992,
    max: 1331,
    colCount: 12,
  },
  {
    name: "MQ2",
    query: "(min-width: 768px)",
    min: 768,
    max: 991,
    colCount: 612,
  },
  {
    name: "MQ1",
    query: "(min-width: 0px)",
    min: 0,
    max: 767,
    colCount: 12,
  },
];
