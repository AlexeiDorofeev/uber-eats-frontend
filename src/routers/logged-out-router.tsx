import React from "react";
import { useForm } from "react-hook-form";

export const LoggedOutRouter = () => {
  const { register, watch, handleSubmit, errors } = useForm();
  const onSubmit = () => {
    console.log(watch());
  };
  const onInvalid = () => {
    console.log("cant create account");
  };
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            ref={register({
              required: true,
              validate: (email: string) => email.includes("@gmail.com"),
            })}
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            ref={register({
              required: true,
            })}
            type="password"
            name="password"
            placeholder="Placeholder"
          />
        </div>
        <button className="bg-yellow-300 text-white">Submit</button>
      </form>
    </div>
  );
};
