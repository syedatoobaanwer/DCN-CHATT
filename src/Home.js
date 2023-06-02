import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../src/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import "./Home.css";
const Home = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false
  });
  const { email, password, error, loading } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setData({ ...data, error: null, loading: true });
    if (!data.email || !data.password) {
      setData({ ...data, error: "All fields are required!" });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true
      });

      history.push("/dashboard");
    } catch (err) {
      console.log(err.message);
      setData({ ...data, error: err.message, loading: false });
    }
  };
  return (
    <div>
      <header class="myHeader">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            style={{
              width: "50px",
              height: "50px",
              position: "absolute",
              float: "left"
            }}
          >
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
        </span>
        <h1
          style={{
            textAlign: "center",
            marginLeft: "50px",
            marginTop: "15px",
            fontSize: "35px"
          }}
        >
         DCN CHAT APP!
        </h1>
      </header>

      <main>
        <div className="content">
          <h2
            style={{
              textAlign: "center",
              fontSize: "35px",
              color: "#502A75",
              marginTop: "10px"
            }}
          >
            Login
          </h2>

          <div class="formClass">
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <span>
                  <svg
                    style={{
                      width: "25px",
                      height: "30px",
                      top: "10px",
                      position: "relative"
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                />
              </div>

              <div class="form-group">
                <span>
                  <svg
                    style={{
                      width: "25px",
                      height: "30px",
                      top: "10px",
                      position: "relative"
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
              </div>

              <button className="btn">Submit</button>
              <div style={{ color: "blue" }}>
                {loading ? "Please Wait..." : ""}
              </div>
              <div style={{ color: "red" }}>{error ? error : ""}</div>
              <div>
                <h5 style={{ fontSize: "medium" }}>Don't have an Account?</h5>
                <Link to="/register">Register Here</Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
