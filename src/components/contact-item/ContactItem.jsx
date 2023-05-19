import { Link } from "react-router-dom";
import style from "./contact-item.module.scss";
import { formatPhone } from "../../lib/formatPhone";

// eslint-disable-next-line react/prop-types
const ContactItem = ({ phone }) => {
  return (
    <Link className={style.contact} to={`chat/${phone}`}>
      {formatPhone(phone)}
    </Link>
  );
};

export default ContactItem;
