import heartGif from '../../assets/heart.gif';

interface LandingPageProps {
  onContinue: () => void;
}

export default function LandingPage({ onContinue }: LandingPageProps) {
  return (
    <main className="landing-page">
      <a className="heart-container heart-action" onClick={onContinue} role="button" tabIndex={0}>
        <img src={heartGif} alt="Heart GIF" />
      </a>
    </main>
  );
}
