import React, { useState, useEffect, useMemo, useCallback } from "react";

import SearchModal from "./components/searchModal";
import "./styles.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const closeModal = (e) => {
    setShowModal(false);
  };
  useEffect(() => {
    const handler = function (event) {
      if (event.metaKey && event.key === "k") {
        setShowModal(true);
      }
    };
    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);
  return (
    <div>
      Please click command + k to see the modal
      {showModal ? <SearchModal closeModal={closeModal} /> : null}
    </div>
  );
}
