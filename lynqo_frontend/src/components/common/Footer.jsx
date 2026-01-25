import { useEffect, useState } from "react";



export default function Footer() {
const [hidden, setHidden] = useState(false);


useEffect(() => {
let lastScrollY = window.scrollY;


const handleScroll = () => {
if (window.scrollY > lastScrollY) {
setHidden(true); 
} else {
setHidden(false);
}
lastScrollY = window.scrollY;
};


window.addEventListener("scroll", handleScroll);
return () => window.removeEventListener("scroll", handleScroll);
}, []);


return (
<footer className={`lynqo-footer ${hidden ? "hidden" : ""}`}>
<div className="footer-content">
<div className="footer-col">
<h4>Lynqo</h4>
<p>Language learning made simple.</p>
<p className="copyright">
© 2026 Lynqo. All rights reserved.
</p>
<p className="owners">Owners: Lynqo Team: Norbi Robi Bia</p>
</div>


<div className="footer-col">
<h4>Contact</h4>
<p>Email: <a href="mailto:support@lynqo.ch">support@lynqo.ch</a></p>
<p>Phone: +36 70 365 1965</p>
</div>


<div className="footer-col">
<h4>Navigation</h4>
<a href="/">Home</a>


</div>

<br/>
<div className="footer-col">
<h4>Follow Us</h4>
<div className="socials">
<a href="https://www.instagram.com/lynqo_/">Instagram</a>
<br/>
<a href="#">Twitter</a>
<br/>
<a href="#">TikTok</a>
</div>
</div>
</div>
</footer>
);
}

