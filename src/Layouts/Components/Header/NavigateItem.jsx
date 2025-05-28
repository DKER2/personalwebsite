import React from "react";
import styles from "./Header.module.css";

function NavigateItem(props) {
  // Destructure navigateToHomePage from props
  const { name, scrollTo, navigateToHomePage } = props;

  return (
    <button
      className={styles.button}
      onClick={() => {
        // Call the passed-in navigateToHomePage function
        if (navigateToHomePage) {
          navigateToHomePage();
        }
        scrollTo(name);
      }}
    >
      <div>{name}</div>
    </button>
  );
}

export default NavigateItem;
