// import React from 'react';

// function Dashboard() {
//   return (
//     <div>
//       <h1>Dashboard</h1>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from "react";

const namazTimes = [
  { name: "Fajr", time: "05:20 AM" },
  { name: "Dhuhr", time: "01:15 PM" },
  { name: "Asr", time: "05:00 PM" },
  { name: "Maghrib", time: "07:32 PM" },
  { name: "Isha", time: "09:00 PM" }
];

const services = [
  { icon: "📖", title: "Qur'an Classes", desc: "Classes for children & adults year-round." },
  { icon: "🙏", title: "Regular Prayers", desc: "Five daily prayers & Friday sermon." },
  { icon: "🫂", title: "Community Help", desc: "Charity, food drives, and counseling services." },
  { icon: "🕌", title: "Open to All", desc: "Interfaith tours and Da'wah outreach events." }
];

const events = [
  { date: "Sept 10", text: "Monthly Quran Intensive begins!" },
  { date: "Sept 11", text: "Youth night social for teens and kids." },
  { date: "Sept 13", text: "Special fundraising talk after Maghrib." }
];

export default function AlMawaMasjid() {
  const [donation, setDonation] = useState(12000); // example current amount
  const goal = 25000;

  // Auto-scroll event ticker
  const [currentEvent, setCurrentEvent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCurrentEvent(i => (i+1)%events.length), 3500);
    return () => clearInterval(interval);
  }, []);

  // Animations on scroll (simple fade-in)
  useEffect(() => {
    const onScroll = () => {
      document.querySelectorAll(".fadein").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) {
          el.style.opacity = 1;
          el.style.transform = "translateY(0)";
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Cairo', 'Noto Sans Arabic', sans-serif", background: "#f8fdfb", minHeight: '100vh', margin: 0 }}>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700&family=Noto+Sans+Arabic:wght@400;700&display=swap" rel="stylesheet"/>
      {/* Styles */}
      <style>{`
        .bg-pattern { background: url('https://www.transparenttextures.com/patterns/arabesque.png'), linear-gradient(135deg, #18796977 0%, #1e3c7277 100%); background-size: contain; }
        .fadein { opacity: 0; transform: translateY(50px); transition: all 1s cubic-bezier(.2,.6,.4,1); }
        .section { max-width: 1000px; margin: 0 auto; padding: 2rem 1rem; }
        .section-title { color: #187969; font-size: 2rem; font-weight: 700; margin-bottom: 1.25rem; }
        .btn-donate { background: linear-gradient(90deg,#1e3c72 0%,#2aaf4e 100%); color: #fff; font-weight: 700; padding: 14px 36px; border-radius: 32px; border: none; font-size: 1.2rem; cursor: pointer; transition:.2s; box-shadow: 0 4px 16px #1e3c7227;}
        .btn-donate:hover { background: linear-gradient(90deg,#2aaf4e 0%,#1e3c72 100%); }
        .namaz-table { display:flex; justify-content:center; gap:1.5rem; margin:1.5rem auto; font-weight:600; background:#fff; padding:1rem 1rem; border-radius:12px; box-shadow:0 2px 8px #2aaf4e12;}
        .namaz-col {text-align:center;}
        .responsive {display:flex;gap:2rem;flex-wrap:wrap;}
        @media (max-width: 768px) {
          .responsive { flex-direction: column; gap: 1rem; }
          .namaz-table { flex-direction: column; gap:.75rem; }
        }
      `}</style>

      {/* Hero */}
      <header className="bg-pattern" style={{ padding: "60px 0 30px 0", textAlign: "center", color: "#fff"}}>
        <h1 style={{ fontSize: "2.7rem", fontWeight: 700, letterSpacing: "1px", lineHeight: 1.15 }}>
          Al-Mawa <span style={{ color: "#ffe082" }}>(Al Masjid Annoor Wichita)</span>
        </h1>
        <div style={{ fontSize: "1.3rem", margin: "16px 0 36px 0", letterSpacing: ".4px" }}>
          A House of Peace, Light, and Community for All in Wichita<br/>
          <span style={{ fontStyle:"italic", fontSize:"1rem", color:"#fff9", marginTop:4 }}>
            ﷽ In the Name of Allah, the Most Merciful, Most Compassionate
          </span>
        </div>
        <a href="#donate" className="btn-donate" style={{ boxShadow:"0 10px 24px #2aaf4e26" }}>Donate Now</a>
      </header>

      {/* Namaz Times */}
      <section className="section fadein">
        <div className="section-title">Today's Prayer Times</div>
        <div className="namaz-table" style={{background:"#ecf5f0"}}>
          {namazTimes.map(n => (
            <div className="namaz-col" key={n.name}>
              <div style={{color:"#1e3c72", fontWeight:700, fontSize:"1.1rem"}}>{n.name}</div>
              <div style={{fontSize:"1.25rem", color:"#2aaf4e"}}>{n.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="section fadein" style={{background:"#fff", borderRadius:"18px", boxShadow:"0px 6px 32px #2aaf4e0f"}}>
        <div className="section-title">About Al-Mawa</div>
        <div style={{fontWeight:500, color:"#444"}}>
          Since its founding, <b>Al Masjid Annoor Wichita</b> has welcomed families from all walks of life. We strive to nurture faith, serve community needs, and be a beacon of spiritual light. Join us for prayer, learning, outreach, youth and family events, and open interfaith dialogues. 
        </div>
      </section>

      {/* Reconstruction & Donate */}
      <section className="section fadein" style={{display:"flex", flexDirection:"column",alignItems:"center", background:"#faf8ec", borderRadius:"18px" }} id="donate">
        <div className="section-title" style={{color:"#a88005"}}>Masjid Reconstruction Project</div>
        <div style={{maxWidth:580, color:"#6a5216", marginBottom:"1.8rem", fontWeight:490}}>
          Our historic masjid is undergoing <b>major reconstruction</b> to better serve you. <br />
          Help us restore and expand Al-Mawa with your generous donations!
        </div>
        {/* Donation Progress */}
        <div style={{ width: "80%", maxWidth: 340, margin: "0 auto 14px auto"}}>
          <div style={{color:"#2aaf4e", fontWeight:600, fontSize:"1.02rem", marginBottom:2}}>Goal: ${goal.toLocaleString()}</div>
          <div style={{background:"#ecf7e5", borderRadius:"8px", height:22, position:"relative", overflow:"hidden"}}>
            <div style={{
              background:"#2aaf4e",
              width:`${(donation/goal)*100}%`, height:22,
              transition:"width 1.2s cubic-bezier(.2,.6,.4,1)",
              borderRadius:"8px",
              textAlign:"right",
              color:"#fff",
              fontWeight:700,
              boxShadow:"0 4px 6px #2aaf4e22",
              display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:10
              }}>
              ${donation.toLocaleString()}
            </div>
          </div>
        </div>
        <button className="btn-donate" onClick={()=>window.open("https://your-donation-link.com","_blank")} style={{marginTop:16}}>Donate Now</button>
      </section>

      {/* Services */}
      <section className="section fadein">
        <div className="section-title">Our Services</div>
        <div className="responsive">
          {services.map(s => (
            <div key={s.title} style={{background:"#fff", borderRadius:"14px", padding:"18px 20px", minWidth:200, flex:"1", margin:"2px", boxShadow:"0 2px 15px #1e3c720a"}}>
              <div style={{fontSize:"2rem", color:"#2aaf4e"}}>{s.icon}</div>
              <div style={{fontWeight:700, color:"#187969", marginTop:"8px"}}>{s.title}</div>
              <div style={{fontSize:"1.02rem", color:"#444", marginTop:"2px"}}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements / Events */}
      <section className="section fadein" style={{background:"#f5f9ff", borderRadius:"14px"}}>
        <div className="section-title">Announcements & Events</div>
        <div style={{height:36, overflow:"hidden", position:"relative", fontWeight:600, color:"#326c9b", fontSize:"1.09rem"}}>
          <span style={{
            display:"inline-block",
            minWidth: "200px",
            transition:"transform .6s cubic-bezier(.4,1.3,.7,1)",
            transform:`translateY(-${currentEvent*36}px)`,
            position:"absolute"
          }}>
            {events.map((e, idx) => (
              <div key={idx} style={{height:36, display:"flex",alignItems:"center",gap:10}}>
                <span style={{background:"#2aaf4e",color:"#fff",borderRadius:"5px", marginRight:"12px", padding:"4px 10px", fontSize:".92rem"}}>{e.date}</span>
                {e.text}
              </div>
            ))}
          </span>
        </div>
      </section>

      {/* Contact */}
      <section className="section fadein" style={{background:"#fff", borderRadius:"14px", marginBottom:24}}>
        <div className="section-title">Contact & Location</div>
        <div className="responsive">
          <form style={{flex:"1", minWidth:200}}>
            <input type="text" placeholder="Your Name" style={{width:"100%",marginBottom:9, padding:"8px",borderRadius:"6px",border:"1px solid #bababa",fontSize:"1.01rem"}} />
            <input type="email" placeholder="Your Email" style={{width:"100%",marginBottom:9, padding:"8px",borderRadius:"6px",border:"1px solid #bababa"}} />
            <textarea placeholder="Message" style={{width:"100%", minHeight:60, padding:"8px",borderRadius:"6px",border:"1px solid #bababa", resize:"vertical"}}/>
            <button className="btn-donate" type="submit" style={{marginTop:10,width:"100%"}}>Send Message</button>
          </form>
          <div style={{flex:"1", minWidth:220, paddingLeft:18}}>
            <div style={{color:"#187969",fontWeight:700}}>Address:</div>
            123 Islamic Center Ave, Wichita, KS<br/>
            <b>Email:</b> info@al-mawa.org<br/>
            <b>Phone:</b> (316) 555-1234
            <div style={{marginTop:"14px", borderRadius:"10px", overflow:"hidden", boxShadow:"0 2px 10px #2aaf4e09"}}>
              <img src="https://maps.googleapis.com/maps/api/staticmap?center=Wichita,KS&zoom=13&size=280x120&key=YOUR_API_KEY" alt="Map" style={{width:"100%"}} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background:"#1e3c72", color:"#fff", textAlign:"center", padding:"16px 0", fontSize:".97rem"}}>
        <div>
          <b>Al-Mawa Islamic Center (Annoor Wichita)</b> &copy; {new Date().getFullYear()}<br/>
          <span style={{color:"#ffe082"}}>"The best of you are those who bring most benefit to humanity." [Prophet Muhammad ﷺ]</span>
        </div>
      </footer>
    </div>
  );
}
