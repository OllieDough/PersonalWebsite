"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

const navItems = [
  { label: "About", href: "/about", hover: { rotate: -5, scale: 1.1, color: "#FF00FF" } },
  { label: "Projects", href: "/projects", hover: { rotate: 5, scale: 1.15, color: "#00FFFF" } },
  { label: "Contact", href: "/contact", hover: { y: -5, color: "#FF6600" } },
  { label: "Resume", href: "/resume", hover: { x: 5, color: "#00FF00" } },
];

const socialLinks = [
  { icon: <Github size={20} />, href: "https://github.com/yourusername" },
  { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/yourusername" },
  { icon: <Twitter size={20} />, href: "https://twitter.com/yourusername" },
];

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      {/* Left: RAM Logo */}
      <Link href="/" style={styles.logo}>
        <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
          <Image src="/ram.svg" alt="Logo" width={60} height={60} />
        </motion.div>
      </Link>

      {/* Center: Nav links + Divider + Socials */}
      <div style={styles.rightSection}>
        <ul style={styles.navList}>
          {navItems.map((item) => (
            <motion.li
              key={item.href}
              whileHover={item.hover}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              style={styles.navItem}
            >
              <Link href={item.href} style={styles.link}>
                <motion.span style={styles.navText}>{item.label}</motion.span>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Divider Line */}
        <div style={styles.divider} />

        {/* Social Icons */}
        <ul style={styles.iconList}>
          {socialLinks.map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.3, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={styles.iconItem}
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.iconLink}
              >
                {item.icon}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    width: "100%",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between" as const,
    alignItems: "center",
    position: "sticky" as const,
    top: 0,
    zIndex: 1000,
    // backgroundColor: "transparent",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  navList: {
    display: "flex",
    gap: "1.5rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navItem: {
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
  },
  navText: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "1rem",
    color: "#aa66cc",
    transition: "all 0.3s",
  },
  divider: {
    height: "24px",
    width: "2px",
    backgroundColor: "#FFD700",
    opacity: 0.2,
  },
  iconList: {
    display: "flex",
    gap: "1rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  iconItem: {
    cursor: "pointer",
  },
  iconLink: {
    color: "#aa66cc",
    transition: "color 0.3s",
  },
};