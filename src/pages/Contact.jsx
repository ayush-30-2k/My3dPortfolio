import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import { Fox } from "../models";
import useAlert from "../hooks/useAlert";
import { Alert, Loader } from "../components";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState(
    "Dragon_Boss_05_idle"
  );
  const i = 0;
  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });

    // if (form.name.length || form.email.length || form.message.length) {
    //   handleTyping();
    // }
  };

  // useEffect(() => {
  //   console.log(isTyping);
  //   handleTyping();

  //   setTimeout(() => {
  //     setisTyping(true);
  //   }, 950);
  // }, [form.length]);

  // const [isTyping, setisTyping] = useState(false);

  // const handleTyping = () => {
  //   isTyping && setCurrentAnimation("Dragon_Boss_05_skill04");
  // };

  const [isAnimateIdle, setIsAnimateIdle] = useState(true);

  const handleTypingOver = () => {
    if (handleTypingStart()) {
      setCurrentAnimation("Dragon_Boss_05_idle");
    }
    setTimeout(() => {
      setCurrentAnimation("Dragon_Boss_05_idle");
    }, 3000);
    setIsAnimateIdle(false);
  };
  const handleTypingStart = () => {
    !isAnimateIdle && setCurrentAnimation("Dragon_Boss_05_skill04");
    // setisTyping(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("Dragon_Boss_05_skill02");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Ayush",
          from_email: form.email,
          to_email: "ayushmishra22234@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Thank you for your message 😃",
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setCurrentAnimation("Dragon_Boss_05_idle");
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          setCurrentAnimation("Dragon_Boss_05_idle");

          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: "danger",
          });
        }
      );
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show && <Alert {...alert} />}

      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-7 mt-14"
        >
          <label className="text-black-500 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="John"
              required
              value={form.name}
              onChange={handleChange}
              onKeyUp={handleTypingOver}
              onKeyDown={handleTypingStart}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="John@gmail.com"
              required
              value={form.email}
              onChange={handleChange}
              onKeyUp={handleTypingOver}
              onKeyDown={handleTypingStart}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Your Message
            <textarea
              name="message"
              rows="4"
              className="textarea"
              placeholder="Write your thoughts here..."
              value={form.message}
              onChange={handleChange}
              onKeyUp={handleTypingOver}
              onKeyDown={handleTypingStart}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn"
            // onFocus={handleFocus}
            // onBlur={handleBlur}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>

      <div
        className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]"
        style={{ zIndex: "100" }}
      >
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
          />

          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[-0.5, -1.25, 0.01]}
              rotation={[12.629, -0.6, 0]}
              scale={[1.8, 1.8, 1.8]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
