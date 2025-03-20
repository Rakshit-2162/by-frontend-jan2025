import MenuList from "../MenuList/MenuList";

// fn comp with arrow fn
const Footer: React.FC = () => {
  const copyrightYear = new Date().getFullYear();
  const devName = "Kumar";
  
  // return JSX
  return (
    <footer className="text-center">
      <hr />
      <MenuList />
      <p>
        Copyright {copyrightYear} | {devName}
      </p>
    </footer>
  );
}

export default Footer;