import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, User, DropdownMenu } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavbarComponent() {
  const objectUser = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('quiz-state');
    localStorage.removeItem('type-quiz');
    navigate('/');
  };
  return (
    <Navbar isBordered isBlurred>
      <NavbarBrand>
        <span className="text-3xl font-bold text-white">Quiz App</span>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          {
            location.pathname === '/' && !objectUser && <Link href="/login" className="text-white px-4 py-2 rounded-md text-center bg-blue-600">
              Login
            </Link>
          }

          {
            location.pathname !== '/' && objectUser &&
            <>
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: "/avatar.jpg",
                    }}
                    className="transition-transform"
                    description={objectUser.username.replace(/\s/g, '')}
                    name={objectUser.username}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold">Signed in as</p>
                    <p className="font-bold">@{objectUser.username.replace(/\s/g, '')}</p>
                  </DropdownItem>
                  <DropdownItem onClick={logoutHandler} key="logout" color="danger">
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </>
          }
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
