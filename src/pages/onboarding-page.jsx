import OnboardingScreen from '../components/onboarding/onboarding-screen.jsx'

const OnboardingPage = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-white">
      <OnboardingScreen onGetStarted={onComplete} />
    </div>
  )
}

export default OnboardingPage
