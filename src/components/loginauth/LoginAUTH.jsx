"use client";
// LoginAuth.js
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useDispatch } from "react-redux";
import Login from "@/app/api/auth/loginButton";
import Logout from "@/app/api/auth/logoutButton";
import styles from "./login.module.css";
import { userRegister } from "@/redux/actions";
import Image from "next/image";
import { Menu, Dropdown } from "antd";
import Link from "next/link";
import authProfile from "@/app/api/auth/authProfile"

const LoginAuth = () => {
  const { user, isLoading } = useUser();
  const [registrationRequested, setRegistrationRequested] = useState(false);
  const [showEmailVerificationAlert, setShowEmailVerificationAlert] =
    useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (user && !isLoading) {
        if (!registrationRequested) {
          setRegistrationRequested(true);

          const userData = {
            name: user.name,
            email: user.email,
            email_verified: user.email_verified,
          };
          dispatch(userRegister(userData));
        }
      }
    };

    fetchData();
  }, [user, isLoading, registrationRequested]);

  useEffect(() => {
    if (user && !isLoading && !user.email_verified) {
      setShowEmailVerificationAlert(true);
    }
  }, [user, isLoading]);

  const menu = (
    <Menu>
      <Menu.Item key="favorites">
        <Link href={"/favorites"}>
          <p>❤️ FAVORITOS</p>
        </Link>
      </Menu.Item>
      <Menu.Item key="profile">
        <Link href="/carrito">
          <p>CARRITO</p>
        </Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <Link href="/api/auth/logout">
          <p>LOGOUT</p>
        </Link>
      </Menu.Item>
    </Menu>
  
  );
  
return (
    <div>
      <div className={styles.profileContainer}>
        {isLoading ? (
          <div>Cargando...</div>
        ) : user ? (
          <div className={styles.userCont}>
            {/* <div>
              {user ? (
                <Logout className={styles.logoutButton} />
              ) : (
                <Login className={styles.loginButton} />
              )}
            </div> */}
            <div>
          
            </div>
            <div className={styles.rightContent}>
              <Dropdown overlay={menu} trigger={["click"]}>
                <Image
                  src={user.picture}
                  width={60}
                  height={60}
                  alt={user.name}
                  className={styles.profileImage}
                />
              </Dropdown>
            </div>
          </div>
        ) : (
          <div>
            <Login className={styles.loginButton} />
          </div>
        )}
      </div>

      {showEmailVerificationAlert && (
        <div className={styles.alertContainer}>
          Tu correo electrónico no ha sido verificado. Por favor, verifica tu
          correo electrónico para continuar.
          <a href="/api/auth/logout" className={styles.alertButton}>
            Aceptar
          </a>
        </div>
      )}
    </div>
  );
};

export default LoginAuth;
