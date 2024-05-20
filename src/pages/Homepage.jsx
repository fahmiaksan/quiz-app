import MainLayout from "../layouts/MainLayout";
import ContentHomepage from "../components/content-homepage/ContentHomepage";
import NavbarComponent from "../components/navbar/Index";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const user = localStorage.getItem('user');
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/quiz');
    }
  });
  return (
    <>
      <NavbarComponent />
      <MainLayout>
        <ContentHomepage />
      </MainLayout>
    </>
  )
}