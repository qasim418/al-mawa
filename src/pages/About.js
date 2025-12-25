import React from 'react';
import SiteLayout from '../components/SiteLayout';

export default function About() {
  return (
    <SiteLayout>
      <section className="section">
        <div className="container">
          <h1>About Masjid Annoor</h1>
          <p className="sub">Wichita, Kansas — established in 1983</p>

          <div className="card" style={{ padding: 22 }}>
            <div className="prose">
              <h2 style={{ marginTop: 0 }}>Objective</h2>
              <p>
                To please Allah (swt) by following the teachings of the Qur’an and the Sunnah of His Prophet,
                Muhammad (pbuh).
              </p>

              <div className="rule" />

              <h2>Mission</h2>
              <p>
                To serve the Muslim community by providing various services to meet their spiritual and social needs and by promoting
                the values and teachings of Islam in accordance with the Qur’an and Sunnah of His Prophet, Muhammad (pbuh).
              </p>

              <div className="rule" />

              <h2>Vision</h2>
              <p>
                To become a comprehensive center of learning and spirituality for all age groups and demographics within the Muslim community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'linear-gradient(180deg, #f7fbf8, #ffffff)' }}>
        <div className="container">
          <h2>History</h2>
          <p className="sub">The History of Masjid Annoor – Wichita, Kansas</p>

          <div className="card" style={{ padding: 22 }}>
            <div className="prose">
              <p>
                Masjid Annoor holds the distinction of being the first Muslim place of worship established in Wichita, Kansas. Its history is rooted
                in the sincere dedication and sacrifices of a few young students who, with the help of Allah, laid the foundation for a vibrant Muslim community.
              </p>
              <p>
                This history below has been provided by Brother Saeed S. Kohlban Al Kahtani, co-founder of Masjid Annoor.
              </p>

              <h2 style={{ marginTop: 18 }}>The Beginning (1979)</h2>
              <p>
                In 1979, two Saudi students at Wichita State University, Saeed S. Kohlban Al Kahtani and Adnan Khalid Al Raya, rented a house at the corner
                of Oliver Street and Floberta Street near the WSU campus. For the first time in the history of Wichita and the state of Kansas, Jumu‘ah and the
                five daily prayers were established continuously.
              </p>
              <p>
                These brothers paid the rent and utility expenses from their own student allowances, never accepting donations from others. Both were active in
                Tablighi work, dedicating their time to guiding fellow students and local Muslims toward worship and community service.
              </p>

              <h2 style={{ marginTop: 18 }}>Growth and Expansion</h2>
              <p>
                In 1981, a Tablighi Ijtima (gathering) was organized at the Armory Building near WSU, bringing Muslims from across the United States. As the Muslim
                population in Wichita grew, so did the need for a permanent Masjid.
              </p>
              <p>
                Recognizing this need, a Kuwaiti student, Walid Al Hammad, donated $100,000 to support the construction of a new masjid. In 1982, land with two apartments
                was purchased for $40,000 at 3104 E. 17th Street, next to McDonald’s.
              </p>

              <h2 style={{ marginTop: 18 }}>Construction of the Masjid</h2>
              <p>
                Under the leadership of Saeed Al Kahtani, architectural plans were drawn, city permits were secured, and construction began in 1982. The general contractor,
                Walid Taha, a Lebanese builder, was entrusted with the project for $60,000. The new Masjid Al Noor was completed in 1983. (Brother Walid Taha passed away in Wichita
                in September 2018 at the age of 68 – may Allah have mercy on him).
              </p>
              <p>
                An “unsung hero” throughout this process was Brother Saeed Ahmad Nawaz, a local engineer employed at Boeing. His constant guidance, assistance, and advice were invaluable
                to the young students, who were unfamiliar with American life, rules, and regulations. By Allah’s grace, his support made the project possible.
              </p>

              <h2 style={{ marginTop: 18 }}>Leadership and Continuity</h2>
              <p>
                In spring 1982, after graduating from WSU, Saeed Al Kahtani returned to Saudi Arabia, entrusting the supervision of the new masjid to Adnan Khalid Al Raya. Brother Adnan worked
                diligently to continue the Tablighi efforts and oversaw the completion of the masjid in 1983. Soon after, Jumu‘ah and daily prayers officially began in the new building.
              </p>
              <p>
                Before leaving Wichita, Brother Adnan, with the support of his wife, ensured that the Masjid was entrusted to capable hands. He remained in contact with the local community, striving
                to preserve Masjid Annoor as a true house of Allah, where Muslims could gather, worship, and represent Islam with dignity in Wichita and beyond.
              </p>

              <h2 style={{ marginTop: 18 }}>Legacy and Vision</h2>
              <p>
                Today, Masjid Annoor stands as a historic milestone—the first Masjid in Wichita and the State of Kansas. It is more than just a prayer space; it is a center of unity, worship, and guidance.
                Its founders envisioned it as a beacon of light from which the message of Islam could spread to every corner of the United States and the world.
              </p>
              <p>
                May Allah bless all those who contributed to this noble effort and accept it as a sadaqah jariyah (everlasting charity).
              </p>

              <div className="rule" />

              <h2>Founding Principles</h2>
              <ol>
                <li>
                  <strong>No Political Activities in the Masjid:</strong> The Masjid was never to be a place for political discussion or agendas. The focus of the Masjid is to remain on worship and faith.
                </li>
                <li>
                  <strong>No Doctrinal Disputes:</strong> Differences in jurisprudence were not to be debated within the Masjid. The Masjid itself is a place of unity.
                </li>
                <li>
                  <strong>No Arguments Within the Masjid:</strong> As the house of Allah, the Masjid is to be a place of peace and devotion.
                </li>
                <li>
                  <strong>Support for Tablighi Jama‘ah:</strong> Masjid Annoor welcomes visiting groups, offering hospitality and support, provided activities respect local laws and regulations.
                </li>
              </ol>

              <h2 style={{ marginTop: 18 }}>Message from Saeed S. Kohlban Al Kahtani</h2>
              <p>
                I wish that Masjid Annoor continues operating according to what is being mentioned above and be a central place from where the light of Islam reaches every corner of the USA and the whole world.
                My best wishes to you and all the brothers in Wichita. Please convey my regards and Salam to everyone you can.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
