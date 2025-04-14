import { FaGoogle } from "react-icons/fa";
import { useUser } from "../provider/userProvider";

const Login = () => {
  const { login } = useUser();

  return (
    <div>
      <button
        onClick={login}
        className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300"
      >
        <span>Login with</span>
        <FaGoogle size={20} color="#fbbc05" />
      </button>
    </div>
  );
};

export default Login;
