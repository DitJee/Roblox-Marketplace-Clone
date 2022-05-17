import React from "react";
import { useState } from "react";
import Image from "next/image";
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LoginInfo } from "./interfaces";
import AuthService from "../../Services/auth.service";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = () => {
  return Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
};

const Login = (props) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, bSetLoading] = useState(false);
  const [message, setMessage] = useState("");

  const initialValues: LoginInfo = {
    username: "",
    password: "",
  };

  const handleLogin = async (formValue: LoginInfo) => {
    const { username, password } = formValue;

    setMessage("");
    bSetLoading(true);

    try {
      await AuthService.login(username, password);
      navigate("/home");
      //window.location.reload();
    } catch (error) {
      const resMessage: string =
        error.response && error.response.data && error.response.data.message
          ? error.message
          : error.toString();

      setMessage(resMessage);
      bSetLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="m-auto">
        <h1 className="text-6xl font-normal leading-normal mt-0 mb-2 text-gray-800">
          ROBLOCK
        </h1>
        <div className="top-10 p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h4 className="text-3xl font-normal leading-normal mt-0 mb-2 dark:text-gray-300">
            SIGN IN
          </h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
              {[
                {
                  context: "username",
                  type: "text",
                },
                {
                  context: "password",
                  type: "password",
                },
              ].map((element) => (
                <div key={element.context} className="form-group">
                  <label
                    htmlFor={element.context}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {element.context}
                  </label>
                  <Field
                    name={element.context}
                    type={element.type}
                    className="inputRow"
                  />
                  <ErrorMessage
                    name={element.context}
                    component="div"
                    className="mt-5 mb-5 flex items-center border dark:border-red-800 bg-gray-700  text-white text-sm font-bold px-4 py-3"
                  />
                </div>
              ))}
              <div className="form-group flex items-center justify-between">
                <button
                  type="submit"
                  className="text-purple-500 bg-gray-100 px-7 py-2 shadow-md    rounded-full font-bold my-2 
                    hover:shadow-xl
                    active:scale-90 transition duration-150
                    "
                  disabled={loading}
                >
                  <div className="flex items-center space-x-2">
                    <span>Login</span>
                    {loading && (
                      <div
                        className="flex spinner-border animate-spin  w-8 h-8 border-4 rounded-full"
                        role="status"
                      >
                        <span className="visually-hidden"></span>
                      </div>
                    )}
                  </div>
                </button>
                <Link className="px-5 " to="/register">
                  <h5 className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                    Don't have an account?
                  </h5>
                </Link>
              </div>
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
