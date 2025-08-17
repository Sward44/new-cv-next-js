"use client";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faXmark,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { SendIcon } from "@/components/img/form/logoForm";
import ReactCountryFlag from "react-country-flag";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./FormAdd.module.scss";

function FormAdd({ onNewEmailReceive, handlePopup, formulaire, locale }) {
  const [defaultValues, setDefaultValues] = React.useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isFinish = useRef(false);
  const options = [
    { optionValue: "+33", valueFlag: "FR" },
    { optionValue: "+44", valueFlag: "GB" },
    { optionValue: "+1", valueFlag: "US" },
  ];

  React.useEffect(() => {
    const fetchDefaultValuesSession = async () => {
      const values = {
        email: onNewEmailReceive.email,
        site: "https://",
        name: onNewEmailReceive?.name ? onNewEmailReceive.name : "",
        surname: onNewEmailReceive?.surname ? onNewEmailReceive.surname : "",
        number: onNewEmailReceive?.phone
          ? `0${onNewEmailReceive.phone.slice(
              3,
              onNewEmailReceive.phone.length + 1
            )}`
          : "",
      };
      setDefaultValues(values);
    };
    fetchDefaultValuesSession();
  }, [onNewEmailReceive]);

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

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  async function submit(values) {
    try {
      setIsLoading(true);
      clearErrors();
      const newEmailWithoutId = values;
      newEmailWithoutId.phone =
        newEmailWithoutId.indicatif + newEmailWithoutId.number;
      const response = await fetch(`${locale}/api/post`, {
        method: "POST",
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
          icon={faSpinner}
          spinPulse
          className={styles.loadingSpin}
        />
      )}
      {isFinish.current ? (
        <div className={styles.containerFormulaire}>
          <h2 style={{ marginBottom: "2rem" }}>{formulaire.thank}</h2>
          <button onClick={handlePopup}>Ok </button>
        </div>
      ) : (
        <div className={styles.containerFormulaire}>
          <form onSubmit={handleSubmit(submit)} className={styles.form}>
            <div className={styles.format}>
              <h2 className={styles.flexFill}>{formulaire.title}</h2>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={handlePopup}
                className={styles.mark}
              />
            </div>
            <div className={styles.form}>
              <label htmlFor="email">{formulaire.email}</label>
              <input
                id="email"
                type="text"
                {...register("email")}
                // defaultValues={"email"}
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
                // defaultValues={"site"}
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
              <div className={styles.format} style={{ marginBottom: 0 }}>
                <select
                  id="indicatif"
                  {...register("indicatif")}
                  style={{ marginBottom: "1rem" }}
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
                  style={{ flex: "1 1 auto", marginBottom: "1rem" }}
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
              style={{ marginBottom: "2rem" }}
              placeholder={formulaire.commentPlaceholder}
            ></textarea>
            <button
              disabled={isSubmitting}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fill: "white",
                }}
              >
                <SendIcon />
                <span style={{ marginLeft: "10px" }}>Envoyer</span>
              </span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default FormAdd;
