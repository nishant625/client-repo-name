import Button from '../ui/button.jsx'

const OnboardingScreen = ({ onGetStarted }) => {
  const handleGetStarted = () => {
    localStorage.setItem('onboarded', 'true')
    if (onGetStarted) {
      onGetStarted()
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center max-w-sm mx-auto p-4">
      <div className="h-[45vh] w-full max-w-sm mx-auto rounded-3xl overflow-hidden relative bg-gradient-to-br from-[#4D81E7] to-[#7C3AED]">
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/20" />
        <div className="absolute top-1/3 -left-10 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 right-10 w-28 h-28 rounded-full bg-white/20" />
      </div>
      <div className="px-6 pt-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage What To Do</h1>
        <p className="text-gray-500 mt-2 text-sm">
          {"The best way to manage what you have to do, don't forget your plans"}
        </p>
        <div className="mt-8">
          <Button onClick={handleGetStarted}>Get Started</Button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingScreen
