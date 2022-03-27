import React from "react";

import { FooterProps as Props } from "./Footer.types";

const Footer: React.FC<Props> = props => {
  return <footer className="footer"> footer </footer>;
};

Footer.defaultProps = {};

export default Footer;
