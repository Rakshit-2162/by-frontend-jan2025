import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { colors } from "../../assets/colors";
import logo from "../../assets/banking-app-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/apiServices";
import { useState } from "react";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: any) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard"); // Redirect on successful login
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message); // Set error message safely
      } else {
        setErrorMessage("An unknown error occurred"); // Fallback message
      }
    }
  };

  return (
    <>
      <header>
        <nav
          className="navbar p-3"
          style={{ color: "white", background: colors.primary }}
        >
          <div className="container d-flex justify-content-between align-items-center">
            <img
              src={logo}
              alt="Logo"
              className="rounded-3"
              style={{ width: "200px" }}
            />
            <Link to={"/signUpPage"}>
              <button className="btn btn-outline-light">Sign Up</button>
            </Link>
          </div>
        </nav>
      </header>

      <section
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4 text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>

            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-5">
              <div
                className="card px-5 py-4 border-0 text-center"
                style={{ background: colors.primary }}
              >
                <div className="text-center text-light fs-4 pb-3">Login</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Email Input */}
                  <div className="form-outline mb-3">
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Email"
                      className="form-control form-control-lg border-0"
                      style={{
                        background: colors.darkBackground,
                        color: "white",
                      }}
                    />
                    {errors.email && (
                      <small className="text-danger">
                        {errors.email.message}
                      </small>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      {...register("password")}
                      placeholder="Password"
                      className="form-control form-control-lg border-0"
                      style={{
                        background: colors.darkBackground,
                        color: "white",
                      }}
                    />
                    {errors.password && (
                      <small className="text-danger">
                        {errors.password.message}
                      </small>
                    )}
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <div className="d-flex justify-content-between align-items-center mb-3 p-2 px-3 rounded bg-danger bg-opacity-50">
                      <span className="text-light">
                        <i className="bi bi-exclamation-circle-fill">
                          {" "}
                          Error: {errorMessage}
                        </i>
                      </span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-light w-100 p-2 fs-5 rounded-pill"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
