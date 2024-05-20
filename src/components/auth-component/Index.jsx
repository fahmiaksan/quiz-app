import { Button, Input, Link } from "@nextui-org/react";
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { useNavigate } from "react-router-dom";
export default function ComponentAuth() {
  const navigate = useNavigate();
  const LoginSchma = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Username harus memiliki setidaknya 3 karakter')
      .max(20, 'Username tidak boleh lebih dari 20 karakter')
      .matches(/^[a-zA-Z0-9]+$/, 'Username tidak boleh mengandung simbol')
      .required('Username wajib diisi'),
    password: Yup.string()
      .max(20, 'Username tidak boleh lebih dari 20 karakter')
      .min(8, 'Password harus memiliki setidaknya 8 karakter')
      .required('Password wajib diisi'),
  });

  return (
    <div className="w-full h-screen bg-white flex justify-center items-center px-10">
      <div className="w-full flex flex-row">
        <div className="w-11/12">
          <img
            src="/logo.jpg"
            alt="logo"
            className="w-full object-cover"
          />
        </div>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchma}
          onSubmit={(values) => {
            localStorage.setItem('user', JSON.stringify(values));
            navigate('/quiz');
          }}
        >
          {
            () => (
              <Form className="w-full flex justify-center items-center flex-col space-y-5">
                <h1 className="text-3xl text-gray-700">Lets Play Quizz</h1>
                <span className="border-l-4 pl-2 py-2 mb-6 text-gray-400">Before you start, please login to your account</span>
                <div className="w-1/2">
                  <Field name="username">
                    {({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Username"
                      />
                    )}
                  </Field><ErrorMessage className="text-red-600" name="username" component='div' />
                </div>
                <div className="w-1/2">
                  <Field name="password">
                    {({ field }) => (
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                      />
                    )}
                  </Field><ErrorMessage name="password" className="text-red-600" component='div' />
                </div>
                <div className="w-1/2">
                  <Button
                    auto
                    color="primary"
                    size="lg"
                    type="submit"
                    title="Submit"
                  >
                    Login
                  </Button>
                </div>
              </Form>
            )
          }
        </Formik>
      </div>
    </div>
  )
}
