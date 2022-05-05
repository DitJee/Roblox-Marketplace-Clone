import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserInfo, UserLocalStorage } from '../../../interfaces';
import UserService from '../../../Services/user.service';
const AboutForm = ({ user }) => {
  const initialValues: { about: string } = {
    about: user.info.about,
  };
  const [bIsEditable, setbIsEditable] = useState(false);

  const onClickEditAbout = () => {
    setbIsEditable(!bIsEditable);
  };

  const handleEditAbout = async (formValue: { about: string }) => {
    const { about } = formValue;

    const userInfo: { user: UserInfo } = {
      user: {
        id: user.info.id,
        about: about,
      },
    };

    console.log('submit', userInfo);

    try {
      await UserService.updateUserInfo(userInfo);

      setbIsEditable(!bIsEditable);
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = () => {
    return Yup.object().shape({
      about: Yup.string().test(
        'len',
        'About section must be between 0 and 1000 characters.',
        (val: any) =>
          val && val.toString().length >= 0 && val.toString().length <= 1000
      ),
    });
  };

  useEffect(() => {}, []);

  return (
    <>
      <h1 className="mb-2 text-3xl font-bold leading-normal mt-2 dark:text-gray-800">
        About
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleEditAbout}
      >
        <Form>
          <div className="form-group">
            <Field
              name={'about'}
              type={'text'}
              component="textarea"
              rows="4"
              className="bg-gray-900 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-6 dark:bg-gray-100 dark:border-gray-200 dark:placeholder-gray-200 dark:text-gray-800  form-control"
              disabled={!bIsEditable}
            />
            <ErrorMessage
              name={'about'}
              component="div"
              className="mt-5 mb-5 flex items-center border dark:border-red-500 bg-gray-700  text-white text-sm font-bold px-4 py-3"
            />
          </div>

          <div className="form-group flex justify-end gap-5 ">
            {bIsEditable ? (
              <>
                <button
                  type="button"
                  onClick={onClickEditAbout}
                  className="text-gray-800 bg-gray-100 px-7 py-2 shadow-md    rounded-full font-bold my-2 hover:shadow-xl active:scale-90 transition duration-150"
                >
                  <div className="flex items-center space-x-2">
                    <span>cancel</span>
                  </div>
                </button>
                <button
                  type="submit"
                  className="text-gray-800 bg-gray-100 px-7 py-2 shadow-md    rounded-full font-bold my-2 hover:shadow-xl active:scale-90 transition duration-150"
                >
                  <div className="flex items-center space-x-2">
                    <span>submit</span>
                  </div>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="text-gray-800 bg-gray-100 px-7 py-2 shadow-md    rounded-full font-bold my-2 hover:shadow-xl active:scale-90 transition duration-150"
                  onClick={onClickEditAbout}
                >
                  <div className="flex items-center space-x-2">
                    <span>Edit</span>
                  </div>
                </button>
              </>
            )}
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default AboutForm;
