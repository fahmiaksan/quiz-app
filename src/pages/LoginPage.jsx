import { useEffect } from "react";
import ComponentAuth from "../components/auth-component/Index";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const user = localStorage.getItem('user');
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/quiz');
    }
  });
  return (
    <ComponentAuth />
  )
}
