import { logo } from "../assets";
import { Link } from "react-router-dom";

const AuthHeader = () => {
  return (
    <Link to="/" className="flex items-center gap-2 p-4">
        <img src={logo} alt='sumz_logo' className='w-28 object-contain' />
    </Link>
  );
};

export default AuthHeader;
