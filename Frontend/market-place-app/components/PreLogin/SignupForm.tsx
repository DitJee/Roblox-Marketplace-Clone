import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SignupInfo } from "./interfaces";
import AuthService from "../../Services/auth.service";
import { useLocation, useNavigate } from "react-router-dom";

const validationSchema = () => {
  return Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val: any) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });
};

const SignupForm = (props) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bSuccessful, setbSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const successfulClassName: { bar: string; icon: string } = {
    bar: "bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md",
    icon: "fill-current h-6 w-6 text-teal-500 mr-4",
  };
  const unSuccessfulClassName: { bar: string; icon: string } = {
    bar: "bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md",
    icon: "fill-current h-6 w-6 text-red-500 mr-4",
  };

  const initialValues: SignupInfo = {
    username: "",
    email: "",
    password: "",
  };

  const handleRegister = async (formValue: SignupInfo) => {
    const { username, email, password } = formValue;

    setMessage("");
    setbSuccessful(false);

    try {
      await AuthService.register(username, email, password);
      navigate("/login");
      //window.location.reload();
    } catch (error) {
      console.log(error);
      const resMessage: string =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.toString();

      setMessage(resMessage);
      setbSuccessful(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="m-auto">
        <h1 className="text-6xl font-normal leading-normal mt-0 mb-2 text-gray-800">
          ROBLOCK
        </h1>
        <div className="top-10 p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h4 className="text-3xl font-normal leading-normal mt-0 mb-2 dark:text-gray-300">
            REGISTER
          </h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              {[
                {
                  context: "username",
                  type: "text",
                },
                {
                  context: "email",
                  type: "email",
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-4 form-control"
                  />
                  <ErrorMessage
                    name={element.context}
                    component="div"
                    className="mt-5 mb-5 flex items-center border dark:border-red-800 bg-gray-700  text-white text-sm font-bold px-4 py-3"
                  />
                </div>
              ))}
              <div className="form-group flex justify-center">
                <button
                  type="submit"
                  className="text-purple-500 bg-gray-100 px-7 py-2 shadow-md    rounded-full font-bold my-2 hover:shadow-xl active:scale-90 transition duration-150"
                  disabled={bSuccessful}
                >
                  <div className="flex items-center space-x-2">
                    <span>Register</span>
                    {bSuccessful && (
                      <div
                        className="flex spinner-border animate-spin  w-8 h-8 border-4 rounded-full"
                        role="status"
                      >
                        <span className="visually-hidden"></span>
                      </div>
                    )}
                  </div>
                </button>
              </div>
              {message && (
                <div
                  className={
                    bSuccessful
                      ? successfulClassName.bar
                      : unSuccessfulClassName.bar
                  }
                  role="alert"
                >
                  <div className="flex">
                    <div className="py-1">
                      <svg
                        className={
                          bSuccessful
                            ? successfulClassName.icon
                            : unSuccessfulClassName.icon
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold">{}</div>
                      <div className="text-sm py-1 items-center">{message}</div>
                    </div>
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
export default SignupForm;
