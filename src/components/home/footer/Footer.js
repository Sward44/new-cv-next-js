"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCurrentLanguages } from "@/hooks/useCurrentLanguages";
import FormAdd from "@/components/form/FormAdd";
import styles from "./Footer.module.scss";

export default function Footer({ footer, formulaire }) {
  const [newEmail, setNewEmail] = useState([]);
  const [popup, setPopup] = useState(false);

  function onNewEmailReceived(emailReceive) {
    setNewEmail([...newEmail, emailReceive]);
    setPopup(true);
  }

  function handlePopup() {
    setPopup(false);
  }

  const locale = useCurrentLanguages();
  const defaultValues = {
    email: "",
    done: false,
  };

  const schema = yup.object({
    email: yup
      .string()
      .required(formulaire.message.email.required)
      .email(formulaire.message.email.email),
  });
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  async function submit(values) {
    try {
      clearErrors();
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const newEmailFooter = await response.json();
        newEmailFooter.done = !newEmailFooter.done;
        onNewEmailReceived(newEmailFooter);
        reset(defaultValues);
      } else {
        setError("generic", {
          type: "generic",
          message: formulaire.message.generic.else,
        });
      }
    } catch (e) {
      setError("generic", {
        type: "generic",
        message: formulaire.message.generic.catch,
      });
    }
  }

  return (
    <>
      <footer className={styles.footer}>
        <h2 className={styles.titleSmall}>{footer.title}</h2>

        <form onSubmit={handleSubmit(submit)}>
          <FontAwesomeIcon
            icon={
              require("@fortawesome/free-regular-svg-icons")[
                footer.iconLeft.iconName
              ]
            }
            height={16}
            className={styles.prefix}
            alt={footer.iconLeftAlt}
          />
          <input
            {...register("email")}
            id="email"
            type="email"
            name="email"
            placeholder={footer.placeholder}
          ></input>

          <button disabled={isSubmitting} id="click-button">
            <FontAwesomeIcon
              icon={
                require("@fortawesome/free-regular-svg-icons")[
                  footer.iconRight.iconName
                ]
              }
              height={16}
              className={styles.postfix}
              alt={footer.iconRightAlt}
            />
          </button>
        </form>
        {errors?.email && <p>{errors.email.message}</p>}
        {errors?.generic && <p>{errors.generic.message}</p>}
      </footer>
      {popup && (
        <FormAdd
          onNewEmailReceive={newEmail[0]}
          handlePopup={handlePopup}
          formulaire={formulaire}
        />
      )}
    </>
  );
}
