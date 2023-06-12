import React from "react";
import { Link } from "react-router-dom";

export default function ConditionalLink({ path, children, condition }) {
  return condition ? <Link to={path}>{children}</Link> : <>{children}</>;
}
