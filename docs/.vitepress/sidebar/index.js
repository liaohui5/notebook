import css from "./css";
import database from "./database";
import deploy from "./deploy";
import fragments from "./fragments";
import javascript from "./javascript";
import react from "./react";
import rust from "./rust";
import vue from "./vue";

export default {
  ...css,
  ...javascript,
  ...vue,
  ...react,
  ...rust,
  ...deploy,
  ...database,
  ...fragments,
};
