import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 text-center py-4">
      <p className="text-sm">
        © {new Date().getFullYear()} SkillSwap. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
