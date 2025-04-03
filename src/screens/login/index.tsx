import { useFormik } from "formik";
import useLogin from "../../hooks/useLogin";
import * as yup from "yup";
import { Input } from "../../components/@shared/Input";

export function LoginPage() {
  const { mutateAsync: login } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async () => {
      console.log("hey i were called");

      await login({
        email: formik.values.email,
        password: formik.values.password,
      });
    },
    validationSchema: yup.object().shape({
      email: yup.string().email("Email inválido").required("Campo obrigatório"),
      password: yup.string().required("Campo obrigatório"),
    }),
  });

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          padding: "20px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "20px" }}>Login</h1>
          <h4 style={{ fontWeight: "300" }}>Type your credentials</h4>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Input
            placeholder="Email"
            formikAndName={{
              formik,
              name: "email",
            }}
          />
          <Input
            placeholder="Password"
            type="password"
            formikAndName={{
              formik,
              name: "password",
            }}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "end",
            }}
          >
            <a
              style={{
                fontSize: "12px",
                fontWeight: "300",
              }}
              href="/create-account"
            >
              Esqueceu a senha?
            </a>
          </div>
        </div>

        <button type="submit">Login in</button>
      </div>
    </form>
  );
}
