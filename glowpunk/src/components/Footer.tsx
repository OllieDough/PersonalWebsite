import React from "react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© {new Date().getFullYear()} Glowpunk</p>
      <p style={styles.text}> Soft as water and burn like sunshine</p>
    </footer>
  );
}

const styles = {
  footer: {
    width: "100%",
    padding: "1rem",
    backgroundColor: "#111",
    color: "#eee",
    textAlign: "center" as const,
    fontSize: "0.9rem",
    marginTop: "auto",
  },
  text: {
    margin: 0,
  },
};