"use client";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactCountryFlag from "react-country-flag";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./FormAdd.module.scss";

function FormAdd({ onNewEmailReceive, handlePopup, formulaire }) {
  // console.log(onNewEmailReceive);
  // console.log(formulaire);
  const [isLoading, setIsLoading] = useState(false);
  const isFinish = useRef(false);
  const options = [
    { optionValue: "+33", valueFlag: "FR" },
    { optionValue: "+44", valueFlag: "GB" },
    { optionValue: "+1", valueFlag: "US" },
  ];

  const defaultValues = {
    _id: onNewEmailReceive["_id"],
    email: onNewEmailReceive["email"],
    name: "",
    surname: "",
    createdAt: onNewEmailReceive["createdAt"],
    updatedAt: onNewEmailReceive["updatedAt"],
    done: onNewEmailReceive["done"],
    site: "https://",
  };

  const schema = yup.object({
    email: yup
      .string()
      .required(`${formulaire.message.email.required}`)
      .email(`${formulaire.message.email.email}`),
    site: yup
      .string()
      .matches(/^((http|https):\/\/)/, `${formulaire.message.site.url}`),
    name: yup.string().required(`${formulaire.message.email.required}`),
    surname: yup.string().required(`${formulaire.message.email.required}`),
    indicatif: yup.string(),
    number: yup.number(`${formulaire.message.phone.number}`).typeError(),
    createdAt: yup.date(),
    updatedAt: yup.date(),
    done: yup.boolean(),
    comments: yup.string(),
  });
  const {
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  async function submit(values) {
    try {
      setIsLoading(true);
      clearErrors();
      console.log(values);
      const newEmailWithoutId = values;
      newEmailWithoutId.phone =
        newEmailWithoutId.indicatif + newEmailWithoutId.number;
      console.log(newEmailWithoutId);
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/post`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmailWithoutId),
      });
      if (response.ok) {
        const newEmailFooter = await response.json();
        isFinish.current = true;
        reset();
        // onNewEmailReceive(newEmailFooter);
      } else {
        setError("generic", {
          type: "generic",
          message: "Problèmes serveurs else",
        });
      }
    } catch (e) {
      setError("generic", {
        type: "generic",
        message: "Problèmes serveurs catch",
      });
    }
    setIsLoading(false);
  }

  return (
    <div className={styles.formulaire}>
      {isLoading && (
        <FontAwesomeIcon
          icon={require("@fortawesome/free-solid-svg-icons")["faSpinner"]}
          spinPulse
          className={styles.loadingSpin}
        />
      )}
      {isFinish.current ? (
        <div className={styles.containerFormulaire}>
          <h2 style={{ "margin-bottom": "2rem" }}>{formulaire.thank}</h2>
          <button onClick={handlePopup}>Ok </button>
        </div>
      ) : (
        <div className={styles.containerFormulaire}>
          <form onSubmit={handleSubmit(submit)} className={styles.form}>
            <div className={styles.format}>
              <h2 className={styles.flexFill}>{formulaire.title}</h2>
              <FontAwesomeIcon
                onClick={handlePopup}
                icon={require("@fortawesome/free-solid-svg-icons")["faXmark"]}
                className={styles.mark}
              />
            </div>
            <div className={styles.form}>
              <label htmlFor="email">{formulaire.email}</label>
              <input
                id="email"
                type="text"
                {...register("email")}
                defaultValues={"email"}
              ></input>
              {errors?.email && (
                <p className={styles.errors}>{errors.email.message}</p>
              )}
              {errors?.email && (
                <p className={styles.errors}>{errors.required.message}</p>
              )}
            </div>
            <div className={styles.form}>
              <label htmlFor="site">{formulaire.site}</label>
              <input
                id="site"
                type="text"
                {...register("site")}
                defaultValues={"site"}
              />
              {errors?.site && (
                <p className={styles.errors}>{errors.site.message}</p>
              )}
            </div>
            <div className={styles.form}>
              <label htmlFor="name">{formulaire.name}</label>
              <input id="name" type="text" {...register("name")} />
              {errors?.name && (
                <p className={styles.errors}>{errors.name.message}</p>
              )}
            </div>
            <div className={styles.form}>
              <label htmlFor="surname">{formulaire.surname}</label>
              <input id="surname" type="text" {...register("surname")} />
              {errors?.surname && (
                <p className={styles.errors}>{errors.surname.message}</p>
              )}
            </div>
            <div className={styles.form}>
              <label htmlFor="number">{formulaire.phone}</label>
              <div className={styles.format} style={{ "margin-bottom": "0" }}>
                <select
                  id="indicatif"
                  {...register("indicatif")}
                  style={{ "margin-bottom": "1rem" }}
                >
                  {options.map((option) => (
                    <option key={option.optionValue} value={option.optionValue}>
                      <ReactCountryFlag countryCode={option.valueFlag} />{" "}
                      {option.optionValue}
                    </option>
                  ))}
                </select>
                <input
                  id="number"
                  type="number"
                  {...register("number", { valueAsNumber: true })}
                  style={{ flex: "1 1 auto", "margin-bottom": "1rem" }}
                />
                {errors?.number && (
                  <p className={styles.errors}>{errors.number.message}</p>
                )}
              </div>
            </div>
            <label htmlFor="comments">{formulaire.comments}</label>
            <textarea
              id="comments"
              type="text"
              {...register("comments")}
              style={{ "margin-bottom": "2rem" }}
              placeholder={formulaire.commentPlaceholder}
            ></textarea>
            <button disabled={isSubmitting}>
              <FontAwesomeIcon
                icon={
                  require("@fortawesome/free-solid-svg-icons")["faPaperPlane"]
                }
                style={{ marginRight: "2rem" }}
              />
              Envoyer
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default FormAdd;
