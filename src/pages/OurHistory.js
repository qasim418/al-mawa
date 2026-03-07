import React from 'react';
import SiteLayout from '../components/SiteLayout';

export default function OurHistory() {
  // Use relative path for images to work on both local and server
  const getImagePath = (path) => {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${process.env.PUBLIC_URL || ''}/${cleanPath}`;
  };

  return (
    <SiteLayout>
      <section className="section">
        <div className="container">
          <h1>Our History</h1>
          <p className="sub">The History of Masjid Annoor – Wichita, Kansas</p>

          <div className="card" style={{ padding: 32 }}>
            <div className="prose">
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                The history presented below has been graciously provided by Brother Saeed S. Kohlban Al Kahtani, co-founder of Masjid Annoor, at the special request of brother Khalid Ahmed.
              </p>
              <p style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--green-700)', background: 'var(--green-100)', padding: 12, borderRadius: 8, borderLeft: '4px solid var(--green-700)' }}>
                THE FOLLOWING CONTENT HAS BEEN PARAPHRASED USING HISTORICAL INFORMATION PROVIDED BY SAEED KHATANI.
              </p>

              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Masjid Annoor holds the distinction of being the first Muslim place of worship established in Wichita, Kansas. Its history is rooted in the sincere dedication and sacrifices of a few young students who, with the help of Allah, laid the foundation for a vibrant Muslim community.
              </p>

              <h2 style={{ marginTop: 28, color: 'var(--green-900)' }}>The Beginning (1979)</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                In 1979, two Saudi students at Wichita State University, Saeed S. Kohlban Al Kahtani and Adnan Khalid Al Raya, rented a house at the corner of Oliver Street and Floberta Street near the WSU campus. For the first time in the history of Wichita and the state of Kansas, Jumu'ah and the five daily prayers were established continuously.
              </p>

              <figure style={{ margin: '20px 0 24px', maxWidth: 520 }}>
                <div
                  style={{
                    borderRadius: 16,
                    overflow: 'hidden',
                    border: '1px solid rgba(18, 71, 48, 0.12)',
                    background: '#ffffff',
                    padding: 10,
                    boxShadow: '0 10px 26px rgba(0,0,0,0.06)'
                  }}
                >
                  <img
                    src={getImagePath('history/little-house-on-the-corner.png')}
                    alt="Little house on the corner (1979)"
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                  />
                </div>
                <figcaption className="sub" style={{ marginTop: 10, fontStyle: 'italic' }}>
                  Little house on the corner (1979)
                </figcaption>
              </figure>
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                These brothers paid the rent and utility expenses from their own student allowances, never accepting donations from others. Both were active in Tablighi work, dedicating their time to guiding fellow students and local Muslims toward worship and community service.
              </p>

              <h2 style={{ marginTop: 28, color: 'var(--green-900)' }}>Growth and Expansion</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                In 1981, a Tablighi Ijtima (gathering) was organized at the Armory Building near WSU, bringing Muslims from across the United States. As the Muslim population in Wichita grew, so did the need for a permanent Masjid.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Recognizing this need, a Kuwaiti student, Walid Al Hammad, donated $100,000.00 to support the construction of a new masjid. In 1982, land with two apartments was purchased for $40,000 at 3104 E. 17th Street, next to McDonald's.
              </p>

              <h2 style={{ marginTop: 28, color: 'var(--green-900)' }}>Construction of the Masjid</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Under the leadership of Saeed Al Kahtani, architectural plans were drawn, city permits were secured, and construction began in 1982. The general contractor, Walid Taha, a Lebanese builder, was entrusted with the project for $60,000. The new Masjid Al Noor was completed in 1983. (Brother Walid Taha passed away in Wichita in September 2018 at the age of 68 – may Allah have mercy on him).
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                An "unsung hero" throughout this process was Brother Saeed Ahmad Nawaz, a local engineer employed at Boeing. His constant guidance, assistance, and advice were invaluable to the young students, who were unfamiliar with American life, rules, and regulations. By Allah's grace, his support made the project possible.
              </p>

              <h2 style={{ marginTop: 28, color: 'var(--green-900)' }}>Leadership and Continuity</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                In spring 1982, after graduating from WSU, Saeed Al Kahtani returned to Saudi Arabia, entrusting the supervision of the new masjid to Adnan Khalid Al Raya. Brother Adnan worked diligently to continue the Tablighi efforts and oversaw the completion of the masjid in 1983. Soon after, Jumu'ah and daily prayers officially began in the new building.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Before leaving Wichita, Brother Adnan, with the support of his wife, ensured that the Masjid was entrusted to capable hands. He remained in contact with the local community, striving to preserve Masjid Annoor as a true house of Allah, where Muslims could gather, worship, and represent Islam with dignity in Wichita and beyond.
              </p>

              <h2 style={{ marginTop: 28, color: 'var(--green-900)' }}>Legacy and Vision</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Today, Masjid Annoor stands as a historic milestone—the first Masjid in Wichita and the State of Kansas. It is more than just a prayer space; it is a center of unity, worship, and guidance. Its founders envisioned it as a beacon of light from which the message of Islam could spread to every corner of the United States and the world.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                May Allah bless all those who contributed to this noble effort and accept it as a sadaqah jariyah (everlasting charity).
              </p>

              <div className="rule" />

              <h2 style={{ color: 'var(--green-900)' }}>Guiding Principles of Masjid Annoor</h2>
              <ul style={{ paddingLeft: 24, lineHeight: '1.8' }}>
                <li style={{ marginBottom: 10 }}>
                  Follow the Quran and sunnah in our actions and words.
                </li>
                <li style={{ marginBottom: 10 }}>
                  Acquire knowledge, develop empathy and then act.
                </li>
                <li style={{ marginBottom: 10 }}>
                  Love for others what we love for ourselves and respect their choices.
                </li>
                <li style={{ marginBottom: 10 }}>
                  Operate with excellence.
                </li>
                <li style={{ marginBottom: 10 }}>
                  Support environmental & financial sustainability.
                </li>
              </ul>

              <div className="rule" />

              <h2 style={{ color: 'var(--green-900)' }}>Founding Principles</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                From its very first day, Saeed Al Kahtani and Adnan Al Raya established Masjid Annoor upon clear guiding principles to protect its unity and sincerity of purpose:
              </p>
              <ol style={{ paddingLeft: 24, lineHeight: '1.8' }}>
                <li style={{ marginBottom: 16 }}>
                  <strong>No Political Activities in the Masjid:</strong><br />
                  The Masjid was never to be a place for political discussion or agendas. With the congregation coming from diverse countries and backgrounds, political debates could easily divide. The focus of the Masjid was to remain on worship and faith.
                </li>
                <li style={{ marginBottom: 16 }}>
                  <strong>No Doctrinal Disputes:</strong><br />
                  Differences in jurisprudence (Hanafi, Shafi'i, Maliki, Hanbali) were not to be debated within the Masjid. While schools of thought may differ, all scholars agree on the fundamentals of Islam. Each individual could follow their own madhhab privately, but the Masjid itself would be a place of unity.
                </li>
                <li style={{ marginBottom: 16 }}>
                  <strong>No Arguments Within the Masjid:</strong><br />
                  As the house of Allah, the Masjid was to be a place of peace and devotion. Arguments and disputes were to be avoided so that worship remained pure and pleasing to Allah.
                </li>
                <li style={{ marginBottom: 16 }}>
                  <strong>Support for Tablighi Jama'ah:</strong><br />
                  Masjid Annoor would always welcome visiting Tablighi Jama'ah groups, offering hospitality and support, provided their activities respected local laws and regulations. Their presence is viewed as a blessing and an opportunity for mutual spiritual growth.
                </li>
              </ol>

              <h2 style={{ marginTop: 28, color: 'var(--green-900)' }}>Message from Saeed S. Kohlban Al Kahtani</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8', fontStyle: 'italic', background: 'var(--green-100)', padding: 20, borderRadius: 12, borderLeft: '4px solid var(--green-700)' }}>
                "I wish that Masjid Annoor continues operating according to what is being mentioned above and be a central place from where the light of Islam reaches every corner of the USA and the whole world. My best wishes to you and all the brothers in Wichita. Please convey my regards and Salam to everyone you can."
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
