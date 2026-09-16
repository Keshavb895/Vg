import React from 'react';
import DriftWall from './DriftWall';
import ParticleText from './ParticleText';

const FEEDBACK_ITEMS = [
  {
    id: 1,
    name: "Alex M.",
    avatar: "A",
    tag: "Verified Trader",
    rating: 5,
    badge: "P2P Liquidity",
    time: "Today",
    comment: "Super smooth P2P facilitation! The desk guided the entire transaction with complete banking safety. Zero freeze issues. Most trustworthy OTC desk."
  },
  {
    id: 2,
    name: "Vikram S.",
    avatar: "V",
    tag: "Institutional Desk",
    rating: 5,
    badge: "OTC Settlement",
    time: "1d ago",
    comment: "Needed large liquidity facilitation and the team handled the entire P2P coordination seamlessly with complete privacy and zero friction."
  },
  {
    id: 3,
    name: "Rahul T.",
    avatar: "R",
    tag: "Verified Desk",
    rating: 5,
    badge: "Escrow Protocol",
    time: "2d ago",
    comment: "First time seeking high-volume P2P settlement here. The verified escrow protocols gave me 100% confidence. Clean execution!"
  },
  {
    id: 4,
    name: "CryptoWhale_99",
    avatar: "C",
    tag: "VIP Partner",
    rating: 5,
    badge: "Zero Lien Guarantee",
    time: "3d ago",
    comment: "After facing a cyber lien on unverified platforms last year, I only trade through this desk. Clean banking protocols always."
  },
  {
    id: 5,
    name: "Elena R.",
    avatar: "E",
    tag: "Alpha Member",
    rating: 5,
    badge: "TF Verse Syndicate",
    time: "3d ago",
    comment: "Joined TF Verse alpha group last month. The conviction calls and early stage radars are unmatched in accuracy."
  },
  {
    id: 6,
    name: "Marcus V.",
    avatar: "M",
    tag: "Verified Trader",
    rating: 5,
    badge: "Safe Banking",
    time: "4d ago",
    comment: "This desk has helped so many crypto traders avoid scammers and account freezes. Highly genuine guidance and fast support."
  },
  {
    id: 7,
    name: "David K.",
    avatar: "D",
    tag: "OTC Desk Partner",
    rating: 5,
    badge: "P2P Liquidity",
    time: "5d ago",
    comment: "Connected over 8 months ago. Their guidance on P2P compliance and verified partners has been flawless. Top tier reliability."
  },
  {
    id: 8,
    name: "Sneha P.",
    avatar: "S",
    tag: "Verified Trader",
    rating: 5,
    badge: "Instant Conversion",
    time: "5d ago",
    comment: "No fake middlemen or shady accounts. Pure direct verified facilitation with escrow backing. 10/10 service."
  },
  {
    id: 9,
    name: "Karan B.",
    avatar: "K",
    tag: "Volume Desk",
    rating: 5,
    badge: "Zero Lien Settlement",
    time: "6d ago",
    comment: "If you need P2P done properly without banking risks, this desk is the gold standard. Utmost clarity from start to finish."
  },
  {
    id: 10,
    name: "Aditya G.",
    avatar: "A",
    tag: "Verified Trader",
    rating: 5,
    badge: "Telegram Desk",
    time: "1w ago",
    comment: "Their Telegram desk updates and P2P safety protocols are pure gold. Whenever anyone asks about safe P2P, I always point them here."
  },
  {
    id: 11,
    name: "Nikhil R.",
    avatar: "N",
    tag: "Private Mastermind",
    rating: 5,
    badge: "TF Verse VIP",
    time: "1w ago",
    comment: "Vaibhav's market insights and OTC desk are unmatched. Transparent, fast, and completely legitimate."
  },
  {
    id: 12,
    name: "Sarah W.",
    avatar: "S",
    tag: "OTC Participant",
    rating: 5,
    badge: "Institutional OTC",
    time: "1w ago",
    comment: "Large volume participants know how vital clean banking channels are. This P2P facilitation is unmatched in professionalism."
  },
  {
    id: 13,
    name: "Pooja M.",
    avatar: "P",
    tag: "Verified Trader",
    rating: 5,
    badge: "P2P Escrow",
    time: "2w ago",
    comment: "Super transparent guidance, fast response on Telegram, and 100% genuine support. Best OTC liquidity desk hands down!"
  },
  {
    id: 14,
    name: "Arjun D.",
    avatar: "A",
    tag: "Crypto Trader",
    rating: 5,
    badge: "Clean Banking",
    time: "2w ago",
    comment: "Zero cyber complaints or frozen bank accounts. Transactions settle within minutes with full compliance."
  },
  {
    id: 15,
    name: "Rohit K.",
    avatar: "R",
    tag: "Verified Partner",
    rating: 5,
    badge: "High Liquidity",
    time: "2w ago",
    comment: "The highest standard of trust in the Indian crypto ecosystem. Smooth coordination and instant peace of mind."
  }
];

export function CommunitySays() {
  return (
    <section className="community-section" id="community">
      <div id="feedback" style={{ position: 'relative', top: '-70px', height: 0, overflow: 'hidden' }} />
      {/* Removed Light Divider Line Between Services and Feedback */}


      {/* Section heading */}
      <div className="community-inner">
        <div className="section-header scroll-reveal" style={{ marginBottom: '1rem' }}>
          <h2 className="creator-hero-title">
            <span className="hero-title-bold">
              <span style={{
                fontSize: '2em',
                display: 'inline-block',
                lineHeight: 0.75,
                verticalAlign: 'middle',
                fontFamily: "'Dancing Script', cursive",
                fontWeight: 700,
                marginRight: '-2px',
                color: 'orange'
              }}>F</span>eedbacks
            </span>
          </h2>
        </div>
      </div>

      {/* Interactive 3D DriftWall Showcase with Real Feedback Cards */}
      <div
        style={{ height: 620, width: '100%', maxWidth: '100%', position: 'relative', overflow: 'hidden', contain: 'paint', isolation: 'isolate' }}
        className="scroll-reveal reveal-delay-3"
      >
        <DriftWall
          items={FEEDBACK_ITEMS}
          columns={5}
          tileWidth={285}
          tileHeight={155}
          gap={18}
          tilt={14}
          turn={-12}
          perspective={1200}
          depth={120}
          speed={36}
          direction="up"
          variance={0.45}
          parallax={0.6}
          lift={64}
          fade={0.6}
          dim={0.7}
          overlayColor="#09080e"
          radius={16}
          roll={0}
          pauseOnHover={false}
          grayscale={false}
        />
      </div>
    </section>
  );
}

export default CommunitySays;
